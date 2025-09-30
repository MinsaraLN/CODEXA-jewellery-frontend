import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-display mb-8">Profile</h1>
        <div className="space-y-6">
          <p className="text-elegant">Manage your account profile.</p>
          {user && (
            <div className="flex items-center justify-between bg-surface p-4 rounded-md border border-border">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;