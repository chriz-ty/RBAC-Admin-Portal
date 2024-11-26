import { Role, User } from '../types';

export const mockRoles: Role[] = [
  {
    id: 'role_1',
    name: 'Admin',
    description: 'Full system access',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      products: ['create', 'read', 'update', 'delete'],
      orders: ['create', 'read', 'update', 'delete'],
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'role_2',
    name: 'Editor',
    description: 'Can manage content',
    permissions: {
      users: ['read'],
      roles: ['read'],
      products: ['create', 'read', 'update'],
      orders: ['read', 'update'],
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
];

export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    roleId: 'role_1',
    status: 'active',
    lastLogin: '2024-03-10T12:00:00Z',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'user_2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    roleId: 'role_2',
    status: 'active',
    lastLogin: '2024-03-10T11:30:00Z',
    createdAt: '2024-03-02T10:00:00Z',
  },
];