import React from 'react';
import { Layout } from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">About Us</h1>
        <p className="text-elegant">Learn about our heritage and craftsmanship since 1987.</p>
      </div>
    </Layout>
  );
};

export default About;