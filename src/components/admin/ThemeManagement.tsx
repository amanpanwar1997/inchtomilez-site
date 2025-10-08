import { useState } from 'react';
import { 
  Type, 
  Palette, 
  Layout,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Eye,
  Sun,
  Moon
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { AnimatedHeading } from '../AnimatedHeading';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

export function ThemeManagement() {
  const [typography, setTypography] = useState({
    headingFont: 'Antonio',
    bodyFont: 'Raleway',
    headingWeight: 700,
    bodyWeight: 400
  });

  const [colors, setColors] = useState({
    primary: '#1a1a1a',
    secondary: '#404040',
    accent: '#666666',
    background: '#ffffff'
  });

  const [buttonStyle, setButtonStyle] = useState({
    radius: 10,
    padding: 12,
    shadow: 'medium'
  });

  const [darkMode, setDarkMode] = useState(false);

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
    { label: 'None', value: 'none' },
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];

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
            <Button className="btn-outline-award">
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </Button>
            <Button className="btn-award">
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Typography Section */}
          <ScrollReveal animation="slide-left">
            <InnovativeCard effect="3d-tilt" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ColorfulIcon
                  icon={Type}
                  color="blue"
                  animation="pulse-glow"
                  size={32}
                />
                <h2 className="heading-md">Typography</h2>
              </div>

              <div className="space-y-6">
                {/* Heading Font */}
                <div>
                  <label className="block body-md mb-3">Heading Font</label>
                  <select
                    value={typography.headingFont}
                    onChange={(e) => setTypography({ ...typography, headingFont: e.target.value })}
                    className="glass-input w-full py-2 px-4 rounded-lg"
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                {/* Body Font */}
                <div>
                  <label className="block body-md mb-3">Body Font</label>
                  <select
                    value={typography.bodyFont}
                    onChange={(e) => setTypography({ ...typography, bodyFont: e.target.value })}
                    className="glass-input w-full py-2 px-4 rounded-lg"
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                {/* Heading Weight */}
                <div>
                  <label className="block body-md mb-3">
                    Heading Weight: {typography.headingWeight}
                  </label>
                  <Slider
                    value={[typography.headingWeight]}
                    onValueChange={(value) => setTypography({ ...typography, headingWeight: value[0] })}
                    min={100}
                    max={900}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Body Weight */}
                <div>
                  <label className="block body-md mb-3">
                    Body Weight: {typography.bodyWeight}
                  </label>
                  <Slider
                    value={[typography.bodyWeight]}
                    onValueChange={(value) => setTypography({ ...typography, bodyWeight: value[0] })}
                    min={100}
                    max={900}
                    step={100}
                    className="w-full"
                  />
                </div>
              </div>
            </InnovativeCard>
          </ScrollReveal>

          {/* Color Palette */}
          <ScrollReveal animation="slide-left">
            <InnovativeCard effect="glow-border" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ColorfulIcon
                  icon={Palette}
                  color="purple"
                  animation="float"
                  size={32}
                />
                <h2 className="heading-md">Color Palette</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block body-md mb-3 capitalize">{key}</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                        className="h-12 w-20 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                        className="glass-input flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ColorfulIcon
                      icon={darkMode ? Moon : Sun}
                      color={darkMode ? 'indigo' : 'yellow'}
                      animation="pulse-glow"
                      size={24}
                    />
                    <span className="body-md">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-14 h-7 rounded-full transition-smooth ${
                      darkMode ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        darkMode ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </InnovativeCard>
          </ScrollReveal>

          {/* Button Styling */}
          <ScrollReveal animation="slide-left">
            <InnovativeCard effect="expand" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ColorfulIcon
                  icon={Layout}
                  color="orange"
                  animation="bounce"
                  size={32}
                />
                <h2 className="heading-md">Button Styling</h2>
              </div>

              <div className="space-y-6">
                {/* Border Radius */}
                <div>
                  <label className="block body-md mb-3">
                    Border Radius: {buttonStyle.radius}px
                  </label>
                  <Slider
                    value={[buttonStyle.radius]}
                    onValueChange={(value) => setButtonStyle({ ...buttonStyle, radius: value[0] })}
                    min={0}
                    max={30}
                    step={2}
                    className="w-full"
                  />
                </div>

                {/* Padding */}
                <div>
                  <label className="block body-md mb-3">
                    Padding: {buttonStyle.padding}px
                  </label>
                  <Slider
                    value={[buttonStyle.padding]}
                    onValueChange={(value) => setButtonStyle({ ...buttonStyle, padding: value[0] })}
                    min={8}
                    max={24}
                    step={2}
                    className="w-full"
                  />
                </div>

                {/* Shadow */}
                <div>
                  <label className="block body-md mb-3">Shadow Effect</label>
                  <div className="grid grid-cols-4 gap-3">
                    {shadowOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setButtonStyle({ ...buttonStyle, shadow: option.value })}
                        className={`py-2 px-4 rounded-lg transition-smooth ${
                          buttonStyle.shadow === option.value
                            ? 'glass-strong'
                            : 'glass-subtle hover:glass-card'
                        }`}
                      >
                        <span className="body-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </InnovativeCard>
          </ScrollReveal>

          {/* Logo & Favicon */}
          <ScrollReveal animation="slide-left">
            <InnovativeCard effect="magnetic" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ColorfulIcon
                  icon={ImageIcon}
                  color="green"
                  animation="swing"
                  size={32}
                />
                <h2 className="heading-md">Logo & Favicon</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div>
                  <label className="block body-md mb-3">Website Logo</label>
                  <div className="glass-subtle p-8 rounded-xl border-2 border-dashed border-gray-300 text-center hover:border-gray-400 transition-smooth cursor-pointer">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="body-sm text-gray-600">Upload Logo</p>
                    <p className="body-xs text-gray-500 mt-1">SVG or PNG</p>
                  </div>
                </div>

                {/* Favicon Upload */}
                <div>
                  <label className="block body-md mb-3">Favicon</label>
                  <div className="glass-subtle p-8 rounded-xl border-2 border-dashed border-gray-300 text-center hover:border-gray-400 transition-smooth cursor-pointer">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="body-sm text-gray-600">Upload Favicon</p>
                    <p className="body-xs text-gray-500 mt-1">ICO or PNG</p>
                  </div>
                </div>
              </div>
            </InnovativeCard>
          </ScrollReveal>
        </div>

        {/* Right Column - Live Preview */}
        <div className="lg:col-span-1">
          <ScrollReveal animation="slide-right">
            <div className="sticky top-24">
              <InnovativeCard effect="particles" className="p-6">
                <h3 className="heading-md mb-6">Live Preview</h3>
                
                <div className="space-y-6">
                  {/* Typography Preview */}
                  <div className="glass-subtle p-4 rounded-lg">
                    <h1
                      className="heading-xl mb-2"
                      style={{
                        fontFamily: typography.headingFont,
                        fontWeight: typography.headingWeight
                      }}
                    >
                      Heading Preview
                    </h1>
                    <p
                      className="body-md"
                      style={{
                        fontFamily: typography.bodyFont,
                        fontWeight: typography.bodyWeight
                      }}
                    >
                      Body text preview with the selected typography settings.
                    </p>
                  </div>

                  {/* Color Preview */}
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(colors).map(([key, value]) => (
                      <div
                        key={key}
                        className="h-16 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: value }}
                      >
                        <span className={`body-xs ${
                          value === '#ffffff' ? 'text-black' : 'text-white'
                        }`}>
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Button Preview */}
                  <div className="glass-subtle p-4 rounded-lg space-y-3">
                    <button
                      className="w-full bg-black text-white transition-smooth"
                      style={{
                        borderRadius: `${buttonStyle.radius}px`,
                        padding: `${buttonStyle.padding}px ${buttonStyle.padding * 2}px`,
                        boxShadow: buttonStyle.shadow === 'none' ? 'none' :
                                 buttonStyle.shadow === 'small' ? '0 1px 3px rgba(0,0,0,0.1)' :
                                 buttonStyle.shadow === 'medium' ? '0 4px 12px rgba(0,0,0,0.15)' :
                                 '0 8px 24px rgba(0,0,0,0.2)'
                      }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="w-full border-2 border-black transition-smooth"
                      style={{
                        borderRadius: `${buttonStyle.radius}px`,
                        padding: `${buttonStyle.padding}px ${buttonStyle.padding * 2}px`
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>

                {/* Reset Button */}
                <Button className="btn-outline-award w-full mt-6">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </InnovativeCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
