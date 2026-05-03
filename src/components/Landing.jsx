import { User, ShieldCheck, CheckCircle, Map, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

function RoleCard({ role, icon: Icon, title, description, buttonLabel, buttonClass, borderColor, iconBg, iconColor, setRole }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setRole(role);
    }
  };

  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      aria-label={`Select role: ${title}`}
      onClick={() => setRole(role)}
      onKeyDown={handleKeyDown}
      style={{
        width: '380px',
        cursor: 'pointer',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.5rem',
        borderBottom: `4px solid ${borderColor}`,
      }}
    >
      <div style={{ padding: '1.5rem', background: iconBg, borderRadius: '2rem' }}>
        <Icon size={48} color={iconColor} aria-hidden="true" />
      </div>
      <div>
        <h3 style={{ color: iconColor, fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{description}</p>
      </div>
      <button className={`btn ${buttonClass}`} style={{ width: '100%' }} tabIndex={-1}>
        {buttonLabel}
      </button>
    </article>
  );
}

RoleCard.propTypes = {
  role: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  iconBg: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default function Landing({ setRole }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

      {/* Hero Section */}
      <section aria-labelledby="hero-heading" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2
          id="hero-heading"
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, var(--accent-saffron), var(--accent-green))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Empowering Every Vote
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Welcome to Bharat Election IQ. Experience the world's largest democratic process through AI-powered
          guidance and high-security digital verification.
        </p>
      </section>

      {/* Role Selection */}
      <section aria-label="Select your role to get started" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <RoleCard
          role="voter"
          icon={User}
          title="Voter Portal"
          description="Find your booth, verify your ID, and generate your secure digital entry pass in seconds."
          buttonLabel="Access Portal"
          buttonClass="btn-secondary"
          borderColor="var(--accent-green)"
          iconBg="rgba(19, 136, 8, 0.1)"
          iconColor="var(--accent-green)"
          setRole={setRole}
        />
        <RoleCard
          role="officer"
          icon={ShieldCheck}
          title="Officer Command"
          description="Advanced security dashboard for polling officers to verify voters and manage live station metrics."
          buttonLabel="Login to Console"
          buttonClass="btn-primary"
          borderColor="var(--accent-saffron)"
          iconBg="rgba(251, 140, 0, 0.1)"
          iconColor="var(--accent-saffron)"
          setRole={setRole}
        />
      </section>

      {/* Trust Badges */}
      <section aria-label="Technology partners" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', padding: '2rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <Zap size={20} color="var(--accent-saffron)" aria-hidden="true" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Powered by Gemini 2.5 Flash</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <Map size={20} color="var(--accent-blue)" aria-hidden="true" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Google Maps Integrated</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <CheckCircle size={20} color="var(--accent-green)" aria-hidden="true" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Zero-Touch Digital Passes</span>
        </div>
      </section>

    </div>
  );
}

Landing.propTypes = {
  setRole: PropTypes.func.isRequired,
};
