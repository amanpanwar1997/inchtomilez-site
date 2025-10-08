import { 
  Shield, 
  Lock, 
  Database, 
  Zap,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';

export function SecurityPerformance() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div>
          <h1 className="heading-xl mb-2">Security & Performance</h1>
          <p className="body-lg text-gray-600">
            Protect your website and optimize performance
          </p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal animation="stagger">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Performance Score', value: '94/100', icon: Zap, color: 'yellow' },
            { label: 'Last Backup', value: '2h ago', icon: Database, color: 'blue' },
            { label: 'SSL Status', value: 'Active', icon: Lock, color: 'green' },
            { label: 'Security Score', value: '98/100', icon: Shield, color: 'red' }
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Security */}
        <ScrollReveal animation="slide-left">
          <InnovativeCard effect="glow-border" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Shield}
                color="red"
                animation="pulse-glow"
                size={32}
              />
              <h2 className="heading-md">Security</h2>
            </div>

            <div className="space-y-4">
              {/* SSL */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-600" />
                    <span className="body-md">SSL Certificate</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="body-sm text-gray-600">Valid until Dec 31, 2024</p>
              </div>

              {/* 2FA */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md">Two-Factor Authentication</span>
                  <button className="relative w-14 h-7 bg-green-600 rounded-full">
                    <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="body-sm text-gray-600">Required for all admin users</p>
              </div>

              {/* Firewall */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md">Web Application Firewall</span>
                  <button className="relative w-14 h-7 bg-green-600 rounded-full">
                    <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="body-sm text-gray-600">Protected from common attacks</p>
              </div>

              {/* Login Attempts */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md">Failed Login Protection</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="body-sm text-gray-600">Max 5 attempts per hour</p>
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* Performance */}
        <ScrollReveal animation="slide-right">
          <InnovativeCard effect="expand" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Zap}
                color="yellow"
                animation="pulse-glow"
                size={32}
              />
              <h2 className="heading-md">Performance</h2>
            </div>

            <div className="space-y-4">
              {/* Image Optimization */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                    <span className="body-md">Image Optimization</span>
                  </div>
                  <button className="relative w-14 h-7 bg-purple-600 rounded-full">
                    <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="body-sm text-gray-600">Auto-compress & WebP conversion</p>
              </div>

              {/* Caching */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md">Browser Caching</span>
                  <button className="relative w-14 h-7 bg-blue-600 rounded-full">
                    <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="body-sm text-gray-600">Cache static assets for 30 days</p>
              </div>

              {/* Minification */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md">CSS/JS Minification</span>
                  <button className="relative w-14 h-7 bg-green-600 rounded-full">
                    <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="body-sm text-gray-600">Reduce file sizes by 60%</p>
              </div>

              {/* CDN */}
              <div className="glass-subtle p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md">CDN Integration</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="body-sm text-gray-600">Global content delivery enabled</p>
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>
      </div>

      {/* Backups */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="3d-tilt" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Database}
              color="blue"
              animation="float"
              size={32}
            />
            <h2 className="heading-md">Backups & Restore</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Automatic Backups */}
            <div className="glass-subtle p-6 rounded-xl text-center">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="heading-sm mb-2">Automatic Backups</h3>
              <p className="body-sm text-gray-600 mb-4">Daily at 3:00 AM UTC</p>
              <Button className="btn-award w-full">
                Configure Schedule
              </Button>
            </div>

            {/* Create Backup */}
            <div className="glass-subtle p-6 rounded-xl text-center">
              <Download className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="heading-sm mb-2">Create Backup</h3>
              <p className="body-sm text-gray-600 mb-4">Manual backup now</p>
              <Button className="btn-award w-full">
                Backup Now
              </Button>
            </div>

            {/* Restore */}
            <div className="glass-subtle p-6 rounded-xl text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="heading-sm mb-2">Restore Backup</h3>
              <p className="body-sm text-gray-600 mb-4">From previous backup</p>
              <Button className="btn-outline-award w-full">
                Restore
              </Button>
            </div>
          </div>

          {/* Recent Backups */}
          <div className="mt-6 space-y-3">
            <h3 className="heading-sm">Recent Backups</h3>
            {[
              { date: 'Today, 3:00 AM', size: '245 MB', status: 'success' },
              { date: 'Yesterday, 3:00 AM', size: '243 MB', status: 'success' },
              { date: '2 days ago, 3:00 AM', size: '241 MB', status: 'success' }
            ].map((backup, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass-subtle p-4 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="body-md">{backup.date}</p>
                    <p className="body-xs text-gray-500">{backup.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="btn-sm-award btn-outline-award">
                    Download
                  </Button>
                  <Button className="btn-sm-award btn-award">
                    Restore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Maintenance Mode */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="magnetic" className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ColorfulIcon
                icon={AlertTriangle}
                color="orange"
                animation="pulse-glow"
                size={32}
              />
              <div>
                <h2 className="heading-md mb-1">Maintenance Mode</h2>
                <p className="body-md text-gray-600">
                  Temporarily disable public access for updates
                </p>
              </div>
            </div>
            <Button className="btn-outline-award">
              Enable Maintenance
            </Button>
          </div>
        </InnovativeCard>
      </ScrollReveal>
    </div>
  );
}
