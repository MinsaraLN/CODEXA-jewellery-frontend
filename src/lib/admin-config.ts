// src/lib/admin-config.ts
import type { EntityKind } from './admin';

export type Column = { key: string; label: string };

export const adminConfig: Record<EntityKind, { label: string; columns: Column[] }> = {
  products: {
    label: 'Products',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'sku', label: 'SKU' },
      { key: 'title', label: 'Title' },
      { key: 'price', label: 'Price' },
      { key: 'metalPurity', label: 'Metal' },
      { key: 'weight', label: 'Weight' },
      { key: 'category', label: 'Category' },
    ],
  },
  gems: {
    label: 'Gems',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'color', label: 'Color' },
      { key: 'cut', label: 'Cut' },
      { key: 'clarity', label: 'Clarity' },
      { key: 'carat', label: 'Carat' },
      { key: 'origin', label: 'Origin' },
    ],
  },
  categories: {
    label: 'Categories',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'kind', label: 'Kind' },
    ],
  },
  metals: {
    label: 'Metals',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'purity', label: 'Purity' },
    ],
  },
};
