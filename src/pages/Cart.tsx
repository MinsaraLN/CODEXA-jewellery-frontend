import React from 'react';
import { Layout } from '@/components/Layout';

const Cart = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Shopping Cart</h1>
        <p className="text-elegant">Review your selected items.</p>
      </div>
    </Layout>
  );
};

export default Cart;