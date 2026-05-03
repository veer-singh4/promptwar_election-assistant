# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy manifests first for better layer caching
COPY package*.json ./

# Install ALL dependencies (including devDeps like vite) for the build step
RUN npm ci

# Copy source
COPY . .

# Inject build-time secrets via ARG → ENV → Vite build
# NOTE: These are VITE_ prefixed variables baked into the static JS bundle at
# compile time. This is the standard pattern for Vite SPAs; they are not
# runtime secrets and must be available during `npm run build`.
ARG VITE_GEMINI_API_KEY
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY

RUN npm run build

# Serve stage — lean nginx image, no Node.js
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
