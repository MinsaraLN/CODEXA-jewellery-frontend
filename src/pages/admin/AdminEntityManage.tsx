// src/pages/admin/AdminEntityManage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ManageEntity from '@/components/admin/ManageEntity';
import { EntityKind } from '@/lib/admin';

export default function AdminEntityManage() {
  const { entity } = useParams();
  const kind = (entity as EntityKind) || 'products';
  return <ManageEntity kind={kind} />;
}
