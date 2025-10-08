import { 
  Settings, 
  Globe, 
  Key, 
  Bell,
  Code,
  Download,
  Server
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function SystemSettings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div>
          <h1 className="heading-xl mb-2">System Settings</h1>
          <p className="body-lg text-gray-600">
            Advanced configuration and developer tools
          </p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Domain & Hosting */}
        <ScrollReveal animation="slide-left">
          <InnovativeCard effect="glow-border" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Globe}
                color="blue"
                animation="pulse-glow"
                size={32}
              />
              <h2 className="heading-md">Domain & Hosting</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block body-md mb-2">Primary Domain</label>
                <Input
                  type="text"
                  defaultValue="inchtomilez.com"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Site URL</label>
                <Input
                  type="text"
                  defaultValue="https://inchtomilez.com"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Admin Email</label>
                <Input
                  type="email"
                  defaultValue="admin@inchtomilez.com"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Timezone</label>
                <select className="glass-input w-full py-2 px-3 rounded-lg">
                  <option>UTC</option>
                  <option>Asia/Kolkata (IST)</option>
                  <option>America/New_York (EST)</option>
                  <option>Europe/London (GMT)</option>
                </select>
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* API Keys */}
        <ScrollReveal animation="slide-right">
          <InnovativeCard effect="expand" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Key}
                color="purple"
                animation="float"
                size={32}
              />
              <h2 className="heading-md">API Keys</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block body-md mb-2">Supabase URL</label>
                <Input
                  type="text"
                  placeholder="https://xxx.supabase.co"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Supabase Anon Key</label>
                <Input
                  type="password"
                  placeholder="eyJ..."
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">OpenAI API Key (for chatbot)</label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Custom API Endpoint</label>
                <Input
                  type="text"
                  placeholder="https://api.example.com"
                  className="glass-input w-full"
                />
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>
      </div>

      {/* Notifications */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="3d-tilt" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Bell}
              color="orange"
              animation="swing"
              size={32}
            />
            <h2 className="heading-md">Notification Settings</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'New comment posted',
              'User registration',
              'System errors',
              'Backup completed',
              'Security alerts',
              'Content published'
            ].map((notification, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass-subtle p-4 rounded-lg"
              >
                <span className="body-md">{notification}</span>
                <button className="relative w-14 h-7 bg-green-600 rounded-full">
                  <span className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Developer Tools */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="magnetic" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Code}
              color="green"
              animation="pulse-glow"
              size={32}
            />
            <h2 className="heading-md">Developer Tools</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Export Design Tokens */}
            <div className="glass-subtle p-6 rounded-xl text-center">
              <Download className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="heading-sm mb-2">Export Design Tokens</h3>
              <p className="body-sm text-gray-600 mb-4">
                Download CSS variables
              </p>
              <Button className="btn-award w-full">
                Export CSS
              </Button>
            </div>

            {/* API Documentation */}
            <div className="glass-subtle p-6 rounded-xl text-center">
              <Code className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="heading-sm mb-2">API Documentation</h3>
              <p className="body-sm text-gray-600 mb-4">
                View endpoint docs
              </p>
              <Button className="btn-award w-full">
                View Docs
              </Button>
            </div>

            {/* Server Status */}
            <div className="glass-subtle p-6 rounded-xl text-center">
              <Server className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="heading-sm mb-2">Server Status</h3>
              <p className="body-sm text-gray-600 mb-4">
                Monitor uptime
              </p>
              <Button className="btn-award w-full">
                View Status
              </Button>
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Custom Code Injection */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="glow-border" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Code}
              color="red"
              animation="float"
              size={32}
            />
            <h2 className="heading-md">Custom Code Injection</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block body-md mb-2">Header Scripts (before {'</head>'})</label>
              <Textarea
                placeholder="<!-- Google Analytics, Meta Pixels, etc. -->"
                className="glass-input w-full font-mono text-sm"
                rows={6}
              />
            </div>

            <div>
              <label className="block body-md mb-2">Footer Scripts (before {'</body>'})</label>
              <Textarea
                placeholder="<!-- Chat widgets, tracking codes, etc. -->"
                className="glass-input w-full font-mono text-sm"
                rows={6}
              />
            </div>

            <div>
              <label className="block body-md mb-2">Custom CSS</label>
              <Textarea
                placeholder=".custom-class { ... }"
                className="glass-input w-full font-mono text-sm"
                rows={6}
              />
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Version Control */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="expand" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ColorfulIcon
                icon={Settings}
                color="indigo"
                animation="pulse-glow"
                size={32}
              />
              <div>
                <h2 className="heading-md mb-1">Version Control</h2>
                <p className="body-md text-gray-600">
                  Rollback to previous versions
                </p>
              </div>
            </div>
            <Button className="btn-outline-award">
              View History
            </Button>
          </div>

          <div className="space-y-3">
            {[
              { version: 'v2.1.0', date: 'Today', changes: 'Updated theme settings' },
              { version: 'v2.0.5', date: 'Yesterday', changes: 'Added new blog posts' },
              { version: 'v2.0.4', date: '2 days ago', changes: 'Performance improvements' }
            ].map((version, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass-subtle p-4 rounded-lg"
              >
                <div>
                  <p className="body-md mb-1">{version.version}</p>
                  <p className="body-sm text-gray-600">
                    {version.date} • {version.changes}
                  </p>
                </div>
                <Button className="btn-sm-award btn-outline-award">
                  Restore
                </Button>
              </div>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Save Button */}
      <ScrollReveal animation="fade">
        <div className="flex justify-end gap-4">
          <Button className="btn-outline-award btn-lg-award">
            Reset to Defaults
          </Button>
          <Button className="btn-award btn-lg-award">
            Save All Settings
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
