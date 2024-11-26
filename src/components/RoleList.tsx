import React from 'react';
import { Role } from '../types';
import { mockRoles } from '../data/mock';
import { Shield, Pencil, Trash2 } from 'lucide-react';
import RoleDialog from './RoleDialog';

export default function RoleList() {
  const [roles, setRoles] = React.useState<Role[]>(mockRoles);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | undefined>();

  const handleSave = (roleData: Partial<Role>) => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id 
          ? { ...role, ...roleData, updatedAt: new Date().toISOString() }
          : role
      ));
    } else {
      const newRole: Role = {
        id: `role_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...roleData,
      } as Role;
      setRoles([...roles, newRole]);
    }
    setSelectedRole(undefined);
  };

  const handleDelete = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const PermissionBadge = ({ permission }: { permission: string; roleId: string; resource: string }) => (
    <span className="px-4 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
      {permission}
    </span>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
        <button
          onClick={() => {
            setSelectedRole(undefined);
            setIsDialogOpen(true);
          }}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          <Shield className="mr-2" size={24} />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={`role-card-${role.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{role.name}</h2>
                <p className="text-gray-600 mb-6">{role.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setIsDialogOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {Object.entries(role.permissions).map(([resource, permissions]) => (
              <div key={`permissions-${role.id}-${resource}`} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize mb-3">{resource}</h3>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((permission) => (
                    <PermissionBadge 
                      key={`permission-${role.id}-${resource}-${permission}`}
                      permission={permission}
                      roleId={role.id}
                      resource={resource}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <RoleDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedRole(undefined);
        }}
        onSave={handleSave}
        role={selectedRole}
        existingRoles={roles}
      />
    </div>
  );
}