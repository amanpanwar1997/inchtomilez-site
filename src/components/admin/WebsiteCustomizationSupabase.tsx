import { useState, useEffect } from 'react';
import { 
  Layout, 
  Image as ImageIcon, 
  Type,
  Square,
  Save,
  Eye,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  getWebsiteSettings, 
  saveWebsiteSettings,
  type WebsiteSettings 
} from '../../utils/admin/adminStorageSupabase';
import { toast } from 'sonner@2.0.3';

export function WebsiteCustomizationSupabase() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const data = await getWebsiteSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load website settings:', error);
        toast.error('Failed to load website settings');
      } finally {
        setLoading(false);
      }
    }
    
    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const result = await saveWebsiteSettings(settings);
      
      if (result.success) {
        toast.success('Website settings saved successfully!');
      } else {
        toast.error(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (field: keyof WebsiteSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const updateSocialMedia = (platform: string, url: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialMedia: {
        ...settings.socialMedia,
        [platform]: url
      }
    });
  };

  const updateFeature = (feature: string, enabled: boolean) => {
    if (!settings) return;
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [feature]: enabled
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
          <p className="body-md text-gray-600">Loading website settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="body-lg text-gray-600">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">Website Customization</h1>
            <p className="body-lg text-gray-600">
              Configure your website settings and contact information
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              className="btn-outline-award"
              onClick={() => window.open('/', '_blank')}
            >
              <Eye className="h-5 w-5 mr-2" />
              Preview Website
            </Button>
            <Button 
              className="btn-award"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Basic Information */}
      <ScrollReveal animation="fade">
        <InnovativeCard variant="glass" className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container-glass p-3">
              <ColorfulIcon icon={Globe} color="blue" size={24} animation="float" />
            </div>
            <div>
              <h3 className="heading-md">Basic Information</h3>
              <p className="body-sm text-gray-600">Website name and tagline</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 body-sm font-medium">Site Name</label>
              <Input
                value={settings.siteName}
                onChange={(e) => updateSetting('siteName', e.target.value)}
                placeholder="InchToMilez"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block mb-2 body-sm font-medium">Tagline</label>
              <Input
                value={settings.tagline}
                onChange={(e) => updateSetting('tagline', e.target.value)}
                placeholder="360° Digital Marketing + IT + Media Solutions"
                className="glass-input"
              />
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Contact Information */}
      <ScrollReveal animation="fade">
        <InnovativeCard variant="glass" className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container-glass p-3">
              <ColorfulIcon icon={Phone} color="green" size={24} animation="pulse-glow" />
            </div>
            <div>
              <h3 className="heading-md">Contact Information</h3>
              <p className="body-sm text-gray-600">How customers can reach you</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 body-sm font-medium">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting('contactEmail', e.target.value)}
                placeholder="info@inchtomilez.com"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block mb-2 body-sm font-medium">
                <Phone className="inline h-4 w-4 mr-2" />
                Phone Number
              </label>
              <Input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => updateSetting('contactPhone', e.target.value)}
                placeholder="+91-9009970709"
                className="glass-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 body-sm font-medium">
                <MapPin className="inline h-4 w-4 mr-2" />
                Address
              </label>
              <Textarea
                value={settings.address}
                onChange={(e) => updateSetting('address', e.target.value)}
                placeholder="Indore, Madhya Pradesh, India"
                className="glass-input"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 body-sm font-medium">Business Hours</label>
              <Input
                value={settings.businessHours}
                onChange={(e) => updateSetting('businessHours', e.target.value)}
                placeholder="Mon-Sat, 9AM - 7PM IST"
                className="glass-input"
              />
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Social Media Links */}
      <ScrollReveal animation="fade">
        <InnovativeCard variant="glass" className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container-glass p-3">
              <ColorfulIcon icon={Globe} color="purple" size={24} animation="bounce" />
            </div>
            <div>
              <h3 className="heading-md">Social Media</h3>
              <p className="body-sm text-gray-600">Your social media profiles</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 body-sm font-medium">Facebook URL</label>
              <Input
                value={settings.socialMedia.facebook || ''}
                onChange={(e) => updateSocialMedia('facebook', e.target.value)}
                placeholder="https://facebook.com/inchtomilez"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block mb-2 body-sm font-medium">Twitter URL</label>
              <Input
                value={settings.socialMedia.twitter || ''}
                onChange={(e) => updateSocialMedia('twitter', e.target.value)}
                placeholder="https://twitter.com/inchtomilez"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block mb-2 body-sm font-medium">Instagram URL</label>
              <Input
                value={settings.socialMedia.instagram || ''}
                onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                placeholder="https://instagram.com/inchtomilez"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block mb-2 body-sm font-medium">LinkedIn URL</label>
              <Input
                value={settings.socialMedia.linkedin || ''}
                onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/inchtomilez"
                className="glass-input"
              />
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Feature Toggles */}
      <ScrollReveal animation="fade">
        <InnovativeCard variant="glass" className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container-glass p-3">
              <ColorfulIcon icon={Layout} color="orange" size={24} animation="shake" />
            </div>
            <div>
              <h3 className="heading-md">Features</h3>
              <p className="body-sm text-gray-600">Enable or disable website features</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(settings.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center justify-between p-4 glass-subtle rounded-lg">
                <div>
                  <h4 className="heading-sm capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <p className="body-xs text-gray-500">
                    {feature === 'comments' && 'Allow blog comments'}
                    {feature === 'newsletter' && 'Newsletter signup'}
                    {feature === 'chatbot' && 'AI chatbot assistant'}
                    {feature === 'pwa' && 'Progressive web app'}
                  </p>
                </div>
                <button
                  onClick={() => updateFeature(feature, !enabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    enabled ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end gap-3 pt-4">
        <Button 
          className="btn-award btn-lg-award"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}