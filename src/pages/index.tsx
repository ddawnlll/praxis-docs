import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            v2.0 — Parallel Runtime for Autonomous AI
          </div>
          <h1 className={styles.heroTitle}>
            {siteConfig.title}
          </h1>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline}
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/quickstart">
              Get Started →
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/introduction">
              Read the Docs
            </Link>
          </div>
        </div>
        <div className={styles.heroMascot}>
          <img
            src="/img/mascot.png"
            alt="PRAXIS Mascot"
            className="mascot-glow"
          />
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  const stats = [
    { number: '99.7%', label: 'Verification Accuracy' },
    { number: '4x', label: 'Faster Agent Execution' },
    { number: '40+', label: 'Built-in Tools' },
    { number: '100%', label: 'Open Source' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2 className={clsx('gradient-text', styles.ctaTitle)}>
          Ready to Build?
        </h2>
        <p className={styles.ctaSubtitle}>
          Join developers using PRAXIS to verify, delegate, and scale their AI coding workflows.
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/quickstart">
            Quickstart Guide
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/architecture">
            View Architecture
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="PRAXIS is the parallel runtime for autonomous AI coding execution. Verify, delegate, and scale your agent workflows.">
      <HomepageHeader />
      <main>
        <StatsSection />
        <HomepageFeatures />
        <CTASection />
      </main>
    </Layout>
  );
}
