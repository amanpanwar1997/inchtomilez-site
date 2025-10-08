import { useState } from 'react';
import { 
  Layout, 
  Image as ImageIcon, 
  Type,
  Square,
  Save,
  Eye
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function WebsiteCustomization() {
  const [heroContent, setHeroContent] = useState({
    headline: 'Transform Your Digital Presence',
    subtext: 'Leading Digital Marketing Agency in India',
    ctaText: 'Get Started',
    ctaLink: '/contact'
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">Website Customization</h1>
            <p className="body-lg text-gray-600">
              Modify content blocks and interactive sections
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="btn-outline-award">
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </Button>
            <Button className="btn-award">
              <Save className="h-5 w-5 mr-2" />
              Publish Changes
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Hero Section Editor */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="glow-border" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Layout}
              color="blue"
              animation="pulse-glow"
              size={32}
            />
            <h2 className="heading-md">Hero Section</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="space-y-4">
              <div>
                <label className="block body-md mb-2">Main Headline</label>
                <Input
                  type="text"
                  value={heroContent.headline}
                  onChange={(e) => setHeroContent({ ...heroContent, headline: e.target.value })}
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Subtext</label>
                <Textarea
                  value={heroContent.subtext}
                  onChange={(e) => setHeroContent({ ...heroContent, subtext: e.target.value })}
                  className="glass-input w-full"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block body-md mb-2">CTA Button Text</label>
                  <Input
                    type="text"
                    value={heroContent.ctaText}
                    onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>

                <div>
                  <label className="block body-md mb-2">CTA Link</label>
                  <Input
                    type="text"
                    value={heroContent.ctaLink}
                    onChange={(e) => setHeroContent({ ...heroContent, ctaLink: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block body-md mb-2">Background Image/Video</label>
                <div className="glass-subtle p-8 rounded-xl border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-gray-400 transition-smooth">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="body-sm text-gray-600">Upload Media</p>
                  <p className="body-xs text-gray-500 mt-1">Image or Video</p>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="glass-subtle p-8 rounded-xl">
              <p className="body-xs text-gray-500 mb-4 text-center">LIVE PREVIEW</p>
              <div className="space-y-4 text-center">
                <h1 className="heading-xl">{heroContent.headline}</h1>
                <p className="body-lg text-gray-600">{heroContent.subtext}</p>
                <button className="btn-award btn-lg-award">
                  {heroContent.ctaText}
                </button>
              </div>
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Content Blocks */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="expand" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Square}
              color="purple"
              animation="float"
              size={32}
            />
            <h2 className="heading-md">Reusable Content Blocks</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'About Us Block', pages: 3, icon: Type, color: 'blue' },
              { name: 'CTA Banner', pages: 5, icon: Layout, color: 'green' },
              { name: 'Stats Section', pages: 4, icon: Square, color: 'purple' },
              { name: 'Testimonials', pages: 2, icon: Type, color: 'orange' },
              { name: 'Contact Form', pages: 1, icon: Layout, color: 'red' },
              { name: 'Footer Content', pages: 14, icon: Square, color: 'indigo' }
            ].map((block, index) => (
              <div
                key={index}
                className="glass-subtle p-6 rounded-xl hover-lift-md cursor-pointer transition-smooth"
              >
                <ColorfulIcon
                  icon={block.icon}
                  color={block.color as any}
                  animation="bounce"
                  size={32}
                  className="mb-4"
                />
                <h3 className="heading-sm mb-2">{block.name}</h3>
                <p className="body-sm text-gray-600">Used in {block.pages} pages</p>
                <Button className="btn-outline-award w-full mt-4">
                  Edit Block
                </Button>
              </div>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Component Library */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="3d-tilt" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Layout}
              color="orange"
              animation="pulse-glow"
              size={32}
            />
            <h2 className="heading-md">Component Library</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Service Card',
              'Blog Post Card',
              'Team Member',
              'Pricing Table',
              'Feature List',
              'Icon Box',
              'Image Gallery',
              'Video Player'
            ].map((component, index) => (
              <button
                key={index}
                className="glass-subtle p-6 rounded-xl hover-lift-sm transition-smooth text-center"
              >
                <div className="h-16 w-16 mx-auto mb-3 glass-card rounded-lg flex items-center justify-center">
                  <Layout className="h-8 w-8 text-gray-400" />
                </div>
                <p className="body-sm">{component}</p>
              </button>
            ))}
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Global Updates */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="magnetic" className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ColorfulIcon
                icon={Save}
                color="green"
                animation="pulse-glow"
                size={32}
              />
              <div>
                <h2 className="heading-md mb-1">Global Updates</h2>
                <p className="body-md text-gray-600">
                  Changes will be reflected across all pages using these components
                </p>
              </div>
            </div>
            <Button className="btn-award">
              Apply to All Pages
            </Button>
          </div>
        </InnovativeCard>
      </ScrollReveal>
    </div>
  );
}
