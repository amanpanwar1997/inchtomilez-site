import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, Calendar, TrendingUp, Users, 
  CheckCircle2, Clock, Filter, Download, RefreshCw,
  Search, X, ChevronDown, ExternalLink
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Lead {
  id: string;
  phone: string;
  email?: string;
  industry?: string;
  budget?: string;
  source: string;
  isComplete: boolean;
  timestamp: string;
  status: string;
  createdAt: string;
}

export function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'complete' | 'partial'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/leads`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const result = await response.json();
      
      if (result.success) {
        setLeads(result.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'complete' ? lead.isComplete :
      !lead.isComplete;

    const matchesSearch = 
      lead.phone.includes(searchTerm) ||
      lead.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.budget?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: leads.length,
    complete: leads.filter(l => l.isComplete).length,
    partial: leads.filter(l => !l.isComplete).length,
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Phone', 'Email', 'Industry', 'Budget', 'Status', 'Date'];
    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.phone,
      lead.email || '',
      lead.industry || '',
      lead.budget || '',
      lead.isComplete ? 'Complete' : 'Partial',
      new Date(lead.timestamp).toLocaleString('en-IN'),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inchtomilez-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            className="font-antonio text-4xl mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Lead Dashboard
          </motion.h1>
          <p className="font-raleway text-gray-600">Manage all your Inchy chatbot leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, icon: Users, color: '#000' },
            { label: 'Complete', value: stats.complete, icon: CheckCircle2, color: '#1a1a1a' },
            { label: 'In Progress', value: stats.partial, icon: Clock, color: '#404040' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-ultra-strong p-6 rounded-2xl border border-black/10 shadow-medium"
            >
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color === '#000' ? '#fff' : '#000' }} />
                </div>
                <span className="font-antonio text-3xl">{stat.value}</span>
              </div>
              <p className="font-raleway text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="glass-ultra-strong p-4 rounded-2xl border border-black/10 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              {['all', 'complete', 'partial'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-xl font-raleway text-sm transition-all ${
                    filter === f
                      ? 'bg-black text-white font-semibold'
                      : 'glass hover:glass-strong text-gray-700'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search leads..."
                  className="pl-10 pr-4 py-2 glass border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm font-raleway"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <button
                onClick={fetchLeads}
                className="p-2 glass hover:glass-strong rounded-xl transition-all border border-black/10"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={exportToCSV}
                className="px-4 py-2 glass hover:glass-strong rounded-xl transition-all border border-black/10 flex items-center gap-2 font-raleway text-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="loader-dots mb-4 mx-auto">
              <div className="loader-dot" />
              <div className="loader-dot" />
              <div className="loader-dot" />
            </div>
            <p className="font-raleway text-gray-600">Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12 glass-ultra rounded-2xl">
            <p className="font-raleway text-gray-600">No leads found</p>
          </div>
        ) : (
          <div className="glass-ultra-strong rounded-2xl border border-black/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="glass border-b border-black/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-antonio text-sm">Status</th>
                    <th className="px-6 py-4 text-left font-antonio text-sm">Phone</th>
                    <th className="px-6 py-4 text-left font-antonio text-sm">Industry</th>
                    <th className="px-6 py-4 text-left font-antonio text-sm">Budget</th>
                    <th className="px-6 py-4 text-left font-antonio text-sm">Date</th>
                    <th className="px-6 py-4 text-left font-antonio text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, idx) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-black/5 hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-raleway font-semibold ${
                          lead.isComplete 
                            ? 'bg-black text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {lead.isComplete ? '✅ Complete' : '⏳ Partial'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-raleway font-medium">{lead.phone}</td>
                      <td className="px-6 py-4 font-raleway text-gray-700">{lead.industry || '-'}</td>
                      <td className="px-6 py-4 font-raleway text-gray-700">{lead.budget || '-'}</td>
                      <td className="px-6 py-4 font-raleway text-sm text-gray-600">
                        {new Date(lead.timestamp).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 glass hover:glass-strong rounded-lg transition-all"
                            title="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 glass hover:glass-strong rounded-lg transition-all"
                            title="WhatsApp"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 glass hover:glass-strong rounded-lg transition-all"
                            title="View Details"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lead Detail Modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLead(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-ultra-strong rounded-2xl p-6 max-w-lg w-full border border-black/10 shadow-dramatic"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-antonio text-2xl">Lead Details</h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-2 hover:bg-black/5 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-600 font-raleway mb-1">Phone</p>
                    <p className="font-raleway font-semibold text-lg">{selectedLead.phone}</p>
                  </div>

                  {selectedLead.email && (
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-600 font-raleway mb-1">Email</p>
                      <p className="font-raleway font-semibold">{selectedLead.email}</p>
                    </div>
                  )}

                  {selectedLead.industry && (
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-600 font-raleway mb-1">Industry</p>
                      <p className="font-raleway font-semibold">{selectedLead.industry}</p>
                    </div>
                  )}

                  {selectedLead.budget && (
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-600 font-raleway mb-1">Budget</p>
                      <p className="font-raleway font-semibold">{selectedLead.budget}</p>
                    </div>
                  )}

                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-600 font-raleway mb-1">Source</p>
                    <p className="font-raleway font-semibold">{selectedLead.source}</p>
                  </div>

                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-600 font-raleway mb-1">Status</p>
                    <p className="font-raleway font-semibold">
                      {selectedLead.isComplete ? '✅ Complete Lead' : '⏳ Partial Lead'}
                    </p>
                  </div>

                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-600 font-raleway mb-1">Submitted</p>
                    <p className="font-raleway font-semibold">
                      {new Date(selectedLead.timestamp).toLocaleString('en-IN', { 
                        dateStyle: 'full', 
                        timeStyle: 'short',
                        timeZone: 'Asia/Kolkata'
                      })}
                    </p>
                  </div>

                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-600 font-raleway mb-1">Lead ID</p>
                    <p className="font-raleway text-xs text-gray-500 break-all">{selectedLead.id}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 py-3 rounded-xl text-center font-antonio font-semibold transition-all shadow-medium"
                    style={{ background: '#1a1a1a' }}
                  >
                    📞 Call Now
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl text-center font-antonio font-semibold transition-all shadow-medium"
                    style={{ background: '#404040' }}
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}