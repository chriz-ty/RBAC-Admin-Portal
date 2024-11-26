import React, { useEffect } from 'react';
import { Role, Resource, Permission } from '../types';
import { X } from 'lucide-react';

interface RoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: Partial<Role>) => void;
  role?: Role;
  existingRoles: Role[];
}

const resources: Resource[] = ['users', 'roles', 'products', 'orders'];
const permissions: Permission[] = ['create', 'read', 'update', 'delete'];

export default function RoleDialog({ isOpen, onClose, onSave, role, existingRoles }: RoleDialogProps) {
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>('');
  const [formData, setFormData] = React.useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: {
      users: ['read'],
      roles: ['read'],
      products: ['read'],
      orders: ['read'],
    },
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
      setSelectedRoleId(role.id);
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: {
          users: ['read'],
          roles: ['read'],
          products: ['read'],
          orders: ['read'],
        },
      });
      setSelectedRoleId('');
    }
  }, [role, isOpen]);

  if (!isOpen) return null;

  const handleRoleSelect = (roleId: string) => {
    const selectedRole = existingRoles.find(r => r.id === roleId);
    if (selectedRole) {
      setFormData(selectedRole);
      setSelectedRoleId(roleId);
    }
  };

  const handlePermissionChange = (resource: Resource, permission: Permission, checked: boolean) => {
    const currentPermissions = formData.permissions?.[resource] || [];
    const newPermissions = checked
      ? [...currentPermissions, permission]
      : currentPermissions.filter(p => p !== permission);

    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: newPermissions,
      },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {role ? 'Edit Role' : 'Add New Role'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
          onClose();
        }} className="p-6 space-y-6">
          {role ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                value={selectedRoleId}
                onChange={(e) => handleRoleSelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a role</option>
                {existingRoles.map((r) => (
                  <option key={`role-option-${r.id}`} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.map(resource => (
                <div key={`permission-group-${resource}`} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-semibold text-gray-900 capitalize mb-3">{resource}</h4>
                  <div className="space-y-2">
                    {permissions.map(permission => (
                      <label key={`permission-checkbox-${resource}-${permission}`} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.permissions?.[resource]?.includes(permission) || false}
                          onChange={(e) => handlePermissionChange(resource, permission, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {permission}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}