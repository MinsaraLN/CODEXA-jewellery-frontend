import React from 'react';
import { Layout } from '@/components/Layout';
import CustomDesignForm from '@/components/forms/CustomDesignForm';

const CustomDesigns = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Custom Designs</h1>
        <p className="text-elegant mb-6">Create your unique jewelry piece with our custom design service.</p>
        <div className="p-6 rounded-lg border">
          <CustomDesignForm />
        </div>
      </div>
    </Layout>
  );
};

export default CustomDesigns;