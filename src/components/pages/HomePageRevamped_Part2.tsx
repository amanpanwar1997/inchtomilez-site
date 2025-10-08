// CONTINUATION OF HOMEPAGE - PART 2
// This contains additional sections to be integrated

import { motion } from 'motion/react';
import {
  TrendingUp, Target, Zap, Award, Users, Rocket, CheckCircle2, ArrowRight,
  Globe, Megaphone, Palette, Code, PenTool, Radio, Search,
  Layers, BarChart3, Lightbulb, Clock, Film, Camera, Video,
  Sparkles, Star, Play, Eye, MessageSquare, Share2, Repeat
} from 'lucide-react';

import { MasonryGrid } from '../MasonryGrid';
import { IconBoxGrid } from '../IconBoxGrid';
import { AnimatedTabs } from '../AnimatedTabs';

// ============================================
// 5. CAMPAIGN ARCHITECTURE SECTION (Masonry Grid)
// ============================================
export function CampaignArchitectureSection() {
  const masonryItems = [
    {
      id: '1',
      title: 'Consumer Journey Mapping',
      description: 'Orchestrating every touchpoint from awareness through advocacy. Understanding the path to purchase with ethnographic precision.',
      icon: Target,
      size: 'large' as const,
      category: 'Strategy',
    },
    {
      id: '2',
      title: 'Brand Equity Building',
      description: 'Long-term brand value creation through consistent messaging, visual identity systems, and emotional resonance.',
      icon: Award,
      size: 'medium' as const,
      category: 'Branding',
    },
    {
      id: '3',
      title: 'Creative Concepting',
      description: 'From insight to execution. Big ideas that become cultural conversations.',
      icon: Lightbulb,
      size: 'small' as const,
      category: 'Creative',
    },
    {
      id: '4',
      title: 'Media Planning',
      description: 'Strategic channel mix optimization for maximum GRP and cost efficiency.',
      icon: BarChart3,
      size: 'medium' as const,
      category: 'Media',
    },
    {
      id: '5',
      title: 'Production Excellence',
      description: 'Film, photography, animation, and design executed to cinematic standards. Every asset, a masterpiece.',
      icon: Film,
      size: 'large' as const,
      category: 'Production',
      image: 'https://images.unsplash.com/photo-1616527546362-bf6b7f80a751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
    {
      id: '6',
      title: 'Performance Analytics',
      description: 'Real-time campaign tracking, attribution modeling, and optimization insights.',
      icon: TrendingUp,
      size: 'small' as const,
      category: 'Analytics',
    },
    {
      id: '7',
      title: 'Influencer Orchestration',
      description: 'Authentic partnerships with cultural tastemakers driving authentic brand conversations.',
      icon: Users,
      size: 'medium' as const,
      category: 'Social',
    },
    {
      id: '8',
      title: 'Conversion Optimization',
      description: 'A/B testing, CRO, landing page engineering for maximum conversion lift.',
      icon: Zap,
      size: 'small' as const,
      category: 'Digital',
    },
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Layers className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">CAMPAIGN ARCHITECTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            FULL-SPECTRUM MARKETING SOLUTIONS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Every great campaign is a symphony of strategic thinking, creative excellence, 
            and flawless execution. We orchestrate all elements in perfect harmony.
          </motion.p>
        </div>

        <MasonryGrid items={masonryItems} columns={3} gap={24} />
      </div>
    </section>
  );
}

// ============================================
// 6. MASTERY STATS SECTION (Inline Stats)
// ============================================
export function MasteryStatsSection() {
  const stats = [
    { id: '1', value: 500, suffix: 'M+', label: 'Ad Impressions', icon: Eye },
    { id: '2', value: 250, suffix: '+', label: 'Brands', icon: Award },
    { id: '3', value: 94, suffix: '%', label: 'Campaign Success', icon: TrendingUp },
    { id: '4', value: 8, suffix: 'X', label: 'Avg ROI', icon: Rocket },
  ];

  return (
    <section className="section-compact-md bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card card-compact-lg">
            <div className="text-center mb-8">
              <h3 className="heading-md mb-2">THE NUMBERS TELL THE STORY</h3>
              <p className="body-md text-muted">Three decades of measurable impact</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="icon-container-glass w-14 h-14 p-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-full h-full text-black" strokeWidth={2} />
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-antonio font-bold text-4xl text-black">
                          {stat.value}
                        </span>
                        {stat.suffix && (
                          <span className="font-antonio font-bold text-2xl text-black">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted font-semibold mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// 7. ATL BTL TTL TABS SECTION
// ============================================
export function ATLBTLTTLTabsSection() {
  const tabs = [
    {
      id: 'atl',
      label: 'ATL - Above The Line',
      icon: Radio,
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card card-compact-md">
            <div className="icon-container-glass w-12 h-12 p-3 mb-4">
              <Radio className="w-full h-full text-black" strokeWidth={2} />
            </div>
            <h3 className="heading-sm text-base mb-3">Mass Media Campaigns</h3>
            <p className="body-sm text-muted leading-relaxed mb-4">
              Television commercials, Radio spots, Print ads, Outdoor hoardings, and Cinema advertising. 
              Building <strong className="text-black">brand awareness at scale</strong> with high-impact creative 
              that resonates across demographics.
            </p>
            <ul className="space-y-2">
              {['TV Commercials', 'Radio Spots', 'Print Advertising', 'OOH/Billboard', 'Cinema Ads'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card card-compact-md">
            <h4 className="heading-sm text-sm mb-4">Campaign Metrics</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Reach (GRP)</span>
                  <span className="body-xs font-semibold text-black">2500+</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Brand Recall</span>
                  <span className="body-xs font-semibold text-black">89%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '89%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Frequency</span>
                  <span className="body-xs font-semibold text-black">12.3</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'btl',
      label: 'BTL - Below The Line',
      icon: Target,
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card card-compact-md">
            <div className="icon-container-glass w-12 h-12 p-3 mb-4">
              <Target className="w-full h-full text-black" strokeWidth={2} />
            </div>
            <h3 className="heading-sm text-base mb-3">Direct Response Marketing</h3>
            <p className="body-sm text-muted leading-relaxed mb-4">
              Targeted activations designed for <strong className="text-black">measurable engagement</strong>. 
              From experiential events to direct mail campaigns, every touchpoint is tracked, optimized, 
              and tied to clear KPIs.
            </p>
            <ul className="space-y-2">
              {['Experiential Events', 'Direct Mail', 'Point-of-Sale', 'Trade Shows', 'Email Campaigns'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card card-compact-md">
            <h4 className="heading-sm text-sm mb-4">Performance Metrics</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Conversion Rate</span>
                  <span className="body-xs font-semibold text-black">4.2%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '84%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Engagement Rate</span>
                  <span className="body-xs font-semibold text-black">12.8%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">ROI Multiple</span>
                  <span className="body-xs font-semibold text-black">6.5X</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '95%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ttl',
      label: 'TTL - Through The Line',
      icon: Layers,
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card card-compact-md">
            <div className="icon-container-glass w-12 h-12 p-3 mb-4">
              <Layers className="w-full h-full text-black" strokeWidth={2} />
            </div>
            <h3 className="heading-sm text-base mb-3">Integrated Campaigns</h3>
            <p className="body-sm text-muted leading-relaxed mb-4">
              The future of advertising. <strong className="text-black">Seamless integration</strong> of mass 
              awareness and direct response. Omnichannel narratives that build brand equity while driving 
              measurable action. Best of both worlds.
            </p>
            <ul className="space-y-2">
              {['360° Campaigns', 'Cross-Channel', 'Omnichannel', 'Digital + Traditional', 'Unified Messaging'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card card-compact-md">
            <h4 className="heading-sm text-sm mb-4">Integrated Impact</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Campaign Synergy</span>
                  <span className="body-xs font-semibold text-black">93%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '93%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Brand Lift</span>
                  <span className="body-xs font-semibold text-black">67%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '87%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-xs font-semibold">Total ROI</span>
                  <span className="body-xs font-semibold text-black">11.2X</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '98%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">ADVERTISING SPECTRUM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            ATL • BTL • TTL EXPERTISE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Mastering every advertising discipline from mass media to direct response, 
            unified through integrated campaign architecture.
          </motion.p>
        </div>

        <AnimatedTabs tabs={tabs} defaultTab="atl" />
      </div>
    </section>
  );
}

// More sections continue...