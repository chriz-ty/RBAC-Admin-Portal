export type Permission = 'create' | 'read' | 'update' | 'delete';

export type Resource = 'users' | 'roles' | 'products' | 'orders';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<Resource, Permission[]>;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}