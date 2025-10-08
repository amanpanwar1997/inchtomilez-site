import { 
  Search, 
  TrendingUp, 
  Globe, 
  Share2,
  BarChart,
  Tag,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function SEOMarketing() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div>
          <h1 className="heading-xl mb-2">SEO & Marketing Tools</h1>
          <p className="body-lg text-gray-600">
            Optimize your website for search engines and social media
          </p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Page-Level SEO */}
        <ScrollReveal animation="slide-left">
          <InnovativeCard effect="glow-border" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Search}
                color="blue"
                animation="pulse-glow"
                size={32}
              />
              <h2 className="heading-md">Page-Level SEO</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block body-md mb-2">Meta Title</label>
                <Input
                  type="text"
                  placeholder="Optimized page title (50-60 characters)"
                  className="glass-input w-full"
                />
                <p className="body-xs text-gray-500 mt-1">0 / 60 characters</p>
              </div>

              <div>
                <label className="block body-md mb-2">Meta Description</label>
                <Textarea
                  placeholder="Compelling description for search results (150-160 characters)"
                  className="glass-input w-full"
                  rows={3}
                />
                <p className="body-xs text-gray-500 mt-1">0 / 160 characters</p>
              </div>

              <div>
                <label className="block body-md mb-2">URL Slug</label>
                <Input
                  type="text"
                  placeholder="page-url-slug"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">Canonical URL</label>
                <Input
                  type="text"
                  placeholder="https://inchtomilez.com/page"
                  className="glass-input w-full"
                />
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>

        {/* Social Sharing */}
        <ScrollReveal animation="slide-right">
          <InnovativeCard effect="expand" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Share2}
                color="purple"
                animation="float"
                size={32}
              />
              <h2 className="heading-md">Social Sharing</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block body-md mb-2">OG Title</label>
                <Input
                  type="text"
                  placeholder="Title for social media shares"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block body-md mb-2">OG Description</label>
                <Textarea
                  placeholder="Description for social media previews"
                  className="glass-input w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block body-md mb-2">OG Image</label>
                <div className="glass-subtle p-6 rounded-xl border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-gray-400 transition-smooth">
                  <ColorfulIcon
                    icon={ImageIcon}
                    color="green"
                    animation="bounce"
                    size={40}
                    className="mx-auto mb-3"
                  />
                  <p className="body-sm text-gray-600">Upload OG Image</p>
                  <p className="body-xs text-gray-500 mt-1">1200x630px recommended</p>
                </div>
              </div>

              <div>
                <label className="block body-md mb-2">Twitter Card Type</label>
                <select className="glass-input w-full py-2 px-3 rounded-lg">
                  <option>Summary Card</option>
                  <option>Summary Large Image</option>
                  <option>Player Card</option>
                  <option>App Card</option>
                </select>
              </div>
            </div>
          </InnovativeCard>
        </ScrollReveal>
      </div>

      {/* Analytics Integration */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="3d-tilt" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={BarChart}
              color="orange"
              animation="pulse-glow"
              size={32}
            />
            <h2 className="heading-md">Analytics & Tracking</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block body-md mb-2">Google Analytics ID</label>
              <Input
                type="text"
                placeholder="G-XXXXXXXXXX"
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="block body-md mb-2">Google Tag Manager ID</label>
              <Input
                type="text"
                placeholder="GTM-XXXXXXX"
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="block body-md mb-2">Facebook Pixel ID</label>
              <Input
                type="text"
                placeholder="123456789012345"
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="block body-md mb-2">Google Search Console</label>
              <Input
                type="text"
                placeholder="Verification code"
                className="glass-input w-full"
              />
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Keywords & Tags */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="magnetic" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ColorfulIcon
              icon={Tag}
              color="yellow"
              animation="swing"
              size={32}
            />
            <h2 className="heading-md">Keywords & Tags</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block body-md mb-2">Focus Keywords</label>
              <Input
                type="text"
                placeholder="digital marketing, SEO, social media"
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="block body-md mb-2">Schema Markup Type</label>
              <select className="glass-input w-full py-2 px-3 rounded-lg">
                <option>Article</option>
                <option>WebPage</option>
                <option>Product</option>
                <option>LocalBusiness</option>
                <option>Organization</option>
              </select>
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Sitemap & Robots */}
      <div className="grid md:grid-cols-2 gap-6">
        <ScrollReveal animation="slide-left">
          <InnovativeCard effect="glow-border" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={Globe}
                color="green"
                animation="float"
                size={32}
              />
              <h2 className="heading-md">Sitemap</h2>
            </div>

            <div className="space-y-4">
              <div className="glass-subtle p-4 rounded-lg">
                <p className="body-md mb-2">sitemap.xml</p>
                <p className="body-sm text-gray-600">Last generated: 2 hours ago</p>
              </div>
              <Button className="btn-award w-full">
                Regenerate Sitemap
              </Button>
            </div>
          </InnovativeCard>
        </ScrollReveal>

        <ScrollReveal animation="slide-right">
          <InnovativeCard effect="expand" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ColorfulIcon
                icon={LinkIcon}
                color="red"
                animation="pulse-glow"
                size={32}
              />
              <h2 className="heading-md">Robots.txt</h2>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="User-agent: *&#10;Disallow: /admin&#10;Allow: /"
                className="glass-input w-full font-mono text-sm"
                rows={6}
              />
              <Button className="btn-award w-full">
                Update Robots.txt
              </Button>
            </div>
          </InnovativeCard>
        </ScrollReveal>
      </div>

      {/* Save Button */}
      <ScrollReveal animation="fade">
        <div className="flex justify-end gap-4">
          <Button className="btn-outline-award btn-lg-award">
            Reset Changes
          </Button>
          <Button className="btn-award btn-lg-award">
            Save SEO Settings
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
