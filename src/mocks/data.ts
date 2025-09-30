// src/mocks/data.ts
export type Product = {
    id: string | number;
    name: string;
    brand: string;
    description: string;
    price: number;
    category: string;
    stockQuantity: number;
    releaseDate: string;
    productAvailable: boolean;
    imageName?: string; // mock only
  };
  
  export type Gem = { id: number; name: string; color?: string; cut?: string; clarity?: string; carat?: number; origin?: string };
  export type Category = { id: number; name: string; slug: string; kind?: 'PRODUCT' | 'GEM'; isGem?: boolean };
  export type Metal = { id: number; name: string; purity?: string };
  
  type DB = {
    products: Product[];
    gems: Gem[];
    categories: Category[];
    metals: Metal[];
    lastId: number;
  };
  
  const KEY = '__kj_mock_db__';
  
  function seed(): DB {
    return {
      lastId: 1000,
      products: [
        { id: 1, name: 'Gold Ring A', brand: 'Gold', description: 'Shiny ring', price: 100000, category: 'Ring', stockQuantity: 5, releaseDate: '2025-01-10', productAvailable: true },
        { id: 2, name: 'Silver Chain B', brand: 'Silver', description: 'Elegant chain', price: 45000, category: 'Chain', stockQuantity: 12, releaseDate: '2025-02-05', productAvailable: true },
      ],
      gems: [
        { id: 1, name: 'Ruby', color: 'Red', cut: 'Oval', clarity: 'VS1', carat: 1.2, origin: 'Sri Lanka' },
        { id: 2, name: 'Sapphire', color: 'Blue', cut: 'Round', clarity: 'VVS2', carat: 0.9, origin: 'Sri Lanka' },
      ],
      categories: [
        { id: 1, name: 'Ring', slug: 'ring', kind: 'PRODUCT', isGem: false },
        { id: 2, name: 'Chain', slug: 'chain', kind: 'PRODUCT', isGem: false },
        { id: 3, name: 'Gemstones', slug: 'gemstones', kind: 'GEM', isGem: true },
      ],
      metals: [
        { id: 1, name: 'Gold', purity: '22K' },
        { id: 2, name: 'Silver', purity: '925' },
      ],
    };
  }
  
  export function loadDB(): DB {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) as DB;
    } catch {}
    const db = seed();
    saveDB(db);
    return db;
  }
  
  export function saveDB(db: DB) {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {}
  }
  
  export function genId(db: DB) {
    db.lastId += 1;
    return db.lastId;
  }
  