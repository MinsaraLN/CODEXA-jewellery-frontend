import React from 'react';
import { Layout } from '@/components/Layout';
import ServiceTicketForm from '@/components/forms/ServiceTicketForm';

const Repairs = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Jewelry Repairs</h1>
        <p className="text-elegant mb-6">Professional jewelry repair and maintenance services.</p>
        <div className="p-6 rounded-lg border">
          <ServiceTicketForm />
        </div>
      </div>
    </Layout>
  );
};

export default Repairs;