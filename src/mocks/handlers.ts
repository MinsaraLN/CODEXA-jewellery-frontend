// src/mocks/handlers.ts
/*import { http, HttpResponse } from 'msw';
import { genId, loadDB, saveDB, Product } from './data';

// Helper: match both with and without '/api' prefix
const p = (path: string) => [`/api${path}`] as const;

export const handlers = [
  // ---- Auth ----
  http.post(...p('/auth/login'), async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    // Always succeed in mock
    return HttpResponse.json({ token: 'mock-token', user: { id: 'u1', name: body.email.split('@')[0], email: body.email } });
  }),
  http.post(...p('/auth/signup'), async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string; password: string };
    return HttpResponse.json({ token: 'mock-token', user: { id: 'u2', name: body.name, email: body.email } });
  }),

  // ---- Products ----
  http.get(...p('/products'), async () => {
    const db = loadDB();
    return HttpResponse.json(db.products);
  }),

  http.get(...p('/products/:id'), async ({ params }) => {
    const db = loadDB();
    const item = db.products.find(p => String(p.id) === String(params.id));
    if (!item) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(item);
  }),

  http.put(...p('/products/:id'), async ({ params, request }) => {
    const db = loadDB();
    const idx = db.products.findIndex(p => String(p.id) === String(params.id));
    if (idx < 0) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const patch = await request.json() as Partial<Product>;
    db.products[idx] = { ...db.products[idx], ...patch };
    saveDB(db);
    return HttpResponse.json(db.products[idx]);
  }),

  http.delete(...p('/products/:id'), async ({ params }) => {
    const db = loadDB();
    const before = db.products.length;
    db.products = db.products.filter(p => String(p.id) !== String(params.id));
    if (db.products.length === before) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    saveDB(db);
    return HttpResponse.json({ ok: true });
  }),

  // Create (multipart) — matches your old form: POST /product
  http.post(...p('/product'), async ({ request }) => {
    const db = loadDB();
    const contentType = request.headers.get('content-type') || '';
    let newProd: Product | null = null;

    if (contentType.includes('multipart/form-data')) {
      const fd = await request.formData();

      if (fd.has('product')) {
        // JSON + image mode
        const p = JSON.parse(String(fd.get('product') || '{}'));
        newProd = {
          id: genId(db),
          name: p.name || '',
          brand: p.brand || '',
          description: p.description || '',
          price: Number(p.price || 0),
          category: p.category || '',
          stockQuantity: Number(p.stockQuantity || 0),
          releaseDate: p.releaseDate || '',
          productAvailable: !!p.productAvailable,
        };
      } else {
        // Field-per-property mode
        newProd = {
          id: genId(db),
          name: String(fd.get('name') || ''),
          brand: String(fd.get('brand') || ''),
          description: String(fd.get('description') || ''),
          price: Number(fd.get('price') || 0),
          category: String(fd.get('category') || ''),
          stockQuantity: Number(fd.get('stockQuantity') || 0),
          releaseDate: String(fd.get('releaseDate') || ''),
          productAvailable: String(fd.get('productAvailable') || '') === 'true',
        };
      }

      const img = fd.get('imageFile') as File | null;
      if (img) newProd.imageName = img.name;
    } else {
      // fallback JSON body (not typical for images, but just in case)
      const p = await request.json() as Partial<Product>;
      newProd = {
        id: genId(db),
        name: p.name || '',
        brand: p.brand || '',
        description: p.description || '',
        price: Number(p.price || 0),
        category: p.category || '',
        stockQuantity: Number(p.stockQuantity || 0),
        releaseDate: p.releaseDate || '',
        productAvailable: !!p.productAvailable,
      };
    }

    db.products.push(newProd!);
    saveDB(db);
    return HttpResponse.json(newProd!, { status: 201 });
  }),

  // ---- Gems / Categories / Metals (read-only stubs) ----
  http.get(...p('/gems'), async () => HttpResponse.json(loadDB().gems)),
  http.get(...p('/categories'), async () => HttpResponse.json(loadDB().categories)),
  http.get(...p('/metals'), async () => HttpResponse.json(loadDB().metals)),
];*/




// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { genId, loadDB, saveDB, Product } from './data';

// Match both "/products" and "/api/products"
const paths = (p: string) => [`*/${p.replace(/^\//, '')}`, `*/api/${p.replace(/^\//, '')}`] as const;

export const handlers = [
  // ---- Auth ----
  http.post('*/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    return HttpResponse.json({ token: 'mock-token', user: { id: 'u1', name: body.email.split('@')[0], email: body.email } });
  }),
  http.post('*/auth/signup', async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string; password: string };
    return HttpResponse.json({ token: 'mock-token', user: { id: 'u2', name: body.name, email: body.email } });
  }),

  // ---- Products: list / get / update / delete ----
  ...paths('/products').map((path) =>
    http.get(path, async () => HttpResponse.json(loadDB().products))
  ),
  ...paths('/products/:id').map((path) =>
    http.get(path, async ({ params }) => {
      const db = loadDB();
      const item = db.products.find(p => String(p.id) === String(params.id));
      return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
    })
  ),
  ...paths('/products/:id').map((path) =>
    http.put(path, async ({ params, request }) => {
      const db = loadDB();
      const idx = db.products.findIndex(p => String(p.id) === String(params.id));
      if (idx < 0) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      const patch = await request.json() as Partial<Product>;
      db.products[idx] = { ...db.products[idx], ...patch };
      saveDB(db);
      return HttpResponse.json(db.products[idx]);
    })
  ),
  ...paths('/products/:id').map((path) =>
    http.delete(path, async ({ params }) => {
      const db = loadDB();
      const before = db.products.length;
      db.products = db.products.filter(p => String(p.id) !== String(params.id));
      if (db.products.length === before) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      saveDB(db);
      return HttpResponse.json({ ok: true });
    })
  ),

  // ---- Create product (multipart) — handles /product and /api/product
  ...paths('/product').map((path) =>
    http.post(path, async ({ request }) => {
      const db = loadDB();
      const ct = request.headers.get('content-type') || '';
      let newProd: Product = {
        id: genId(db), name: '', brand: '', description: '', price: 0,
        category: '', stockQuantity: 0, releaseDate: '', productAvailable: false,
      };

      if (ct.includes('multipart/form-data')) {
        const fd = await request.formData();
        if (fd.has('product')) {
          const p = JSON.parse(String(fd.get('product') || '{}'));
          Object.assign(newProd, {
            name: p.name || '', brand: p.brand || '', description: p.description || '',
            price: Number(p.price || 0), category: p.category || '',
            stockQuantity: Number(p.stockQuantity || 0), releaseDate: p.releaseDate || '',
            productAvailable: !!p.productAvailable,
          });
        } else {
          newProd = {
            ...newProd,
            name: String(fd.get('name') || ''),
            brand: String(fd.get('brand') || ''),
            description: String(fd.get('description') || ''),
            price: Number(fd.get('price') || 0),
            category: String(fd.get('category') || ''),
            stockQuantity: Number(fd.get('stockQuantity') || 0),
            releaseDate: String(fd.get('releaseDate') || ''),
            productAvailable: String(fd.get('productAvailable') || '') === 'true',
          };
        }
      } else {
        const p = await request.json() as Partial<Product>;
        Object.assign(newProd, p);
      }

      db.products.push(newProd);
      saveDB(db);
      return HttpResponse.json(newProd, { status: 201 });
    })
  ),

  // ---- Read-only stubs for others so "Display All" doesn't retry ----
  ...paths('/gems').map((path) =>
    http.get(path, async () => HttpResponse.json(loadDB().gems))
  ),
  ...paths('/categories').map((path) =>
    http.get(path, async () => HttpResponse.json(loadDB().categories))
  ),
  ...paths('/metals').map((path) =>
    http.get(path, async () => HttpResponse.json(loadDB().metals))
  ),
];
