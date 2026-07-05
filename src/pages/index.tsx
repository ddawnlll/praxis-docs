import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import { ShieldCheck, Settings, Link as LinkIcon } from '@site/src/components/Icons';

import styles from './index.module.css';

function ZineCover() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} style={{ top: '20%', right: '10%', width: '500px', height: '500px' }} />
      <div className={styles.heroGlow} style={{ bottom: '0', left: '20%', width: '400px', height: '400px' }} />

      <div className={styles.heroGrid}>
        <div className={styles.heroText}>
          <div className={styles.heroEyebrow}>
            <span className={styles.eyebrowDot} />
            TRUTH KERNEL  •  v0.1  •  MIT
          </div>
          <h1 className={styles.heroTitle}>
            Did they<br />
            <span style={{ color: 'var(--ink)', fontStyle: 'italic' }}>actually finish?</span>
          </h1>
          <p className={styles.heroDesc}>
            PRAXIS is a local Truth Kernel for agentic coding tools. It verifies agent outputs using human-approved criteria, deterministic gates, and signed evidence — so you never have to ask "did it really work?"
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--primary" to="/docs/quickstart">
              Get Started
            </Link>
            <Link className="button button--secondary" to="/docs/introduction">
              Read the Manifesto
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <span>MIT LICENSE</span>
            <span className={styles.metaDot} />
            <span>OPEN SOURCE</span>
            <span className={styles.metaDot} />
            <span>KERNEL v0.1</span>
          </div>
        </div>

        <div className={styles.heroMascot}>
          <div className={styles.mascotWrap}>
            <img src="/img/mascot-v1.png" alt="" className="mascot-hero" />
          </div>
        </div>
      </div>
    </header>
  );
}

function ManifestoSection() {
  return (
    <section className="section-zine">
      <hr className="ink-rule" />
      <div className="manifesto-block">
        <div className="ink-stamp" style={{ marginBottom: '1.5rem' }}>FIRST LAW</div>
        <blockquote>
          "An agent that can verify its own work<br />
          is an agent that can lie about its own work.<br />
          <span style={{ color: 'var(--ink)' }}>The only honest completion</span><br />
          is one witnessed by code."
        </blockquote>
        <div className="manifesto-attribution">
          — from the PRAXIS constitution
        </div>
      </div>
      <hr className="ink-rule" style={{ marginTop: '0' }} />
    </section>
  );
}

function ThreeLawsSection() {
  const laws = [
    {
      icon: ShieldCheck,
      title: 'Completion Authority',
      desc: 'Agent says done ≠ done. The Truth Kernel FinalGate PASS = done. Nothing else counts. No agent can declare its own work complete.',
    },
    {
      icon: Settings,
      title: 'Write Authority',
      desc: 'No worker writes to shared integration files. The Deterministic Assembler is the only writer that touches shared state. (Future scope — single-session in v0.1.)',
    },
    {
      icon: LinkIcon,
      title: 'Verification Authority',
      desc: 'FinalGate criteria come from a human-authored TaskSpec only. An agent cannot define, verify, or approve its own completion criteria.',
    },
  ];

  return (
    <section className="section-zine section-zine-alt">
      <div className="container">
        <div className={styles.sectionLabel}>THE THREE LAWS</div>
        <h2 className={styles.sectionTitle}>
          How the<br />
          <span style={{ color: 'var(--ink)' }}>Truth Kernel</span> works
        </h2>

        <div className="row" style={{ marginTop: '2.5rem' }}>
          {laws.map((Law, i) => (
            <div className="col col--4 margin-bottom--lg" key={i}>
              <div className="zine-card">
                <div className="zine-card__icon">
                  <Law.icon size={28} />
                </div>
                <div className="zine-card__title">{Law.title}</div>
                <div className="ink-rule-dashed" style={{ marginBottom: '1rem' }} />
                <div className="zine-card__desc">{Law.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="section-zine">
      <div className="container">
        <div className={styles.statRow}>
          <div className={styles.statItem}>
            <div className="stat-number">3</div>
            <div className="stat-label">Verification Gates</div>
          </div>
          <div className={styles.statItem}>
            <div className="stat-number">6</div>
            <div className="stat-label">CLI Commands</div>
          </div>
          <div className={styles.statItem}>
            <div className="stat-number">1</div>
            <div className="stat-label">Writer Rule</div>
          </div>
          <div className={styles.statItem}>
            <div className="stat-number">100%</div>
            <div className="stat-label">Open Source</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineSection() {
  const steps = [
    { step: '01', title: 'Define', desc: 'Write a human-approved TaskSpec with acceptance criteria. This is the contract.' },
    { step: '02', title: 'Execute', desc: 'Let your coding agent (Claude Code, OpenCode, etc.) work independently. PRAXIS stays out of the way.' },
    { step: '03', title: 'Verify', desc: 'The Truth Kernel runs EvidenceGate, ExecGate, and FinalGate against the evidence.' },
    { step: '04', title: 'Repair', desc: 'If verification fails, generate a RepairPacket targeting each failed criterion.' },
    { step: '05', title: 'Report', desc: 'Generate a signed audit report as permanent evidence of completion.' },
  ];

  return (
    <section className="section-zine section-zine-alt">
      <div className="container">
        <div className={styles.sectionLabel}>THE PIPELINE</div>
        <h2 className={styles.sectionTitle}>
          From TaskSpec to<br />
          <span style={{ color: 'var(--ink)' }}>Proof</span>
        </h2>

        <div style={{ maxWidth: '600px', marginTop: '2rem', borderTop: '1px solid var(--line)' }}>
          {steps.map((s, i) => (
            <div className="pipeline-step" key={i}>
              <div className="pipeline-num">{s.step}</div>
              <div className="pipeline-content">
                <div className="pipeline-title">{s.title}</div>
                <p className="pipeline-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColophonSection() {
  return (
    <section className="section-zine" style={{ textAlign: 'center' }}>
      <div className="container">
        <hr className="ink-rule" style={{ marginBottom: '3rem' }} />

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="ink-stamp" style={{ marginBottom: '1.5rem' }}>COLOPHON</div>

          <h2 style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 600,
            fontSize: '2.5rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}>
            Trust requires evidence.<br />
            <span style={{ color: 'var(--ink)' }}>PRAXIS provides it.</span>
          </h2>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            maxWidth: '420px',
            margin: '0 auto 2rem',
            lineHeight: 1.8,
          }}>
            Clone the repo, read the architecture, or contribute. MIT licensed. No telemetry.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <Link className="button button--secondary" to="/docs/introduction">
              Read the Docs
            </Link>
          </div>

          <div className="colophon-cmd">
            git clone https://github.com/ddawnlll/praxis.git
          </div>

          <div className={styles.colophonMeta}>
            <span>MIT LICENSE</span>
            <span className={styles.metaDot} />
            <span>OPEN SOURCE</span>
            <span className={styles.metaDot} />
            <span>v0.1 DESIGN</span>
            <span className={styles.metaDot} />
            <span>PRINTED IN CODE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="PRAXIS — Truth Kernel for Agentic Coding Tools"
      description="PRAXIS is a local Truth Kernel for agentic coding tools. It verifies whether the agent actually completed the task using human-approved criteria, deterministic gates, and signed evidence.">
      <ZineCover />
      <main>
        <ManifestoSection />
        <ThreeLawsSection />
        <StatsSection />
        <PipelineSection />
        <ColophonSection />
      </main>
    </Layout>
  );
}
