import React from 'react';
import { Layout } from '@/components/Layout';

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Profile</h1>
        <p className="text-elegant">Manage your account profile.</p>
      </div>
    </Layout>
  );
};

export default Profile;