import React from 'react';
import { Layout } from '@/components/Layout';

const ProductDetail = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Product Details</h1>
        <p className="text-elegant">Detailed view of the selected jewelry piece.</p>
      </div>
    </Layout>
  );
};

export default ProductDetail;