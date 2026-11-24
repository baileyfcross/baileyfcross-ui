import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/desktop/PageHeader';

const simulatorUrl = '/simulations/even-ones-dfa.html';

export const metadata: Metadata = {
  title: 'CSC-220 DFA Simulator | Bailey Cross',
  description:
    'Explore a two-state deterministic finite automaton that accepts binary strings containing an even number of 1s. Run or step through transitions.',
  alternates: { canonical: 'https://www.baileyfcross.info/dfa-simulator/' },
};

export default function DFASimulator() {
  return (
    <div className="content-page">
      <PageHeader index="CSC-220 / FINITE-STATE MACHINES" title="DFA Simulator">
        Step through a deterministic finite-state automaton that accepts binary strings
        containing an even number of 1s. Reading 0 keeps the current state; reading 1
        switches between Even and Odd.
      </PageHeader>
      <div className="page-footer-link">
        <a href={simulatorUrl} target="_blank" rel="noopener noreferrer" className="desktop-button">
          Open simulator in a separate tab ↗
        </a>
        <Link href="/teaching/" className="notebook-link">
          Teaching and research →
        </Link>
      </div>
      <iframe
        title="CSC-220 even-number-of-ones DFA interactive simulator"
        src={simulatorUrl}
        loading="eager"
        sandbox="allow-scripts"
        style={{
          display: 'block',
          width: '100%',
          height: '990px',
          border: '1px solid var(--rule)',
          borderRadius: '8px',
          background: '#f5f7fa',
        }}
      />
      <p>
        The initial state Even is accepting, including for the empty string. No account
        or data upload is required for this teaching demo.
      </p>
    </div>
  );
}
