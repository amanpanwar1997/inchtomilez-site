import { useState } from 'react';
import { AdminLayout } from '../admin/AdminLayout';
import { Dashboard } from '../admin/Dashboard';
import { ContentManagementSupabase } from '../admin/ContentManagementSupabase';
import { ThemeManagementSupabase } from '../admin/ThemeManagementSupabase';
import { SEOMarketing } from '../admin/SEOMarketing';
import { UserManagement } from '../admin/UserManagement';
import { SecurityPerformance } from '../admin/SecurityPerformance';
import { SystemSettings } from '../admin/SystemSettings';
import { WebsiteCustomizationSupabase } from '../admin/WebsiteCustomizationSupabase';
import { WebsiteBackupExport } from '../admin/WebsiteBackupExport';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default credentials (in production, use proper auth)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setCurrentSection('dashboard');
    onNavigate('home');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentManagementSupabase />;
      case 'theme':
        return <ThemeManagementSupabase />;
      case 'customization':
        return <WebsiteCustomizationSupabase />;
      case 'seo':
        return <SEOMarketing />;
      case 'users':
        return <UserManagement />;
      case 'security':
        return <SecurityPerformance />;
      case 'backup':
        return <WebsiteBackupExport />;
      case 'system':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  // Login Screen - Fullscreen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-gentle-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-gentle-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-gentle-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="glass-premium p-10 rounded-lg shadow-elegant border border-white/20">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-4 shadow-award">
                <ColorfulIcon icon={Lock} color="white" size={32} />
              </div>
              <h1 className="heading-lg mb-2">Admin Panel</h1>
              <p className="body-md text-gray-600">Sign in to access the dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block body-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="glass-input w-full pl-10 pr-4 py-3 body-md focus:ring-2 focus:ring-blue-500 transition-smooth"
                    placeholder="Enter your username"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block body-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input w-full pl-10 pr-12 py-3 body-md focus:ring-2 focus:ring-blue-500 transition-smooth"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="body-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-award w-full py-3 relative overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="loader-pulse w-5 h-5 bg-white rounded-full"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="body-xs text-blue-700 text-center font-semibold mb-2">Demo Credentials</p>
              <p className="body-xs text-blue-600 text-center">Username: <span className="font-mono font-bold">admin</span></p>
              <p className="body-xs text-blue-600 text-center">Password: <span className="font-mono font-bold">admin123</span></p>
            </div>

            {/* Back to Website */}
            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('home')}
                className="body-sm text-gray-600 hover:text-black transition-colors"
              >
                ← Back to Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard - Fullscreen
  return (
    <AdminLayout
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      onLogout={handleLogout}
      onBackToWebsite={() => onNavigate('home')}
    >
      {renderSection()}
    </AdminLayout>
  );
}
