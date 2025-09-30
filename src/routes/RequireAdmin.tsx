// src/routes/RequireAdmin.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null; // or a spinner
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default RequireAdmin;
