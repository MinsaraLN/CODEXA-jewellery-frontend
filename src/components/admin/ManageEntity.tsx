// src/components/admin/ManageEntity.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminConfig, Column } from '@/lib/admin-config';
import { AdminAPI, EntityKind } from '@/lib/admin';

export default function ManageEntity({ kind }: { kind: EntityKind }) {
  const cfg = adminConfig[kind];
  const [id, setId] = React.useState<string>('');
  const [row, setRow] = React.useState<Record<string, any> | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [draft, setDraft] = React.useState<Record<string, any>>({});

  async function search() {
    if (!id) return;
    setLoading(true);
    try {
      const data = await AdminAPI.getById<any>(kind, id);
      setRow(data);
      setDraft(data);
      setEditMode(false);
    } catch (e: any) {
      alert(`Not found: ${e?.message || e}`);
      setRow(null);
    } finally {
      setLoading(false);
    }
  }

  async function update() {
    if (!row) return;
    setLoading(true);
    try {
      const updated = await AdminAPI.updateById<any>(kind, row.id ?? id, draft);
      setRow(updated);
      setDraft(updated);
      setEditMode(false);
      alert('Updated successfully');
    } catch (e: any) {
      alert(`Update failed: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  async function del() {
    if (!row) return;
    if (!confirm('Delete this item?')) return;
    setLoading(true);
    try {
      await AdminAPI.deleteById(kind, row.id ?? id);
      setRow(null);
      alert('Deleted');
    } catch (e: any) {
      alert(`Delete failed: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  const columns: Column[] = cfg.columns;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage {cfg.label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
          <Button onClick={search} disabled={loading || !id}>Search</Button>
        </div>

        {row && !editMode && (
          <>
            <div className="rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map(c => <TableHead key={c.key}>{c.label}</TableHead>)}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    {columns.map(c => <TableCell key={c.key}>{String(row?.[c.key] ?? '')}</TableCell>)}
                    <TableCell className="space-x-2">
                      <Button variant="outline" onClick={() => setEditMode(true)}>Update</Button>
                      <Button variant="destructive" onClick={del}>Delete</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {row && editMode && (
          <div className="grid gap-3">
            {columns.map(c => (
              <div key={c.key} className="grid gap-1">
                <label className="text-sm text-muted-foreground">{c.label}</label>
                <Input
                  value={draft?.[c.key] ?? ''}
                  onChange={(e) => setDraft(prev => ({ ...prev, [c.key]: e.target.value }))}
                />
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={update} disabled={loading}>Save</Button>
              <Button variant="outline" onClick={() => { setDraft(row!); setEditMode(false); }}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
