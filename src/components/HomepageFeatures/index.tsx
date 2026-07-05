import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Truth Engine',
    icon: '✅',
    description: (
      <>
        The core verification layer. Every agent claim is checked against hard evidence — 
        file system changes, test results, API responses. No more "agent says done" without proof.
      </>
    ),
  },
  {
    title: 'Deterministic Assembly',
    icon: '⚙️',
    description: (
      <>
        A single writer rule prevents integration conflicts. The Deterministic Assembler 
        merges worker outputs into shared files, eliminating race conditions and merge hell.
      </>
    ),
  },
  {
    title: 'Parallel Execution',
    icon: '⚡',
    description: (
      <>
        Spawn isolated subagents that work in parallel with zero context pollution. 
        Each gets its own conversation, terminal, and toolset — results merge back cleanly.
      </>
    ),
  },
  {
    title: 'Plugin Architecture',
    icon: '🧩',
    description: (
      <>
        Everything is a plugin. Extend PRAXIS with custom verifiers, assemblers, 
        tool providers, and execution backends without touching core logic.
      </>
    ),
  },
  {
    title: 'Verification Gates',
    icon: '🛡️',
    description: (
      <>
        Three verification gates — Evidence, Test, and Final — ensure no task completes 
        without meeting its acceptance criteria. Human-authored TaskSpec defines what "done" means.
      </>
    ),
  },
  {
    title: 'Everywhere Deployment',
    icon: '🌐',
    description: (
      <>
        Run on local machines, Docker containers, SSH hosts, or cloud infrastructure. 
        PRAXIS adapts to your environment, not the other way around.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className="feature-card">
        <div className="feature-card__icon">{icon}</div>
        <div className="feature-card__title">{title}</div>
        <div className="feature-card__description">{description}</div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-header__title">
            Why PRAXIS?
          </h2>
          <p className="section-header__subtitle">
            The only verification layer that actually proves your agent completed the task.
          </p>
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
