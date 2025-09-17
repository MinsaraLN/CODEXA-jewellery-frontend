import React from 'react';
import { Layout } from '@/components/Layout';

const Wishlist = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Wishlist</h1>
        <p className="text-elegant">Your saved jewelry pieces.</p>
      </div>
    </Layout>
  );
};

export default Wishlist;