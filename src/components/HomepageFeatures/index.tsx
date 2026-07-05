import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  number: string;
  title: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    number: '#1 CONNECT',
    title: 'Lives Everywhere',
    description: 'CLI, Telegram, Discord, Slack, email — and a growing list of platforms. One agent, one memory, every surface.',
  },
  {
    number: '#2 REMEMBER',
    title: 'Persistent Memory',
    description: 'Learns your projects, auto-generates skills, and never forgets how it solved a problem across sessions.',
  },
  {
    number: '#3 SCHEDULE',
    title: 'Focused Automation',
    description: 'Natural-language scheduling for reports, backups, and briefings — running unattended through the gateway.',
  },
  {
    number: '#4 DELEGATE',
    title: 'Tasks Multiplied',
    description: 'Isolated subagents with their own conversations, terminals, and toolkits for parallel workstreams.',
  },
  {
    number: '#5 SEARCH',
    title: 'Browse the Web',
    description: 'Web search, browser automation, vision, image generation, TTS, and multi-model reasoning.',
  },
  {
    number: '#6 EXPERIMENT',
    title: 'Isolated Sandboxing',
    description: 'Five backends — local, Docker, SSH, cloud — with container hardening and namespace isolation.',
  },
];

function Feature({number, title, description}: FeatureItem) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className="feature-card">
        <div className="feature-card__number">{number}</div>
        <div className="feature-card__title">{title}</div>
        <div className="feature-card__description">{description}</div>
        <div style={{
          width: '100%',
          height: '120px',
          background: 'var(--ink-blue)',
          marginTop: '1.5rem',
        }} />
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '2rem',
            color: 'var(--ink-text)',
            margin: 0,
          }}>
            Everything You Need
          </h2>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <span className="label-small" style={{
              padding: '0.3rem 0.75rem',
              border: '1.5px solid var(--ink-blue)',
              color: 'var(--ink-blue)',
              cursor: 'pointer',
            }}>FEATURE</span>
            <span className="label-small" style={{
              padding: '0.3rem 0.75rem',
              border: '1.5px solid var(--cream-darker)',
              color: 'var(--ink-text-muted)',
              cursor: 'pointer',
            }}>PREVIEW</span>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
