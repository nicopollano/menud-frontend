import { Currency, Day, Typography } from '@ristokit/shared/models/general.model'
import type { Menu } from '@ristokit/shared/models/menu.model'
import type { Branch } from '../models/branch.model.js'
import type { Business } from '../models/business.model.js'
import type { Category } from '../models/category.model.js'
import type { Linkit } from '../models/linkit.model.js'
import type { Product } from '../models/product.model.js'
import type { Promotion } from '../models/promotion.model.js'
import type { Subcategory } from '../models/subcategory.model.js'

export const menu: Menu = {
  id: 'menu_789',
  branchId: 'br_456',
  name: 'Menú Principal',
  cover: '/assets/placeholder.jpeg',
  logo: '/assets/placeholder.jpeg',
  typography: Typography.POPPINS,
  enabled: true,
  createdAt: new Date('2025-03-26T10:00:00Z'),
  updatedAt: new Date('2025-03-26T10:00:00Z'),
  categories: [
    // Categoría: Pizzas
    {
      id: 'cat_101',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
      name: 'Pizzas',
      image: '/assets/c1.jpeg',
      enabled: true,
      createdAt: new Date('2025-03-26T10:00:00Z'),
      updatedAt: new Date('2025-03-26T10:00:00Z'),
      subcategories: [], // Sin subcategorías
      products: [
        {
          id: 'prod_001',
          name: 'Pizza Margherita',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 10.99,
          discountedPrice: 8.99,
          images: ['/assets/p1.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        },
        {
          id: 'prod_002',
          name: 'Pizza Pepperoni',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 12.99,
          discountedPrice: 10.99,
          images: ['/assets/p2.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        },
        {
          id: 'prod_003',
          name: 'Pizza Cuatro Quesos',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 13.99,
          discountedPrice: 11.99,
          images: ['/assets/p3.jpeg'],
          enabled: false,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        }
      ]
    },

    // Categoría: Hamburguesas (con subcategorías)
    {
      id: 'cat_102',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
      name: 'Hamburguesas',
      image: '/assets/c2.jpeg',
      enabled: true,
      createdAt: new Date('2025-03-26T10:00:00Z'),
      updatedAt: new Date('2025-03-26T10:00:00Z'),
      subcategories: [
        {
          id: 'sub_201',
          categoryId: 'cat_102',
          name: 'Hamburguesas de Carne',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          image: '/assets/s1.jpeg',
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z'),
          products: [
            {
              id: 'prod_004',
              subcategoryId: 'sub_201',
              name: 'Hamburguesa Clásica',
              description:
                'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
              price: 8.99,
              images: ['/assets/p4.jpeg'],
              enabled: true,
              createdAt: new Date('2025-03-26T10:00:00Z'),
              updatedAt: new Date('2025-03-26T10:00:00Z')
            },
            {
              id: 'prod_005',
              subcategoryId: 'sub_201',
              name: 'Hamburguesa BBQ',
              description:
                'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
              price: 9.99,
              images: ['/assets/p1.jpeg'],
              enabled: true,
              createdAt: new Date('2025-03-26T10:00:00Z'),
              updatedAt: new Date('2025-03-26T10:00:00Z')
            },
            {
              id: 'prod_006',
              subcategoryId: 'sub_201',
              name: 'Hamburguesa Doble',
              description:
                'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
              price: 11.99,
              images: ['/assets/p2.jpeg'],
              enabled: true,
              createdAt: new Date('2025-03-26T10:00:00Z'),
              updatedAt: new Date('2025-03-26T10:00:00Z')
            }
          ]
        },
        {
          id: 'sub_202',
          categoryId: 'cat_102',
          name: 'Hamburguesas Vegetarianas',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          image: '/assets/s2.jpeg',
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z'),
          products: [
            {
              id: 'prod_007',
              subcategoryId: 'sub_202',
              name: 'Hamburguesa de Lentejas',
              description:
                'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
              price: 7.99,
              images: ['/assets/p3.jpeg'],
              enabled: true,
              createdAt: new Date('2025-03-26T10:00:00Z'),
              updatedAt: new Date('2025-03-26T10:00:00Z')
            },
            {
              id: 'prod_008',
              subcategoryId: 'sub_202',
              name: 'Hamburguesa de Garbanzos',
              description:
                'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
              price: 8.49,
              images: ['/assets/p4.jpeg'],
              enabled: true,
              createdAt: new Date('2025-03-26T10:00:00Z'),
              updatedAt: new Date('2025-03-26T10:00:00Z')
            }
          ]
        }
      ],
      products: [] // Productos están en subcategorías
    },

    // Categoría: Empanadas
    {
      id: 'cat_103',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
      name: 'Empanadas',
      image: '/assets/c2.jpeg',
      enabled: true,
      createdAt: new Date('2025-03-26T10:00:00Z'),
      updatedAt: new Date('2025-03-26T10:00:00Z'),
      subcategories: [], // Sin subcategorías
      products: [
        {
          id: 'prod_009',
          name: 'Empanada de Carne',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 3.99,
          images: ['/assets/p1.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        },
        {
          id: 'prod_010',
          name: 'Empanada de Pollo',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 3.79,
          images: ['/assets/p1.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        },
        {
          id: 'prod_011',
          name: 'Empanada de Queso',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 3.49,
          images: ['/assets/p2.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        }
      ]
    },

    // Categoría: Bebidas
    {
      id: 'cat_104',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
      name: 'Bebidas',
      image: '/assets/c2.jpeg',
      enabled: true,
      createdAt: new Date('2025-03-26T10:00:00Z'),
      updatedAt: new Date('2025-03-26T10:00:00Z'),
      subcategories: [], // Sin subcategorías
      products: [
        {
          id: 'prod_012',
          name: 'Coca-Cola',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 2.5,
          images: ['/assets/p1.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        },
        {
          id: 'prod_013',
          name: 'Jugo de Naranja',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 3.0,
          images: ['/assets/p2.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        },
        {
          id: 'prod_014',
          name: 'Agua Mineral',
          description:
            'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
          price: 1.99,
          images: ['/assets/p3.jpeg'],
          enabled: true,
          createdAt: new Date('2025-03-26T10:00:00Z'),
          updatedAt: new Date('2025-03-26T10:00:00Z')
        }
      ]
    }
  ],
  palette: null,
  palettes: [
    {
      id: 'palette_123',
      menuId: 'menu_789',
      color1: '#FF6347',
      color2: '#FFD700',
      color3: '#00CED1',
      enabled: true,
      createdAt: new Date('2025-03-26T10:00:00Z'),
      updatedAt: new Date('2025-03-26T10:00:00Z')
    }
  ]
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Pizzas',
    description: 'Pizzas',
    image: '/assets/c1.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '2',
    name: 'Hamburguesas',
    description: 'Hamburguesas',
    image: '/assets/c2.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '3',
    name: 'Empanadas',
    description: 'Empanadas',
    image: '/assets/c2.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '4',
    name: 'Bebidas',
    description: 'Bebidas',
    image: '/assets/c2.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  }
]

export const subcategories: Subcategory[] = [
  {
    id: '1',
    categoryId: '1',
    name: 'Pizza Margherita',
    description: 'Pizza Margherita',
    image: '/assets/s1.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Pizza Pepperoni',
    description: 'Pizza Pepperoni',
    image: '/assets/s1.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '3',
    categoryId: '1',
    name: 'Pizza Cuatro Quesos',
    description: 'Pizza Cuatro Quesos',
    image: '/assets/s1.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '4',
    categoryId: '1',
    name: 'Hamburguesa Clásica',
    description: 'Hamburguesa Clásica',
    image: '/assets/s1.jpeg',
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  }
]

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Pizza Margherita',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    price: 10.99,
    discountedPrice: 8.99,
    images: ['/assets/p1.jpeg'],
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: 'prod_002',
    name: 'Pizza Pepperoni',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    price: 12.99,
    discountedPrice: 10.99,
    images: ['/assets/p2.jpeg'],
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: 'prod_003',
    name: 'Pizza Cuatro Quesos',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    price: 13.99,
    discountedPrice: 11.99,
    images: ['/assets/p3.jpeg'],
    enabled: false,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: 'prod_004',
    name: 'Hamburguesa Clásica',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    price: 8.99,
    images: ['/assets/p4.jpeg'],
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: 'prod_005',
    name: 'Hamburguesa BBQ',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    price: 9.99,
    images: ['/assets/p1.jpeg'],
    enabled: true,
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  }
]

export const businesses: Business[] = [
  {
    id: '1',
    name: 'CocaWit',
    description: 'CocaWit es una empresa de cocaína y jugo de naranja',
    logo: '/assets/logo.jpeg',
    enabled: true,
    summary: {
      totalBranches: 2
    },
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '2',
    name: 'Marzop',
    description: 'Marzop es una empresa de jugo de naranja',
    logo: '/assets/logo.jpeg',
    enabled: true,
    summary: {
      totalBranches: 1
    },
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '3',
    name: 'Warzone',
    description:
      'Warzone es una empresa de jugo de naranja. En este caso, el jugo es de origen mexicano con un sabor extraño',
    logo: '/assets/logo.jpeg',
    enabled: false,
    summary: {
      totalBranches: 12
    },
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '4',
    name: 'Pepsi',
    description:
      'Pepsi es una empresa de jugo de naranja. En este caso, el jugo es de origen mexicano con un sabor extraño',
    logo: '/assets/logo.jpeg',
    enabled: false,
    summary: {
      totalBranches: 12
    },
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  }
]

export const branches: Branch[] = [
  {
    id: '1',
    businessId: '1',
    slug: 'br_1',
    name: 'Sucursal 1',
    description: 'Sucursal 1 de CocaWit',
    logo: '/assets/logo.jpeg',
    phone: '+56 987654321',
    address: 'Av. de la República, 123',
    currency: Currency.ARS,
    enabled: true,
    summary: {
      totalMenus: 2
    },
    schedules: [],
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '2',
    businessId: '1',
    slug: 'br_2',
    name: 'Sucursal 2',
    description: 'Sucursal 2 de CocaWit',
    logo: '/assets/logo.jpeg',
    phone: '+56 987654321',
    address: 'Av. de la República, 123',
    currency: Currency.ARS,
    enabled: true,
    summary: {
      totalMenus: 2
    },
    schedules: [],
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '3',
    businessId: '1',
    slug: 'br_3',
    name: 'Sucursal 3',
    description: 'Sucursal 3 de CocaWit',
    logo: '/assets/logo.jpeg',
    phone: '+56 987654321',
    address: 'Av. de Lomas, 123',
    currency: Currency.ARS,
    enabled: true,
    summary: {
      totalMenus: 2
    },
    schedules: [],
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: '4',
    businessId: '1',
    slug: 'br_4',
    name: 'Sucursal 4',
    description: 'Sucursal 4 de CocaWit',
    logo: '/assets/logo.jpeg',
    phone: '+56 987654321',
    address: 'Av. de Otero, 123',
    currency: Currency.ARS,
    enabled: true,
    summary: {
      totalMenus: 2
    },
    schedules: [],
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  }
]

export const menus: Menu[] = [
  {
    id: '1',
    name: 'Cena',
    palette: null,
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    cover: '/assets/logo.jpeg',
    logo: '/assets/logo.jpeg',
    typography: Typography.POPPINS,
    enabled: true,
    summary: {
      totalCategories: 2,
      totalProducts: 2
    },
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z'),
    palettes: [
      {
        id: '1',
        menuId: '1',
        color1: '#FF6347',
        color2: '#FFD700',
        color3: '#00CED1',
        enabled: true,
        createdAt: new Date('2025-03-26T10:00:00Z'),
        updatedAt: new Date('2025-03-26T10:00:00Z')
      }
    ]
  },
  {
    id: '2',
    name: 'Desayuno',
    palette: null,
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac fusce at massa auctor vitae convallis tortor. Lacus at odio vel pharetra at pulvinar volutpat cursus elementum.',
    cover: '/assets/logo.jpeg',
    logo: '/assets/logo.jpeg',
    typography: Typography.POPPINS,
    enabled: true,
    summary: {
      totalCategories: 2,
      totalProducts: 2
    },
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z'),
    palettes: [
      {
        id: '1',
        menuId: '1',
        color1: '#FF6347',
        color2: '#FFD700',
        color3: '#00CED1',
        enabled: true,
        createdAt: new Date('2025-03-26T10:00:00Z'),
        updatedAt: new Date('2025-03-26T10:00:00Z')
      }
    ]
  }
]

export const linkit: Linkit = {
  id: 'linkit_123',
  website: 'https://example.com',
  whatsapp: '+1234567890',
  instagram: 'https://instagram.com/example',
  facebook: 'https://facebook.com/example',
  location: 'https://maps.example.com/location',
  linkedin: 'https://linkedin.com/company/example',
  tiktok: 'https://tiktok.com/@example',
  twitter: 'https://twitter.com/example',
  createdAt: new Date('2025-03-26T10:00:00Z'),
  updatedAt: new Date('2025-03-26T10:00:00Z')
}

export const linkits: Linkit[] = [
  {
    id: 'linkit_123',
    website: 'https://example.com',
    whatsapp: '+1234567890',
    instagram: 'https://instagram.com/example',
    facebook: 'https://facebook.com/example',
    location: 'https://maps.example.com/location',
    linkedin: 'https://linkedin.com/company/example',
    tiktok: 'https://tiktok.com/@example',
    twitter: 'https://twitter.com/example',
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  },
  {
    id: 'linkit_456',
    website: 'https://example2.com',
    whatsapp: '+0987654321',
    instagram: 'https://instagram.com/example2',
    facebook: 'https://facebook.com/example2',
    location: 'https://maps.example.com/location2',
    linkedin: 'https://linkedin.com/company/example2',
    tiktok: 'https://tiktok.com/@example2',
    twitter: 'https://twitter.com/example2',
    createdAt: new Date('2025-03-26T10:00:00Z'),
    updatedAt: new Date('2025-03-26T10:00:00Z')
  }
]

export const promotions: Promotion[] = [
  {
    id: 'promo_001',
    title: '2x1 en Pizzas',
    description: 'Lleva 2 pizzas por el precio de 1. Válido para todas las pizzas de nuestro menú.',
    image: '/assets/promo1.jpeg',
    startsAt: new Date('2025-08-15T08:00:00.000Z'),
    endsAt: new Date('2025-08-31T22:00:00.000Z'),
    days: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY],
    enabled: true,
    products: []
  },
  {
    id: 'promo_002',
    title: 'Happy Hour Hamburguesas',
    description: 'Descuento del 30% en todas las hamburguesas de 18:00 a 20:00 horas.',
    image: '/assets/promo2.jpeg',
    startsAt: new Date('2025-08-10T18:00:00.000Z'),
    endsAt: new Date('2025-09-10T20:00:00.000Z'),
    days: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY, Day.SATURDAY, Day.SUNDAY],
    enabled: true,
    products: []
  },
  {
    id: 'promo_003',
    title: 'Combo Empanadas + Bebida',
    description: 'Compra 6 empanadas y llévate una bebida gratis. Ideal para compartir.',
    image: '/assets/promo3.jpeg',
    startsAt: new Date('2025-08-01T12:00:00.000Z'),
    endsAt: new Date('2025-08-25T23:59:00.000Z'),
    days: [Day.SATURDAY, Day.SUNDAY],
    enabled: true,
    products: []
  },
  {
    id: 'promo_004',
    title: 'Descuento Estudiantes',
    description: 'Estudiantes universitarios obtienen 20% de descuento presentando credencial.',
    image: '/assets/promo4.jpeg',
    startsAt: new Date('2025-08-05T11:00:00.000Z'),
    endsAt: new Date('2025-12-31T21:00:00.000Z'),
    days: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY],
    enabled: true,
    products: []
  },
  {
    id: 'promo_005',
    title: 'Menú Ejecutivo',
    description: 'Pizza + bebida + postre por solo $15.99. Disponible de lunes a viernes.',
    image: '/assets/promo5.jpeg',
    startsAt: new Date('2025-08-01T12:00:00.000Z'),
    endsAt: new Date('2025-08-30T15:00:00.000Z'),
    days: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY],
    enabled: true,
    products: []
  },
  {
    id: 'promo_006',
    title: 'Noche de Hamburguesas Vegetarianas',
    description: 'Todos los jueves, hamburguesas vegetarianas con 25% de descuento.',
    image: '/assets/promo6.jpeg',
    startsAt: new Date('2025-08-08T19:00:00.000Z'),
    endsAt: new Date('2025-09-26T23:00:00.000Z'),
    days: [Day.THURSDAY],
    enabled: true,
    products: []
  }
]
