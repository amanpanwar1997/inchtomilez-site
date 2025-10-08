import { useState, useEffect } from 'react';
import { 
  Type, 
  Palette, 
  Layout,
  Save,
  RotateCcw,
  Eye,
  Loader2
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { AnimatedHeading } from '../AnimatedHeading';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { getThemeSettings, saveThemeSettings, type ThemeSettings } from '../../utils/admin/adminStorageSupabase';
import { toast } from 'sonner@2.0.3';

export function ThemeManagementSupabase() {
  const [settings, setSettings] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fonts = [
    'Antonio',
    'Raleway',
    'Inter',
    'Poppins',
    'Roboto',
    'Open Sans',
    'Montserrat'
  ];

  const shadowOptions = [
    { label: 'None', value: 'none' as const },
    { label: 'Small', value: 'small' as const },
    { label: 'Medium', value: 'medium' as const },
    { label: 'Large', value: 'large' as const }
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getThemeSettings();
      setSettings(data);
      console.log('✅ Loaded theme settings from Supabase');
    } catch (error) {
      console.error('Failed to load theme settings:', error);
      toast.error('Failed to load theme settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const result = await saveThemeSettings(settings);
      
      if (result.success) {
        toast.success('Theme settings saved successfully!');
        
        // Apply theme changes to document
        applyTheme(settings);
      } else {
        toast.error(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const applyTheme = (theme: ThemeSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--font-heading', theme.typography.headingFont);
    root.style.setProperty('--font-body', theme.typography.bodyFont);
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    
    if (theme.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset to default theme settings?')) return;
    
    await loadSettings(); // Reload defaults
    toast.success('Theme reset to defaults');
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          <p className="body-md text-gray-600">Loading theme settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">Theme Management</h1>
            <p className="body-lg text-gray-600">
              Customize your website's typography, colors, and design tokens
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleReset} className="btn-outline-award">
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving} className="btn-award">
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Typography */}
        <ScrollReveal animation="fade" delay={100}>
          <InnovativeCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon icon={Type} color="blue" size={24} />
              <h2 className="heading-md">Typography</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold body-sm">Heading Font</label>
                <select
                  value={settings.typography.headingFont}
                  onChange={(e) => setSettings({
                    ...settings,
                    typography: { ...settings.typography, headingFont: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg glass-input"
                >
                  {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold body-sm">Body Font</label>
                <select
                  value={settings.typography.bodyFont}
                  onChange={(e) => setSettings({
                    ...settings,
                    typography: { ...settings.typography, bodyFont: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg glass-input"
                >
                  {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold body-sm">
                  Heading Weight: {settings.typography.headingWeight}
                </label>
                <Slider
                  value={[settings.typography.headingWeight]}
                  onValueChange={([value]) => setSettings({
                    ...settings,
                    typography: { ...settings.typography, headingWeight: value }
                  })}
                  min={100}
                  max={900}
                  step={100}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold body-sm">
                  Body Weight: {settings.typography.bodyWeight}
                </label>
                <Slider
                  value={[settings.typography.bodyWeight]}
                  onValueChange={([value]) => setSettings({
                    ...settings,
                    typography: { ...settings.typography, bodyWeight: value }
                  })}
                  min={100}
                  max={900}
                  step={100}
                  className="w-full"
                />
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* Colors */}
        <ScrollReveal animation="fade" delay={200}>
          <InnovativeCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon icon={Palette} color="purple" size={24} />
              <h2 className="heading-md">Colors</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(settings.colors).map(([key, value]) => (
                <div key={key}>
                  <label className="block mb-2 font-semibold body-sm capitalize">
                    {key}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        colors: { ...settings.colors, [key]: e.target.value }
                      })}
                      className="w-16 h-10 rounded-lg cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        colors: { ...settings.colors, [key]: e.target.value }
                      })}
                      className="flex-1 glass-input"
                    />
                  </div>
                </div>
              ))}
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* Button Styles */}
        <ScrollReveal animation="fade" delay={300}>
          <InnovativeCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon icon={Layout} color="orange" size={24} />
              <h2 className="heading-md">Button Styles</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold body-sm">
                  Border Radius: {settings.buttonStyle.radius}px
                </label>
                <Slider
                  value={[settings.buttonStyle.radius]}
                  onValueChange={([value]) => setSettings({
                    ...settings,
                    buttonStyle: { ...settings.buttonStyle, radius: value }
                  })}
                  min={0}
                  max={20}
                  step={2}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold body-sm">
                  Padding: {settings.buttonStyle.padding}px
                </label>
                <Slider
                  value={[settings.buttonStyle.padding]}
                  onValueChange={([value]) => setSettings({
                    ...settings,
                    buttonStyle: { ...settings.buttonStyle, padding: value }
                  })}
                  min={4}
                  max={24}
                  step={2}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold body-sm">Shadow</label>
                <div className="grid grid-cols-2 gap-2">
                  {shadowOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSettings({
                        ...settings,
                        buttonStyle: { ...settings.buttonStyle, shadow: option.value }
                      })}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        settings.buttonStyle.shadow === option.value
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Button */}
              <div className="pt-4 border-t border-gray-200">
                <p className="body-sm mb-3">Preview:</p>
                <button
                  className="btn-award"
                  style={{
                    borderRadius: `${settings.buttonStyle.radius}px`,
                    padding: `${settings.buttonStyle.padding}px ${settings.buttonStyle.padding * 2}px`
                  }}
                >
                  Sample Button
                </button>
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* Dark Mode */}
        <ScrollReveal animation="fade" delay={400}>
          <InnovativeCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ColorfulIcon icon={Eye} color="indigo" size={24} />
                <h2 className="heading-md">Display Mode</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 glass-card rounded-lg">
                <div>
                  <p className="font-semibold mb-1">Dark Mode</p>
                  <p className="body-sm text-gray-600">Enable dark color scheme</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    darkMode: !settings.darkMode
                  })}
                  className={`relative w-14 h-8 rounded-full transition-all ${
                    settings.darkMode ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>
      </div>
    </div>
  );
}