import { 
  FileText, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';

export function Dashboard() {
  const stats = [
    {
      label: 'Total Posts',
      value: '48',
      change: '+12%',
      trend: 'up' as const,
      icon: FileText,
      color: 'blue' as const
    },
    {
      label: 'Active Users',
      value: '5',
      change: '+2',
      trend: 'up' as const,
      icon: Users,
      color: 'green' as const
    },
    {
      label: 'Page Views',
      value: '12.5K',
      change: '+23%',
      trend: 'up' as const,
      icon: Eye,
      color: 'purple' as const
    },
    {
      label: 'Performance Score',
      value: '94',
      change: '-2',
      trend: 'down' as const,
      icon: TrendingUp,
      color: 'orange' as const
    }
  ];

  const recentActivity = [
    {
      type: 'edit',
      user: 'Admin',
      action: 'Updated "Digital Marketing Trends 2024"',
      time: '2 minutes ago',
      icon: Edit,
      color: 'blue' as const
    },
    {
      type: 'publish',
      user: 'Editor',
      action: 'Published "SEO Best Practices"',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'green' as const
    },
    {
      type: 'schedule',
      user: 'Admin',
      action: 'Scheduled "Social Media Guide" for tomorrow',
      time: '3 hours ago',
      icon: Clock,
      color: 'orange' as const
    },
    {
      type: 'alert',
      user: 'System',
      action: 'Backup completed successfully',
      time: '6 hours ago',
      icon: AlertCircle,
      color: 'purple' as const
    }
  ];

  const contentStatus = [
    { label: 'Published', count: 42, color: 'green' as const },
    { label: 'Drafts', count: 6, color: 'yellow' as const },
    { label: 'Scheduled', count: 3, color: 'blue' as const },
    { label: 'Archived', count: 12, color: 'gray' as const }
  ];

  return (
    <div className="space-y-8">
      {/* Header - Enhanced */}
      <ScrollReveal animation="fade">
        <div className="glass-premium p-8 rounded-lg border border-white/20">
          <h1 className="heading-xl mb-2">Dashboard Overview</h1>
          <p className="body-lg text-gray-600">
            Welcome back! Here's what's happening with your website.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats Grid */}
      <ScrollReveal animation="stagger">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <InnovativeCard
              key={index}
              effect="3d-tilt"
              className="p-6 hover-lift-md"
            >
              <div className="flex items-start justify-between mb-4">
                <ColorfulIcon
                  icon={stat.icon}
                  color={stat.color}
                  animation="pulse-glow"
                  size={40}
                />
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`body-xs ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="heading-lg mb-1">{stat.value}</div>
              <div className="body-sm text-gray-600">{stat.label}</div>
            </InnovativeCard>
          ))}
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <ScrollReveal animation="slide-left" className="lg:col-span-2">
          <InnovativeCard effect="glow-border" className="p-6">
            <h2 className="heading-md mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 glass-subtle rounded-lg hover-lift-sm transition-smooth"
                >
                  <ColorfulIcon
                    icon={activity.icon}
                    color={activity.color}
                    animation="float"
                    size={24}
                  />
                  <div className="flex-1">
                    <p className="body-md mb-1">{activity.action}</p>
                    <p className="body-xs text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* Content Status */}
        <ScrollReveal animation="slide-right">
          <InnovativeCard effect="expand" className="p-6">
            <h2 className="heading-md mb-6">Content Status</h2>
            <div className="space-y-4">
              {contentStatus.map((status, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="body-md">{status.label}</span>
                    <span className="heading-sm">{status.count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        status.color === 'green'
                          ? 'from-green-400 to-green-600'
                          : status.color === 'yellow'
                          ? 'from-yellow-400 to-yellow-600'
                          : status.color === 'blue'
                          ? 'from-blue-400 to-blue-600'
                          : 'from-gray-400 to-gray-600'
                      }`}
                      style={{ width: `${(status.count / 63) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </InnovativeCard>
        </ScrollReveal>
      </div>

      {/* Quick Actions */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="magnetic" className="p-6">
          <h2 className="heading-md mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'New Post', icon: FileText, color: 'blue' },
              { label: 'Upload Media', icon: Edit, color: 'green' },
              { label: 'View Analytics', icon: TrendingUp, color: 'purple' },
              { label: 'Manage Users', icon: Users, color: 'orange' }
            ].map((action, index) => (
              <button
                key={index}
                className="glass-premium p-4 rounded-xl hover-lift-md transition-smooth flex flex-col items-center gap-3"
              >
                <ColorfulIcon
                  icon={action.icon}
                  color={action.color as any}
                  animation="bounce"
                  hoverAnimation="jump"
                  size={32}
                />
                <span className="body-sm">{action.label}</span>
              </button>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>
    </div>
  );
}
