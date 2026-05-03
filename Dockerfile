# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy manifests first for better layer caching
COPY package*.json ./
RUN npm ci --omit=dev || npm install

# Copy source and inject build-time secrets
COPY . .
ARG VITE_GEMINI_API_KEY
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY

RUN npm run build

# Serve stage — lean nginx image
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
