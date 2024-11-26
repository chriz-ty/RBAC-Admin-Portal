import React from 'react';
import { User, Role } from '../types';
import { mockUsers } from '../data/mock';
import { MoreVertical, UserPlus, Pencil, Trash2 } from 'lucide-react';
import UserDialog from './UserDialog';

interface UserListProps {
  roles: Role[];
}

export default function UserList({ roles }: UserListProps) {
  const [users, setUsers] = React.useState<User[]>(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const [showActions, setShowActions] = React.useState<string | null>(null);

  const getRoleName = (roleId: string) => {
    return roles.find(role => role.id === roleId)?.name || 'Unknown';
  };

  const handleSave = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: (users.length + 1).toString(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        ...userData,
      } as User;
      setUsers([...users, newUser]);
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            <button
              onClick={() => {
                setSelectedUser(undefined);
                setIsDialogOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <UserPlus size={20} className="mr-2" />
              Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                      {getRoleName(user.roleId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      {showActions === user.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDialogOpen(true);
                                setShowActions(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Pencil size={16} className="mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(user.id);
                                setShowActions(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedUser(undefined);
        }}
        onSave={handleSave}
        user={selectedUser}
        roles={roles}
      />
    </>
  );
}