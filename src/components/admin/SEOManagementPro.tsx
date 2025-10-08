import { useState, useEffect } from 'react';
import { 
  Search, Globe, FileText, Image as ImageIcon, Link2, 
  TrendingUp, Settings, Code, MapPin, AlertTriangle,
  CheckCircle, XCircle, BarChart3, Eye, RefreshCw,
  Download, Upload, Copy, ExternalLink, Zap,
  Target, Award, Shield, Database, Clock, Users
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SEOSettings {
  // Site-wide settings
  siteName: string;
  alternateName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  favicon: string;
  
  // Verification codes
  googleVerification: string;
  bingVerification: string;
  pinterestVerification: string;
  yandexVerification: string;
  
  // Robots & indexing
  allowIndexing: boolean;
  robotsTxt: string;
  
  // Sitemap
  sitemapEnabled: boolean;
  sitemapIncludePages: boolean;
  sitemapIncludePosts: boolean;
  sitemapIncludeImages: boolean;
  sitemapFrequency: string;
  
  // Schema
  organizationType: string;
  organizationName: string;
  organizationLogo: string;
  
  // Local SEO
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  latitude: string;
  longitude: string;
  openingHours: Array<{day: string; from: string; to: string}>;
}

interface PageSEO {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  focusKeyword: string;
  score: number;
  issues: string[];
  warnings: string[];
  passed: string[];
}

interface Redirect {
  id: string;
  source: string;
  destination: string;
  type: '301' | '302' | '307';
  hits: number;
  lastAccessed: string;
}

interface NotFound {
  url: string;
  count: number;
  lastSeen: string;
  referrer: string;
}

export function SEOManagementPro() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    siteName: 'InchToMilez',
    alternateName: 'I2M',
    siteUrl: 'https://inchtomilez.com',
    defaultTitle: '%page% | InchToMilez - Digital Marketing Agency',
    defaultDescription: '360° Digital Marketing, IT, and Media Solutions',
    defaultImage: '',
    favicon: '',
    googleVerification: '',
    bingVerification: '',
    pinterestVerification: '',
    yandexVerification: '',
    allowIndexing: true,
    robotsTxt: `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: https://inchtomilez.com/sitemap.xml`,
    sitemapEnabled: true,
    sitemapIncludePages: true,
    sitemapIncludePosts: true,
    sitemapIncludeImages: true,
    sitemapFrequency: 'weekly',
    organizationType: 'Organization',
    organizationName: 'InchToMilez',
    organizationLogo: '',
    businessName: 'InchToMilez',
    businessType: 'MarketingAgency',
    address: '',
    city: 'Indore',
    state: 'Madhya Pradesh',
    zip: '',
    country: 'India',
    phone: '+91-9009970709',
    email: 'info@inchtomilez.com',
    latitude: '',
    longitude: '',
    openingHours: [
      { day: 'Monday', from: '09:00', to: '18:00' },
      { day: 'Tuesday', from: '09:00', to: '18:00' },
      { day: 'Wednesday', from: '09:00', to: '18:00' },
      { day: 'Thursday', from: '09:00', to: '18:00' },
      { day: 'Friday', from: '09:00', to: '18:00' },
      { day: 'Saturday', from: '09:00', to: '14:00' }
    ]
  });

  const [pageSEO, setPageSEO] = useState<PageSEO>({
    url: '',
    title: '',
    description: '',
    keywords: [],
    focusKeyword: '',
    score: 0,
    issues: [],
    warnings: [],
    passed: []
  });

  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [notFoundUrls, setNotFoundUrls] = useState<NotFound[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  // Load SEO settings from backend
  useEffect(() => {
    loadSEOSettings();
    loadRedirects();
    load404Logs();
  }, []);

  const loadSEOSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/seo/settings`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setSeoSettings(prev => ({ ...prev, ...data.data }));
        }
      }
    } catch (error) {
      console.error('Failed to load SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSEOSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/seo/settings`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(seoSettings)
        }
      );

      if (response.ok) {
        toast.success('SEO settings saved successfully!');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save SEO settings');
    } finally {
      setLoading(false);
    }
  };

  const analyzePage = async () => {
    if (!pageSEO.url || !pageSEO.focusKeyword) {
      toast.error('Please enter URL and focus keyword');
      return;
    }

    setAnalyzing(true);
    const issues: string[] = [];
    const warnings: string[] = [];
    const passed: string[] = [];
    let score = 100;

    try {
      // Title checks
      if (!pageSEO.title) {
        issues.push('Missing meta title');
        score -= 15;
      } else {
        if (pageSEO.title.length < 50 || pageSEO.title.length > 60) {
          warnings.push(`Title length ${pageSEO.title.length} chars (optimal: 50-60)`);
          score -= 5;
        } else {
          passed.push('Title length is optimal');
        }

        if (!pageSEO.title.toLowerCase().includes(pageSEO.focusKeyword.toLowerCase())) {
          issues.push('Focus keyword not in title');
          score -= 10;
        } else {
          passed.push('Focus keyword in title');
        }
      }

      // Description checks
      if (!pageSEO.description) {
        issues.push('Missing meta description');
        score -= 15;
      } else {
        if (pageSEO.description.length < 120 || pageSEO.description.length > 160) {
          warnings.push(`Description length ${pageSEO.description.length} chars (optimal: 120-160)`);
          score -= 5;
        } else {
          passed.push('Description length is optimal');
        }

        if (!pageSEO.description.toLowerCase().includes(pageSEO.focusKeyword.toLowerCase())) {
          warnings.push('Focus keyword not in description');
          score -= 8;
        } else {
          passed.push('Focus keyword in description');
        }
      }

      // URL checks
      if (pageSEO.url.length > 75) {
        warnings.push('URL is too long (keep under 75 chars)');
        score -= 3;
      } else {
        passed.push('URL length is good');
      }

      if (!pageSEO.url.toLowerCase().includes(pageSEO.focusKeyword.toLowerCase().replace(/\s+/g, '-'))) {
        warnings.push('Focus keyword not in URL slug');
        score -= 5;
      } else {
        passed.push('Focus keyword in URL');
      }

      // Keywords check
      if (pageSEO.keywords.length === 0) {
        warnings.push('No keywords defined');
        score -= 5;
      } else if (pageSEO.keywords.length > 10) {
        warnings.push('Too many keywords (max 5-7 recommended)');
        score -= 3;
      } else {
        passed.push(`${pageSEO.keywords.length} keywords defined`);
      }

      setPageSEO(prev => ({
        ...prev,
        score: Math.max(0, score),
        issues,
        warnings,
        passed
      }));

      toast.success(`SEO Score: ${Math.max(0, score)}/100`);
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze page');
    } finally {
      setAnalyzing(false);
    }
  };

  const generateSitemap = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/seo/generate-sitemap`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            includePages: seoSettings.sitemapIncludePages,
            includePosts: seoSettings.sitemapIncludePosts,
            includeImages: seoSettings.sitemapIncludeImages,
            frequency: seoSettings.sitemapFrequency
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success('Sitemap generated successfully!');
        
        // Download sitemap
        const blob = new Blob([data.sitemap], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
      } else {
        throw new Error('Failed to generate sitemap');
      }
    } catch (error) {
      console.error('Sitemap error:', error);
      toast.error('Failed to generate sitemap');
    } finally {
      setLoading(false);
    }
  };

  const loadRedirects = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/seo/redirects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRedirects(data.data || []);
        }
      }
    } catch (error) {
      console.error('Failed to load redirects:', error);
    }
  };

  const load404Logs = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/seo/404-logs`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNotFoundUrls(data.data || []);
        }
      }
    } catch (error) {
      console.error('Failed to load 404 logs:', error);
    }
  };

  const addRedirect = async (source: string, destination: string, type: '301' | '302' | '307') => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/seo/redirects`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ source, destination, type })
        }
      );

      if (response.ok) {
        toast.success('Redirect created successfully!');
        loadRedirects();
      } else {
        throw new Error('Failed to create redirect');
      }
    } catch (error) {
      console.error('Redirect error:', error);
      toast.error('Failed to create redirect');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="heading-lg flex items-center gap-3">
              <TrendingUp className="w-8 h-8 icon-color-blue icon-bounce" />
              SEO Management Pro
            </h2>
            <p className="body-md text-muted mt-2">
              Rank Math-style SEO optimization suite
            </p>
          </div>
          <Button 
            onClick={saveSEOSettings}
            disabled={loading}
            className="btn-award"
          >
            <Settings className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass-card p-2 flex-wrap h-auto gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="site-settings" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Site Settings
          </TabsTrigger>
          <TabsTrigger value="page-seo" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Page SEO
          </TabsTrigger>
          <TabsTrigger value="schema" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Schema
          </TabsTrigger>
          <TabsTrigger value="local-seo" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Local SEO
          </TabsTrigger>
          <TabsTrigger value="redirects" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Redirects
          </TabsTrigger>
          <TabsTrigger value="sitemap" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Sitemap
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="body-sm text-muted">Indexable Pages</p>
                  <h3 className="heading-md">12</h3>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="body-sm text-muted">SEO Score (Avg)</p>
                  <h3 className="heading-md">85/100</h3>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="body-sm text-muted">Issues Found</p>
                  <h3 className="heading-md">3</h3>
                </div>
              </div>
            </Card>
          </div>

          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={generateSitemap}
                disabled={loading}
                className="btn-outline-award justify-start"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Sitemap
              </Button>
              <Button 
                onClick={() => setActiveTab('page-seo')}
                className="btn-outline-award justify-start"
              >
                <Search className="w-4 h-4 mr-2" />
                Analyze Page SEO
              </Button>
              <Button 
                onClick={() => setActiveTab('redirects')}
                className="btn-outline-award justify-start"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Manage Redirects
              </Button>
              <Button 
                onClick={() => setActiveTab('schema')}
                className="btn-outline-award justify-start"
              >
                <Code className="w-4 h-4 mr-2" />
                Update Schema
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Site Settings Tab */}
        <TabsContent value="site-settings" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Site Identity</h3>
            <div className="space-y-4">
              <div>
                <label className="block body-sm font-semibold mb-2">Website Name</label>
                <Input
                  value={seoSettings.siteName}
                  onChange={(e) => setSeoSettings({...seoSettings, siteName: e.target.value})}
                  placeholder="InchToMilez"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Alternate Name</label>
                <Input
                  value={seoSettings.alternateName}
                  onChange={(e) => setSeoSettings({...seoSettings, alternateName: e.target.value})}
                  placeholder="I2M"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Site URL</label>
                <Input
                  value={seoSettings.siteUrl}
                  onChange={(e) => setSeoSettings({...seoSettings, siteUrl: e.target.value})}
                  placeholder="https://inchtomilez.com"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Default Title Format</label>
                <Input
                  value={seoSettings.defaultTitle}
                  onChange={(e) => setSeoSettings({...seoSettings, defaultTitle: e.target.value})}
                  placeholder="%page% | %sitename%"
                  className="glass-input"
                />
                <p className="body-xs text-muted mt-1">Use %page% for page name, %sitename% for site name</p>
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Default Meta Description</label>
                <Textarea
                  value={seoSettings.defaultDescription}
                  onChange={(e) => setSeoSettings({...seoSettings, defaultDescription: e.target.value})}
                  placeholder="360° Digital Marketing, IT, and Media Solutions"
                  className="glass-input"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Search Engine Verification</h3>
            <div className="space-y-4">
              <div>
                <label className="block body-sm font-semibold mb-2">Google Search Console</label>
                <Input
                  value={seoSettings.googleVerification}
                  onChange={(e) => setSeoSettings({...seoSettings, googleVerification: e.target.value})}
                  placeholder="google1234567890abcdef"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Bing Webmaster Tools</label>
                <Input
                  value={seoSettings.bingVerification}
                  onChange={(e) => setSeoSettings({...seoSettings, bingVerification: e.target.value})}
                  placeholder="1234567890ABCDEF"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Pinterest Verification</label>
                <Input
                  value={seoSettings.pinterestVerification}
                  onChange={(e) => setSeoSettings({...seoSettings, pinterestVerification: e.target.value})}
                  placeholder="pinterest-verify-1234567890"
                  className="glass-input"
                />
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Robots & Indexing</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={seoSettings.allowIndexing}
                  onChange={(e) => setSeoSettings({...seoSettings, allowIndexing: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="body-md">Allow search engines to index this site</label>
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Robots.txt</label>
                <Textarea
                  value={seoSettings.robotsTxt}
                  onChange={(e) => setSeoSettings({...seoSettings, robotsTxt: e.target.value})}
                  className="glass-input font-mono text-sm"
                  rows={10}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Page SEO Analysis Tab */}
        <TabsContent value="page-seo" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">SEO Analysis</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block body-sm font-semibold mb-2">Page URL</label>
                <Input
                  value={pageSEO.url}
                  onChange={(e) => setPageSEO({...pageSEO, url: e.target.value})}
                  placeholder="https://inchtomilez.com/services"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Focus Keyword(s)</label>
                <Input
                  value={pageSEO.focusKeyword}
                  onChange={(e) => setPageSEO({...pageSEO, focusKeyword: e.target.value})}
                  placeholder="digital marketing services"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Meta Title</label>
                <Input
                  value={pageSEO.title}
                  onChange={(e) => setPageSEO({...pageSEO, title: e.target.value})}
                  placeholder="Digital Marketing Services | InchToMilez"
                  className="glass-input"
                />
                <p className="body-xs text-muted mt-1">
                  {pageSEO.title.length}/60 characters
                </p>
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Meta Description</label>
                <Textarea
                  value={pageSEO.description}
                  onChange={(e) => setPageSEO({...pageSEO, description: e.target.value})}
                  placeholder="Discover our comprehensive digital marketing services..."
                  className="glass-input"
                  rows={3}
                />
                <p className="body-xs text-muted mt-1">
                  {pageSEO.description.length}/160 characters
                </p>
              </div>

              <Button 
                onClick={analyzePage}
                disabled={analyzing}
                className="btn-award w-full"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Page
                  </>
                )}
              </Button>
            </div>

            {/* SEO Score */}
            {pageSEO.score > 0 && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="heading-sm">SEO Score</h4>
                  <div className={`text-4xl font-bold ${getScoreColor(pageSEO.score)}`}>
                    {pageSEO.score}/100
                  </div>
                </div>

                {/* Score Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      pageSEO.score >= 80 ? 'bg-green-500' :
                      pageSEO.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${pageSEO.score}%` }}
                  />
                </div>

                {/* Issues */}
                {pageSEO.issues.length > 0 && (
                  <div className="mb-4">
                    <h5 className="heading-sm text-red-600 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Issues ({pageSEO.issues.length})
                    </h5>
                    <ul className="space-y-2">
                      {pageSEO.issues.map((issue, i) => (
                        <li key={i} className="body-sm text-red-600 flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {pageSEO.warnings.length > 0 && (
                  <div className="mb-4">
                    <h5 className="heading-sm text-yellow-600 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Warnings ({pageSEO.warnings.length})
                    </h5>
                    <ul className="space-y-2">
                      {pageSEO.warnings.map((warning, i) => (
                        <li key={i} className="body-sm text-yellow-600 flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Passed */}
                {pageSEO.passed.length > 0 && (
                  <div>
                    <h5 className="heading-sm text-green-600 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Passed ({pageSEO.passed.length})
                    </h5>
                    <ul className="space-y-2">
                      {pageSEO.passed.map((pass, i) => (
                        <li key={i} className="body-sm text-green-600 flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{pass}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Schema Tab */}
        <TabsContent value="schema" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Organization Schema</h3>
            <div className="space-y-4">
              <div>
                <label className="block body-sm font-semibold mb-2">Organization Type</label>
                <select
                  value={seoSettings.organizationType}
                  onChange={(e) => setSeoSettings({...seoSettings, organizationType: e.target.value})}
                  className="glass-input w-full"
                >
                  <option value="Organization">Organization</option>
                  <option value="Corporation">Corporation</option>
                  <option value="LocalBusiness">Local Business</option>
                  <option value="ProfessionalService">Professional Service</option>
                </select>
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Organization Name</label>
                <Input
                  value={seoSettings.organizationName}
                  onChange={(e) => setSeoSettings({...seoSettings, organizationName: e.target.value})}
                  placeholder="InchToMilez"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Logo URL</label>
                <Input
                  value={seoSettings.organizationLogo}
                  onChange={(e) => setSeoSettings({...seoSettings, organizationLogo: e.target.value})}
                  placeholder="https://inchtomilez.com/logo.png"
                  className="glass-input"
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="heading-sm mb-2">Generated Schema (JSON-LD)</h4>
                <pre className="glass-input p-4 text-xs overflow-auto max-h-64">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": seoSettings.organizationType,
  "name": seoSettings.organizationName,
  "url": seoSettings.siteUrl,
  "logo": seoSettings.organizationLogo,
  "description": seoSettings.defaultDescription
}, null, 2)}
                </pre>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": seoSettings.organizationType,
                      "name": seoSettings.organizationName,
                      "url": seoSettings.siteUrl,
                      "logo": seoSettings.organizationLogo,
                      "description": seoSettings.defaultDescription
                    }, null, 2));
                    toast.success('Schema copied to clipboard!');
                  }}
                  className="btn-outline-award mt-2"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Schema
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Local SEO Tab */}
        <TabsContent value="local-seo" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 icon-color-red" />
              Local Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block body-sm font-semibold mb-2">Business Name</label>
                <Input
                  value={seoSettings.businessName}
                  onChange={(e) => setSeoSettings({...seoSettings, businessName: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Business Type</label>
                <select
                  value={seoSettings.businessType}
                  onChange={(e) => setSeoSettings({...seoSettings, businessType: e.target.value})}
                  className="glass-input w-full"
                >
                  <option value="MarketingAgency">Marketing Agency</option>
                  <option value="AdvertisingAgency">Advertising Agency</option>
                  <option value="WebDesignAgency">Web Design Agency</option>
                  <option value="ProfessionalService">Professional Service</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block body-sm font-semibold mb-2">Address</label>
                <Input
                  value={seoSettings.address}
                  onChange={(e) => setSeoSettings({...seoSettings, address: e.target.value})}
                  placeholder="123 Main Street"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">City</label>
                <Input
                  value={seoSettings.city}
                  onChange={(e) => setSeoSettings({...seoSettings, city: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">State</label>
                <Input
                  value={seoSettings.state}
                  onChange={(e) => setSeoSettings({...seoSettings, state: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">ZIP Code</label>
                <Input
                  value={seoSettings.zip}
                  onChange={(e) => setSeoSettings({...seoSettings, zip: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Country</label>
                <Input
                  value={seoSettings.country}
                  onChange={(e) => setSeoSettings({...seoSettings, country: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Phone</label>
                <Input
                  value={seoSettings.phone}
                  onChange={(e) => setSeoSettings({...seoSettings, phone: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Email</label>
                <Input
                  value={seoSettings.email}
                  onChange={(e) => setSeoSettings({...seoSettings, email: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Latitude</label>
                <Input
                  value={seoSettings.latitude}
                  onChange={(e) => setSeoSettings({...seoSettings, latitude: e.target.value})}
                  placeholder="22.7196"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Longitude</label>
                <Input
                  value={seoSettings.longitude}
                  onChange={(e) => setSeoSettings({...seoSettings, longitude: e.target.value})}
                  placeholder="75.8577"
                  className="glass-input"
                />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="heading-sm mb-3">Opening Hours</h4>
              <div className="space-y-2">
                {seoSettings.openingHours.map((hours, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 items-center">
                    <span className="body-sm font-semibold">{hours.day}</span>
                    <Input
                      type="time"
                      value={hours.from}
                      onChange={(e) => {
                        const newHours = [...seoSettings.openingHours];
                        newHours[index].from = e.target.value;
                        setSeoSettings({...seoSettings, openingHours: newHours});
                      }}
                      className="glass-input"
                    />
                    <Input
                      type="time"
                      value={hours.to}
                      onChange={(e) => {
                        const newHours = [...seoSettings.openingHours];
                        newHours[index].to = e.target.value;
                        setSeoSettings({...seoSettings, openingHours: newHours});
                      }}
                      className="glass-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Redirects Tab */}
        <TabsContent value="redirects" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Create New Redirect</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addRedirect(
                formData.get('source') as string,
                formData.get('destination') as string,
                formData.get('type') as '301' | '302' | '307'
              );
              e.currentTarget.reset();
            }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block body-sm font-semibold mb-2">Source URL</label>
                  <Input
                    name="source"
                    placeholder="/old-page"
                    className="glass-input"
                    required
                  />
                </div>
                <div>
                  <label className="block body-sm font-semibold mb-2">Destination URL</label>
                  <Input
                    name="destination"
                    placeholder="/new-page"
                    className="glass-input"
                    required
                  />
                </div>
                <div>
                  <label className="block body-sm font-semibold mb-2">Type</label>
                  <select name="type" className="glass-input w-full" required>
                    <option value="301">301 (Permanent)</option>
                    <option value="302">302 (Temporary)</option>
                    <option value="307">307 (Temporary)</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="btn-award">
                <Link2 className="w-4 h-4 mr-2" />
                Create Redirect
              </Button>
            </form>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Active Redirects</h3>
            {redirects.length === 0 ? (
              <p className="body-md text-muted text-center py-8">No redirects configured</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="body-sm font-semibold text-left p-2">Source</th>
                      <th className="body-sm font-semibold text-left p-2">Destination</th>
                      <th className="body-sm font-semibold text-center p-2">Type</th>
                      <th className="body-sm font-semibold text-center p-2">Hits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {redirects.map((redirect) => (
                      <tr key={redirect.id} className="border-b hover:bg-gray-50">
                        <td className="body-sm p-2">{redirect.source}</td>
                        <td className="body-sm p-2">{redirect.destination}</td>
                        <td className="body-sm text-center p-2">
                          <span className="badge-glass">{redirect.type}</span>
                        </td>
                        <td className="body-sm text-center p-2">{redirect.hits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">404 Not Found Logs</h3>
            {notFoundUrls.length === 0 ? (
              <p className="body-md text-muted text-center py-8">No 404 errors logged</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="body-sm font-semibold text-left p-2">URL</th>
                      <th className="body-sm font-semibold text-center p-2">Count</th>
                      <th className="body-sm font-semibold text-left p-2">Last Seen</th>
                      <th className="body-sm font-semibold text-center p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notFoundUrls.map((url, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="body-sm p-2">{url.url}</td>
                        <td className="body-sm text-center p-2">{url.count}</td>
                        <td className="body-sm p-2">{new Date(url.lastSeen).toLocaleDateString()}</td>
                        <td className="body-sm text-center p-2">
                          <Button
                            onClick={() => {
                              // Pre-fill redirect form
                              setActiveTab('redirects');
                            }}
                            size="sm"
                            className="btn-sm-award"
                          >
                            Create Redirect
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Sitemap Tab */}
        <TabsContent value="sitemap" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="heading-md mb-4">Sitemap Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={seoSettings.sitemapEnabled}
                  onChange={(e) => setSeoSettings({...seoSettings, sitemapEnabled: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="body-md">Enable XML Sitemap</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={seoSettings.sitemapIncludePages}
                  onChange={(e) => setSeoSettings({...seoSettings, sitemapIncludePages: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="body-md">Include Pages</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={seoSettings.sitemapIncludePosts}
                  onChange={(e) => setSeoSettings({...seoSettings, sitemapIncludePosts: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="body-md">Include Blog Posts</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={seoSettings.sitemapIncludeImages}
                  onChange={(e) => setSeoSettings({...seoSettings, sitemapIncludeImages: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="body-md">Include Images</label>
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">Update Frequency</label>
                <select
                  value={seoSettings.sitemapFrequency}
                  onChange={(e) => setSeoSettings({...seoSettings, sitemapFrequency: e.target.value})}
                  className="glass-input w-full"
                >
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={generateSitemap}
                  disabled={loading}
                  className="btn-award w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Generate & Download Sitemap
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="heading-sm text-blue-900 mb-2">Sitemap URL</h4>
                <div className="flex items-center gap-2">
                  <code className="body-sm bg-white px-3 py-2 rounded flex-1">
                    {seoSettings.siteUrl}/sitemap.xml
                  </code>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(`${seoSettings.siteUrl}/sitemap.xml`);
                      toast.success('URL copied!');
                    }}
                    size="sm"
                    className="btn-sm-award"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button (Fixed Bottom) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={saveSEOSettings}
          disabled={loading}
          className="btn-award shadow-dramatic"
          size="lg"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Settings className="w-5 h-5 mr-2" />
              Save All SEO Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
