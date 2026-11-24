import type { Metadata } from 'next';
import PageHeader from '@/components/desktop/PageHeader';

const title = 'DFA Simulator | Bailey Cross';
const description = 'Explore a deterministic finite-state automaton for CSC-220. Step through binary strings and see how a machine recognizes an even number of ones.';
const url = 'https://www.baileyfcross.info/dfa-simulator/';
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: [{ url: '/social/teaching.png', width: 1200, height: 630, alt: 'DFA Simulator | Bailey Cross' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/social/teaching.png'] },
};

export default function DfaSimulatorPage() {
  return (
    <div className="content-page">
      <PageHeader index="TEACHING / CSC-220" title="DFA Simulator">
        Explore a deterministic finite-state automaton that accepts binary strings containing an even number of 1s.
      </PageHeader>
      <iframe
        src="/simulations/even-ones-dfa.html"
        title="Even number of 1s finite-state automaton simulator"
        style={{ display: 'block', width: '100%', height: '1100px', border: 0, background: 'white' }}
      />
    </div>
  );
}
