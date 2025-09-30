// src/pages/admin/AdminEntityAll.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import EntityTable from '@/components/admin/EntityTable';
import { AdminAPI, EntityKind } from '@/lib/admin';
import { adminConfig } from '@/lib/admin-config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminEntityAll() {
  const { entity } = useParams();
  const kind = (entity as EntityKind) || 'products';
  const cfg = adminConfig[kind];

  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-all', kind],
    queryFn: () => AdminAPI.listAll<any>(kind),
  });

  return (
    <Card>
      <CardHeader><CardTitle>All {cfg.label}</CardTitle></CardHeader>
      <CardContent>
        {isLoading && <div>Loading…</div>}
        {isError && <button className="underline" onClick={() => refetch()}>Retry</button>}
        {!isLoading && !isError && <EntityTable columns={cfg.columns} rows={data} />}
      </CardContent>
    </Card>
  );
}
