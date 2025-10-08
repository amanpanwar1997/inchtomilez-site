import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Palette, 
  Settings, 
  Search,
  Users,
  Shield,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Bell,
  Home,
  ChevronRight,
  Package
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';

interface AdminLayoutProps {
  children: ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
  onBackToWebsite?: () => void;
}

export function AdminLayout({ 
  children, 
  currentSection, 
  onSectionChange,
  onLogout,
  onBackToWebsite
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      color: 'blue' as const 
    },
    { 
      id: 'content', 
      label: 'Blog & Content', 
      icon: FileText, 
      color: 'green' as const 
    },
    { 
      id: 'theme', 
      label: 'Theme Management', 
      icon: Palette, 
      color: 'purple' as const 
    },
    { 
      id: 'customization', 
      label: 'Website Customization', 
      icon: Settings, 
      color: 'orange' as const 
    },
    { 
      id: 'seo', 
      label: 'SEO & Marketing', 
      icon: TrendingUp, 
      color: 'yellow' as const 
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: Users, 
      color: 'pink' as const 
    },
    { 
      id: 'security', 
      label: 'Security & Performance', 
      icon: Shield, 
      color: 'red' as const 
    },
    { 
      id: 'backup', 
      label: 'Website Backup & Export', 
      icon: Package, 
      color: 'cyan' as const 
    },
    { 
      id: 'system', 
      label: 'System Settings', 
      icon: Settings, 
      color: 'indigo' as const 
    }
  ];

  const currentMenuItem = menuItems.find(item => item.id === currentSection);

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Top Header - Fixed */}
      <header className="glass-premium flex-shrink-0 border-b border-white/20 shadow-award z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-white hover:shadow-award rounded-lg transition-smooth"
            >
              {sidebarOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
            </button>
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-award">
                <span className="text-white font-bold body-md">I</span>
              </div>
              <div>
                <h1 className="heading-sm leading-tight">InchToMilez</h1>
                <p className="body-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="glass-input pl-10 pr-4 py-2.5 w-80 body-sm hover:bg-white hover:shadow-award transition-smooth"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 hover:bg-white hover:shadow-award rounded-lg transition-smooth group">
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-award">
                  {notifications}
                </span>
              )}
            </button>

            {/* Back to Website */}
            <button
              onClick={onBackToWebsite}
              className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-white hover:shadow-award rounded-lg transition-smooth"
              title="Back to Website"
            >
              <Home className="h-5 w-5 text-gray-600" />
              <span className="body-sm text-gray-600">Website</span>
            </button>

            {/* User & Logout */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-award">
                <span className="text-white font-bold">A</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 hover:bg-white hover:shadow-award rounded-lg transition-smooth group"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-3 border-t border-white/10 bg-white/30">
          <div className="flex items-center gap-2 text-gray-600">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span className="body-sm font-semibold text-black">
              {currentMenuItem?.label || 'Dashboard'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container - Flex Row */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Scrollable */}
        <aside
          className={`glass-premium flex-shrink-0 border-r border-white/20 transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? 'w-72' : 'w-0'
          }`}
        >
          <div className="p-4 w-72">
            {/* Welcome Card */}
            <div className="mb-6 p-4 glass-card rounded-lg hover-lift-sm">
              <p className="body-xs text-gray-500 mb-1">Welcome back!</p>
              <h3 className="heading-sm">Admin Dashboard</h3>
              <p className="body-xs text-gray-500 mt-2">Manage your website</p>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all group ${
                    currentSection === item.id
                      ? 'bg-white shadow-award text-black'
                      : 'hover:bg-white hover:shadow-award-md hover:translate-x-1'
                  }`}
                >
                  <ColorfulIcon
                    icon={item.icon}
                    color={item.color}
                    animation={currentSection === item.id ? 'pulse-glow' : 'none'}
                    size={22}
                  />
                  <span className={`body-md font-semibold ${
                    currentSection === item.id ? 'text-black' : 'text-gray-600 group-hover:text-black'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Footer - Fixed */}
      <footer className="glass-premium flex-shrink-0 border-t border-white/20 shadow-award-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Copyright */}
            <div className="flex items-center gap-4">
              <p className="body-sm text-gray-600">
                © 2024 InchToMilez. All rights reserved.
              </p>
            </div>

            {/* Center - Status */}
            <div className="hidden md:flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-glow"></div>
              <span className="body-sm text-gray-600">System Online</span>
            </div>

            {/* Right - Links */}
            <div className="flex items-center gap-6">
              <button className="body-sm text-gray-600 hover:text-black transition-colors">
                Help
              </button>
              <button className="body-sm text-gray-600 hover:text-black transition-colors">
                Documentation
              </button>
              <button 
                onClick={onBackToWebsite}
                className="body-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                View Website →
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
