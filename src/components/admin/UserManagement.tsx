import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Shield, 
  Edit, 
  Trash2,
  Mail,
  Key,
  Activity
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastActive: string;
  twoFA: boolean;
}

export function UserManagement() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@inchtomilez.com',
      role: 'admin',
      status: 'active',
      lastActive: '2 minutes ago',
      twoFA: true
    },
    {
      id: '2',
      name: 'Content Editor',
      email: 'editor@inchtomilez.com',
      role: 'editor',
      status: 'active',
      lastActive: '1 hour ago',
      twoFA: false
    },
    {
      id: '3',
      name: 'Guest Viewer',
      email: 'viewer@inchtomilez.com',
      role: 'viewer',
      status: 'inactive',
      lastActive: '3 days ago',
      twoFA: false
    }
  ]);

  const roleColors = {
    admin: 'red' as const,
    editor: 'blue' as const,
    viewer: 'green' as const
  };

  const permissions = {
    admin: ['All Permissions', 'User Management', 'Theme Editing', 'Content Publishing', 'System Settings'],
    editor: ['Content Editing', 'Media Upload', 'Preview Changes', 'Schedule Posts'],
    viewer: ['View Content', 'View Analytics']
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">User & Role Management</h1>
            <p className="body-lg text-gray-600">
              Manage team access and permissions
            </p>
          </div>
          <Button 
            className="btn-award btn-lg-award"
            onClick={() => setShowAddUser(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add User
          </Button>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal animation="stagger">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: '3', icon: Users, color: 'blue' },
            { label: 'Active Now', value: '2', icon: Activity, color: 'green' },
            { label: 'Admins', value: '1', icon: Shield, color: 'red' },
            { label: '2FA Enabled', value: '1', icon: Key, color: 'purple' }
          ].map((stat, index) => (
            <InnovativeCard
              key={index}
              effect="3d-tilt"
              className="p-6 text-center hover-lift-md"
            >
              <ColorfulIcon
                icon={stat.icon}
                color={stat.color as any}
                animation="pulse-glow"
                size={40}
                className="mb-4 mx-auto"
              />
              <div className="heading-lg mb-1">{stat.value}</div>
              <div className="body-sm text-gray-600">{stat.label}</div>
            </InnovativeCard>
          ))}
        </div>
      </ScrollReveal>

      {/* Users List */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="glow-border" className="p-6">
          <h2 className="heading-md mb-6">Team Members</h2>
          
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="glass-subtle p-6 rounded-xl hover-lift-sm transition-smooth"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${
                      user.role === 'admin' ? 'from-red-500 to-pink-500' :
                      user.role === 'editor' ? 'from-blue-500 to-cyan-500' :
                      'from-green-500 to-emerald-500'
                    } flex items-center justify-center`}>
                      <span className="text-white font-bold">
                        {user.name.charAt(0)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="heading-sm">{user.name}</h3>
                        <div className="badge-glass">
                          <ColorfulIcon
                            icon={Shield}
                            color={roleColors[user.role]}
                            size={12}
                            className="mr-1"
                          />
                          <span className="text-xs capitalize">{user.role}</span>
                        </div>
                        {user.twoFA && (
                          <div className="badge-glass">
                            <Key className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-xs">2FA</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 body-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          Last active: {user.lastActive}
                        </span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-lg ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {permissions[user.role].map((permission, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 glass-subtle rounded-lg body-xs"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="p-2 glass-subtle hover:glass-card rounded-lg transition-smooth">
                      <Edit className="h-5 w-5 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 glass-subtle hover:glass-card rounded-lg transition-smooth"
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Role Permissions Matrix */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="expand" className="p-6">
          <h2 className="heading-md mb-6">Role Permissions</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 body-md">Permission</th>
                  <th className="text-center p-4 body-md">Admin</th>
                  <th className="text-center p-4 body-md">Editor</th>
                  <th className="text-center p-4 body-md">Viewer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Content Management',
                  'Theme Customization',
                  'User Management',
                  'SEO Settings',
                  'System Settings',
                  'Analytics Access',
                  'Media Upload',
                  'Publish Content'
                ].map((permission, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-4 body-md">{permission}</td>
                    <td className="p-4 text-center">
                      <div className="inline-block h-5 w-5 bg-green-500 rounded-full" />
                    </td>
                    <td className="p-4 text-center">
                      <div className={`inline-block h-5 w-5 rounded-full ${
                        ['Content Management', 'Media Upload', 'Publish Content', 'Analytics Access'].includes(permission)
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`} />
                    </td>
                    <td className="p-4 text-center">
                      <div className={`inline-block h-5 w-5 rounded-full ${
                        permission === 'Analytics Access'
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="glass-premium max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-lg">Add New User</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block body-md mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Role</label>
                <select className="glass-input w-full py-2 px-3 rounded-lg">
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block body-md mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="glass-input w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 glass-subtle p-4 rounded-lg">
              <input type="checkbox" className="h-5 w-5" />
              <span className="body-md">Require Two-Factor Authentication (2FA)</span>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button
                className="btn-outline-award"
                onClick={() => setShowAddUser(false)}
              >
                Cancel
              </Button>
              <Button className="btn-award">
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
