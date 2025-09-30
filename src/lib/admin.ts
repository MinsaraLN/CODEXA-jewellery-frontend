// src/lib/admin.ts
/*const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function json<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}

export type EntityKind = 'products' | 'gems' | 'categories' | 'metals';

export const AdminAPI = {
  listAll: <T>(kind: EntityKind) =>
    json<T[]>(`${API_BASE}/${kind}`), // GET /products etc.

  getById:  <T>(kind: EntityKind, id: string | number) =>
    json<T>(`${API_BASE}/${kind}/${id}`),

  updateById: <T>(kind: EntityKind, id: string | number, payload: Partial<T>) =>
    json<T>(`${API_BASE}/${kind}/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  deleteById: (kind: EntityKind, id: string | number) =>
    fetch(`${API_BASE}/${kind}/${id}`, { method: 'DELETE' }).then(res => {
      if (!res.ok) throw new Error('Delete failed');
    }),
};*/


// src/lib/admin.ts
// Robust admin API with multiple fallbacks so it works with MSW or Spring.
export type EntityKind = 'products' | 'gems' | 'categories' | 'metals';

const RAW = (import.meta.env.VITE_API_BASE_URL || '').trim();
// normalize: remove trailing slash if present
const API_BASE = RAW.endsWith('/') ? RAW.slice(0, -1) : RAW;

// Build candidate URLs for an endpoint, trying:
//   1) <API_BASE>/<path> (when VITE_API_BASE_URL is set, e.g. http://localhost:8088/api)
//   2) /api/<path>       (common Spring prefix)
//   3) /<path>           (MSW or backend without prefix)
function candidates(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;
  const list = [];
  if (API_BASE) list.push(`${API_BASE}${p}`);
  list.push(`/api${p}`);
  list.push(p);
  return list;
}

async function tryFetch<T>(paths: string[], init?: RequestInit): Promise<T> {
  let lastErr: unknown = null;
  for (const url of paths) {
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...init,
      });
      if (!res.ok) {
        lastErr = new Error(`${res.status} ${res.statusText} at ${url}`);
        continue;
      }
      // DELETE returns no body sometimes
      if ((init?.method || 'GET').toUpperCase() === 'DELETE') return undefined as unknown as T;
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  throw lastErr || new Error('All endpoints failed');
}

export const AdminAPI = {
  listAll: <T>(kind: EntityKind) =>
    tryFetch<T>(candidates(`${kind}`)),

  getById: <T>(kind: EntityKind, id: string | number) =>
    tryFetch<T>(candidates(`${kind}/${id}`)),

  updateById: <T>(kind: EntityKind, id: string | number, payload: Partial<T>) =>
    tryFetch<T>(candidates(`${kind}/${id}`), { method: 'PUT', body: JSON.stringify(payload) }),

  deleteById: (kind: EntityKind, id: string | number) =>
    tryFetch<void>(candidates(`${kind}/${id}`), { method: 'DELETE' }),
};

