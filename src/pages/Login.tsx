import React from 'react';
import { Layout } from '@/components/Layout';

const Login = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Login</h1>
        <p className="text-elegant">Sign in to your account.</p>
      </div>
    </Layout>
  );
};

export default Login;