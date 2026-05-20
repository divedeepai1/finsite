import { useState } from 'react';
import { Filter, UserPlus, MoreVertical, Edit2, X } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  avatarColor: string;
  accessLevel: string;
  ownClients: boolean;
  allClients: boolean;
  fieldAdmin: boolean;
  active: boolean;
}

interface InviteUserForm {
  firstName: string;
  lastName: string;
  email: string;
  accessLevel: string;
  ownClients: boolean;
  allClients: boolean;
  fieldAdmin: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Aryan Pathak',
      email: 'aryan@finsite.ai',
      avatar: 'AP',
      avatarColor: '#3B82F6',
      accessLevel: 'Admin',
      ownClients: true,
      allClients: true,
      fieldAdmin: true,
      active: true,
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      email: 'sarah.j@finsite.ai',
      avatar: 'SJ',
      avatarColor: '#F59E0B',
      accessLevel: 'Paraprofessional',
      ownClients: true,
      allClients: false,
      fieldAdmin: false,
      active: true,
    },
    {
      id: 3,
      name: 'Michael King',
      email: 'michael.k@finsite.ai',
      avatar: 'MK',
      avatarColor: '#10B981',
      accessLevel: 'Advisor',
      ownClients: true,
      allClients: false,
      fieldAdmin: false,
      active: true,
    },
  ]);

  const handleCheckboxChange = (userId: number, field: string, value: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ));
  };

  const handleAccessLevelChange = (userId: number, value: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, accessLevel: value } : user
    ));
  };

  // Invite User Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState<InviteUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    accessLevel: 'Advisor',
    ownClients: true,
    allClients: false,
    fieldAdmin: false,
  });

  const handleInviteFormChange = (field: keyof InviteUserForm, value: string | boolean) => {
    setInviteForm(prev => ({ ...prev, [field]: value }));
  };

  const handleInviteUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `${inviteForm.firstName} ${inviteForm.lastName}`,
      email: inviteForm.email,
      avatar: `${inviteForm.firstName[0]}${inviteForm.lastName[0]}`,
      avatarColor: '#3B82F6',
      accessLevel: inviteForm.accessLevel,
      ownClients: inviteForm.ownClients,
      allClients: inviteForm.allClients,
      fieldAdmin: inviteForm.fieldAdmin,
      active: true,
    };
    setUsers([...users, newUser]);
    setIsInviteModalOpen(false);
    setInviteForm({
      firstName: '',
      lastName: '',
      email: '',
      accessLevel: 'Advisor',
      ownClients: true,
      allClients: false,
      fieldAdmin: false,
    });
  };

  return (
    <div className="bg-[#0B1120] p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-[#3B82F6] rounded flex items-center justify-center">
              <span className="text-white text-xs">👥</span>
            </div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
          </div>
          <p className="text-gray-400 text-sm">Manage access levels and permissions for firm members.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-gray-700 rounded text-white text-sm hover:bg-[#252b3d] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] rounded text-white text-sm font-medium hover:bg-[#2563EB] transition-colors"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
            Invite User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827] rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Name</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Access Level</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Client Visibility</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Field Admin</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Active</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800 hover:bg-[#1a1f2e] transition-colors">
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: user.avatarColor }}
                    >
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Access Level */}
                <td className="px-6 py-4">
                  <select
                    value={user.accessLevel}
                    onChange={(e) => handleAccessLevelChange(user.id, e.target.value)}
                    className="bg-[#0B1120] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Advisor">Advisor</option>
                    <option value="Paraprofessional">Paraprofessional</option>
                  </select>
                </td>

                {/* Client Visibility */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.ownClients}
                        onChange={(e) => handleCheckboxChange(user.id, 'ownClients', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                      />
                      <span className="text-gray-400 text-sm">Own clients</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.allClients}
                        onChange={(e) => handleCheckboxChange(user.id, 'allClients', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                      />
                      <span className="text-gray-400 text-sm">All clients</span>
                    </label>
                  </div>
                </td>

                {/* Field Admin */}
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={user.fieldAdmin}
                    onChange={(e) => handleCheckboxChange(user.id, 'fieldAdmin', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                  />
                </td>

                {/* Active */}
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={user.active}
                    onChange={(e) => handleCheckboxChange(user.id, 'active', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                  />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-[#252b3d] rounded transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                    <button className="p-1 hover:bg-[#252b3d] rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-xs">
        © 2025 Koris.AI. All rights reserved. Version 2.4.0
      </div>

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Invite New User</h2>
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors" onClick={() => setIsInviteModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleInviteUser(); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">First Name</label>
                  <input
                    type="text"
                    value={inviteForm.firstName}
                    onChange={(e) => handleInviteFormChange('firstName', e.target.value)}
                    className="w-full bg-[#0B1120] border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Last Name</label>
                  <input
                    type="text"
                    value={inviteForm.lastName}
                    onChange={(e) => handleInviteFormChange('lastName', e.target.value)}
                    className="w-full bg-[#0B1120] border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => handleInviteFormChange('email', e.target.value)}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Access Level</label>
                <select
                  value={inviteForm.accessLevel}
                  onChange={(e) => handleInviteFormChange('accessLevel', e.target.value)}
                  className="bg-[#0B1120] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Paraprofessional">Paraprofessional</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Client Visibility</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inviteForm.ownClients}
                      onChange={(e) => handleInviteFormChange('ownClients', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                    />
                    <span className="text-gray-400 text-sm">Own clients</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inviteForm.allClients}
                      onChange={(e) => handleInviteFormChange('allClients', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                    />
                    <span className="text-gray-400 text-sm">All clients</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inviteForm.fieldAdmin}
                    onChange={(e) => handleInviteFormChange('fieldAdmin', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                  />
                  <span className="text-gray-400 text-sm">Field Admin</span>
                </label>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 bg-[#1a1f2e] border border-gray-700 rounded text-white text-sm hover:bg-[#252b3d] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3B82F6] rounded text-white text-sm font-medium hover:bg-[#2563EB] transition-colors"
                >
                  Invite User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}