/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { IntroAnimation } from './components/IntroAnimation';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ category: string; pack: string } | null>(null);

  const handleSelectPlan = (category: string, pack: string) => {
    setSelectedPlan({ category, pack });
  };

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <Layout>
          <Hero />
          <Services />
          <Gallery />
          <About />
          <Testimonials />
          <Pricing onSelectPlan={handleSelectPlan} />
          <Contact selectedPlan={selectedPlan} />
        </Layout>
      )}
    </>
  );
}

