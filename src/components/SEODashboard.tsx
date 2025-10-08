import { motion } from 'motion/react';
import { TrendingUp, Users, Eye, MousePointer, Search, Globe, Target, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from './ui/card';

export function SEODashboard() {
  // Sample SEO performance data
  const trafficData = [
    { month: 'Jan', organic: 1200, paid: 800, direct: 600, social: 400 },
    { month: 'Feb', organic: 1800, paid: 1200, direct: 900, social: 600 },
    { month: 'Mar', organic: 2400, paid: 1600, direct: 1200, social: 800 },
    { month: 'Apr', organic: 3200, paid: 2100, direct: 1500, social: 1000 },
    { month: 'May', organic: 4100, paid: 2800, direct: 1800, social: 1200 },
    { month: 'Jun', organic: 5200, paid: 3500, direct: 2200, social: 1500 }
  ];

  const keywordRankings = [
    { keyword: 'Digital Marketing Indore', position: 3, searches: 2400 },
    { keyword: 'SEO Services Indore', position: 1, searches: 1900 },
    { keyword: 'Website Development', position: 2, searches: 3200 },
    { keyword: 'Google Ads Management', position: 1, searches: 1600 },
    { keyword: 'Social Media Marketing', position: 4, searches: 2800 }
  ];

  const conversionFunnel = [
    { stage: 'Visitors', value: 10000, color: '#39FF14' },
    { stage: 'Leads', value: 2500, color: '#FFDB58' },
    { stage: 'Qualified', value: 800, color: '#666666' },
    { stage: 'Customers', value: 240, color: '#999999' }
  ];

  const deviceTraffic = [
    { name: 'Mobile', value: 65, color: '#39FF14' },
    { name: 'Desktop', value: 30, color: '#FFDB58' },
    { name: 'Tablet', value: 5, color: '#666666' }
  ];

  const performanceMetrics = [
    { icon: Eye, label: 'Monthly Visitors', value: '52,000+', growth: '+285%', color: '#39FF14' },
    { icon: MousePointer, label: 'Conversion Rate', value: '4.8%', growth: '+156%', color: '#FFDB58' },
    { icon: Search, label: 'Keywords Ranking', value: '1,240', growth: '+89%', color: '#39FF14' },
    { icon: Target, label: 'Lead Generation', value: '2,500/mo', growth: '+340%', color: '#FFDB58' }
  ];

  return (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-gray-900 border-gray-800 hover:border-[#39FF14] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: metric.color }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <metric.icon className="h-6 w-6 text-black" />
                </motion.div>
                <div className="text-right">
                  <div className="text-sm text-[#39FF14]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    {metric.growth}
                  </div>
                  <TrendingUp className="h-4 w-4 text-[#39FF14] ml-auto" />
                </div>
              </div>
              <h3 className="text-2xl mb-1" style={{ fontFamily: 'Antonio, sans-serif', color: metric.color }}>
                {metric.value}
              </h3>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Barlow, sans-serif' }}>
                {metric.label}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Traffic Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-[#39FF14] mr-3" />
              <h3 className="text-xl text-[#39FF14]" style={{ fontFamily: 'Antonio, sans-serif' }}>
                Website Traffic Growth
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#FFDB58" />
                <YAxis stroke="#FFDB58" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid #39FF14',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="organic" stackId="1" stroke="#39FF14" fill="#39FF14" fillOpacity={0.4} />
                <Area type="monotone" dataKey="paid" stackId="1" stroke="#FFDB58" fill="#FFDB58" fillOpacity={0.4} />
                <Area type="monotone" dataKey="direct" stackId="1" stroke="#666" fill="#666" fillOpacity={0.4} />
                <Area type="monotone" dataKey="social" stackId="1" stroke="#999" fill="#999" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Device Traffic Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-[#FFDB58] mr-3" />
              <h3 className="text-xl text-[#FFDB58]" style={{ fontFamily: 'Antonio, sans-serif' }}>
                Traffic by Device
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceTraffic}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {deviceTraffic.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid #39FF14',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Keyword Rankings & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className="flex items-center mb-4">
              <Search className="h-6 w-6 text-[#39FF14] mr-3" />
              <h3 className="text-xl text-[#39FF14]" style={{ fontFamily: 'Antonio, sans-serif' }}>
                Top Keyword Rankings
              </h3>
            </div>
            <div className="space-y-4">
              {keywordRankings.map((keyword, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <div className="text-white" style={{ fontFamily: 'Barlow, sans-serif' }}>
                      {keyword.keyword}
                    </div>
                    <div className="text-sm text-gray-400">
                      {keyword.searches.toLocaleString()} searches/month
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className={`text-lg ${keyword.position <= 3 ? 'text-[#39FF14]' : 'text-[#FFDB58]'}`}
                      style={{ fontFamily: 'Antonio, sans-serif' }}
                    >
                      #{keyword.position}
                    </div>
                    <div className="text-xs text-gray-400">Position</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-[#FFDB58] mr-3" />
              <h3 className="text-xl text-[#FFDB58]" style={{ fontFamily: 'Antonio, sans-serif' }}>
                Conversion Funnel
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnel} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" stroke="#FFDB58" />
                <YAxis dataKey="stage" type="category" stroke="#FFDB58" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid #39FF14',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="value" fill="#39FF14" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}