// Mock API functions for the jewelry store

export interface Product {
  id: string;
  slug: string;
  title: string;
  sku: string;
  images: string[];
  price: number;
  metalPurity: string;
  weight: string;
  sizeOptions: string[];
  rating: number;
  badges: string[];
  collection: string;
  category: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'elegant-diamond-ring',
    title: 'Elegant Diamond Ring',
    sku: 'EDR001',
    images: ['/src/assets/ring.jpg'],
    price: 45000,
    metalPurity: '18K',
    weight: '3.2g',
    sizeOptions: ['14', '15', '16', '17', '18'],
    rating: 4.8,
    badges: ['BIS Hallmarked', 'Free Shipping'],
    collection: 'Gems',
    category: 'ring',
    description: 'A stunning diamond ring crafted with precision and elegance.',
    specifications: {
      'Metal': '18K Gold',
      'Stone': 'Diamond',
      'Weight': '3.2g',
      'Purity': '18K'
    },
    inStock: true
  },
  {
    id: '2',
    slug: 'gold-bracelet-luxury',
    title: 'Luxury Gold Bracelet',
    sku: 'LGB002',
    images: ['/src/assets/bracelet.jpg'],
    price: 32000,
    metalPurity: '22K',
    weight: '8.5g',
    sizeOptions: ['S', 'M', 'L'],
    rating: 4.9,
    badges: ['BIS Hallmarked', '7-Day Return'],
    collection: 'angel',
    category: 'bracelet',
    description: 'An intricate gold bracelet perfect for special occasions.',
    specifications: {
      'Metal': '22K Gold',
      'Weight': '8.5g',
      'Purity': '22K',
      'Style': 'Traditional'
    },
    inStock: true
  },
  {
    id: '3',
    slug: 'colorful-gemstone-pendant',
    title: 'Colorful Gemstone Pendant',
    sku: 'CGP003',
    images: ['/src/assets/pendant.jpg'],
    price: 28000,
    metalPurity: '18K',
    weight: '4.1g',
    sizeOptions: ['One Size'],
    rating: 4.7,
    badges: ['BIS Hallmarked', 'Free Cleaning'],
    collection: 'Gems',
    category: 'pendant',
    description: 'A vibrant pendant featuring multiple gemstones in a beautiful design.',
    specifications: {
      'Metal': '18K Gold',
      'Stones': 'Mixed Gemstones',
      'Weight': '4.1g',
      'Chain': 'Included'
    },
    inStock: true
  }
];

export const getProducts = async (filter?: {
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...mockProducts];
  
  if (filter?.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filter.category);
  }
  
  if (filter?.collection) {
    filteredProducts = filteredProducts.filter(p => p.collection === filter.collection);
  }
  
  if (filter?.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice!);
  }
  
  if (filter?.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= filter.maxPrice!);
  }
  
  if (filter?.sort) {
    switch (filter.sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // newest first
        break;
    }
  }
  
  return filteredProducts;
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(p => p.slug === slug) || null;
};

export const submitCustomDesign = async (payload: {
  name: string;
  email: string;
  phone: string;
  description: string;
  budget: string;
  files?: FileList;
}) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Custom design request submitted:', payload);
  return { success: true, message: 'Custom design request submitted successfully!' };
};

export const submitRepair = async (payload: {
  name: string;
  email: string;
  phone: string;
  itemType: string;
  issue: string;
  branch: string;
  photo?: File;
}) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Repair request submitted:', payload);
  return { success: true, message: 'Repair request submitted successfully!' };
};