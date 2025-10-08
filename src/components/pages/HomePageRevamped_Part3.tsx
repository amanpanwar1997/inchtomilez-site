// CONTINUATION OF HOMEPAGE - PART 3
// Portfolio, Film Production, Methodologies, Timeline

import { motion } from 'motion/react';
import {
  Film, Camera, Video, Palette, Code, PenTool, Megaphone,
  Target, TrendingUp, Users, Award, Rocket, Eye, MessageSquare,
  Lightbulb, Zap, BarChart3, Layers, Share2, CheckCircle2, ArrowRight
} from 'lucide-react';

import { MasonryGrid } from '../MasonryGrid';
import { BentoGrid } from '../BentoGrid';
import { IconBoxGrid } from '../IconBoxGrid';

// ============================================
// 8. PORTFOLIO MASONRY SECTION
// ============================================
export function PortfolioMasonrySection() {
  const portfolioItems = [
    {
      id: '1',
      title: 'FMCG Brand Launch',
      description: 'Nationwide ATL campaign achieving 87% aided brand recall within 6 months. Integrated TV, Radio, OOH across 24 markets.',
      icon: Megaphone,
      size: 'large' as const,
      category: 'ATL',
      image: 'https://images.unsplash.com/photo-1560523282-916f7dd28896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
    {
      id: '2',
      title: 'E-Commerce Scale-Up',
      description: 'Performance marketing delivering 842% revenue growth. Multi-channel funnel optimization across paid social, search, and programmatic.',
      icon: TrendingUp,
      size: 'medium' as const,
      category: 'Digital',
    },
    {
      id: '3',
      title: 'Automotive Cinema Ad',
      description: 'Award-winning 60-second brand film screened across 500+ multiplexes. Parallel cinema aesthetics driving emotional brand connection.',
      icon: Film,
      size: 'medium' as const,
      category: 'Brand Film',
      image: 'https://images.unsplash.com/photo-1616527546362-bf6b7f80a751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
    {
      id: '4',
      title: 'Fashion Retail BTL',
      description: 'Experiential pop-up activations in 15 cities. 45,000+ direct engagements, 12.3% conversion to purchase.',
      icon: Target,
      size: 'small' as const,
      category: 'BTL',
    },
    {
      id: '5',
      title: 'Tech Startup Positioning',
      description: 'Complete brand identity, messaging architecture, and go-to-market strategy. Achieved $12M Series A.',
      icon: Rocket,
      size: 'medium' as const,
      category: 'Branding',
    },
    {
      id: '6',
      title: 'Social Impact Campaign',
      description: 'Cause marketing initiative reaching 50M+ impressions. Viral content strategy amplifying social message.',
      icon: Share2,
      size: 'small' as const,
      category: 'Social',
    },
    {
      id: '7',
      title: 'Premium Product Relaunch',
      description: 'TTL campaign integrating mass media with influencer partnerships. 340% sales lift in target demographic.',
      icon: Award,
      size: 'large' as const,
      category: 'TTL',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
    {
      id: '8',
      title: 'B2B Lead Generation',
      description: 'Multi-touch campaign generating 2,400+ qualified leads. Account-based marketing with personalized creative.',
      icon: Users,
      size: 'small' as const,
      category: 'B2B',
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
            <Award className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">PORTFOLIO SHOWCASE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            CAMPAIGNS THAT CREATED IMPACT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            From brand films that win awards to performance campaigns that break records. 
            Every project tells a story of <strong className="text-black">measurable transformation</strong>.
          </motion.p>
        </div>

        <MasonryGrid items={portfolioItems} columns={3} gap={24} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="btn-award btn-lg-award group">
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// 9. FILM PRODUCTION BENTO SECTION
// ============================================
export function FilmProductionBentoSection() {
  const bentoItems = [
    {
      id: '1',
      title: 'Cinematography Excellence',
      description: 'Shot composition, lighting design, camera movement — every frame crafted with cinematic precision. Our directors bring film school rigor to brand storytelling.',
      icon: Camera,
      size: 'large' as const,
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
    },
    {
      id: '2',
      title: 'Color Grading',
      description: 'Emotional tonality through color science. Every grade serves the narrative.',
      icon: Palette,
      size: 'small' as const,
    },
    {
      id: '3',
      title: 'Montage & Editing',
      description: 'Rhythm, pacing, continuity. Editing as storytelling art.',
      icon: Film,
      size: 'small' as const,
    },
    {
      id: '4',
      title: 'VFX & Motion Graphics',
      description: 'CGI, compositing, animation. Technical mastery meets creative vision for seamless visual effects that enhance brand narratives.',
      icon: Layers,
      size: 'wide' as const,
    },
    {
      id: '5',
      title: 'Sound Design',
      description: 'Audio mixing, foley, music composition. Sonic landscapes that amplify emotional impact.',
      icon: Video,
      size: 'medium' as const,
    },
    {
      id: '6',
      title: 'Pre-Production',
      description: 'Storyboarding, location scouting, casting. Meticulous planning ensures flawless execution.',
      icon: PenTool,
      size: 'small' as const,
    },
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Film className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">FILM PRODUCTION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            CINEMATIC BRAND STORYTELLING
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Inspired by <strong className="text-black">parallel cinema</strong> and the golden age of 
            Indian filmmaking. Every brand film is a visual poem, every commercial a mini-masterpiece.
          </motion.p>
        </div>

        <BentoGrid items={bentoItems} />
      </div>
    </section>
  );
}

// ============================================
// 10. ICON METHODOLOGIES SECTION
// ============================================
export function IconMethodologiesSection() {
  const iconBoxes = [
    {
      id: '1',
      title: 'AIDA Model',
      description: 'Attention → Interest → Desire → Action. Time-tested framework engineering every touchpoint for maximum conversion.',
      icon: Target,
      stat: '4 Stages',
    },
    {
      id: '2',
      title: 'Brand Pyramid',
      description: 'From functional benefits to emotional values to brand essence. Building layers of meaning that resonate deeply.',
      icon: Award,
      stat: '5 Levels',
    },
    {
      id: '3',
      title: 'Customer Journey',
      description: 'Awareness → Consideration → Decision → Retention → Advocacy. Mapping every interaction for seamless experience.',
      icon: Users,
      stat: '5 Phases',
    },
    {
      id: '4',
      title: 'Marketing Mix',
      description: 'Product • Price • Place • Promotion. The 4Ps optimized for maximum market penetration and profitability.',
      icon: BarChart3,
      stat: '4Ps',
    },
    {
      id: '5',
      title: 'Storytelling Arc',
      description: 'Setup → Conflict → Resolution. Three-act structure adapted from cinema to create compelling brand narratives.',
      icon: Film,
      stat: '3 Acts',
    },
    {
      id: '6',
      title: 'Conversion Funnel',
      description: 'Awareness → Interest → Consideration → Intent → Evaluation → Purchase. Engineering each stage for optimization.',
      icon: TrendingUp,
      stat: '6 Stages',
    },
    {
      id: '7',
      title: 'Color Psychology',
      description: 'Strategic color application driving emotional response, brand recognition, and purchasing behavior.',
      icon: Palette,
      stat: 'Visual Science',
    },
    {
      id: '8',
      title: 'Media Mix Model',
      description: 'Algorithmic channel attribution optimizing budget allocation across ATL, BTL, and digital touchpoints.',
      icon: Layers,
      stat: 'Data-Driven',
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
            <Lightbulb className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">STRATEGIC FRAMEWORKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            ADVERTISING METHODOLOGIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Classical advertising theory meets modern data science. Proven frameworks 
            adapted, refined, and perfected over three decades.
          </motion.p>
        </div>

        <IconBoxGrid items={iconBoxes} columns={4} animation="glow" />
      </div>
    </section>
  );
}

// ============================================
// 11. CINEMATIC TIMELINE SECTION
// ============================================
export function CinematicTimelineSection() {
  const timelineSteps = [
    {
      number: '01',
      title: 'Pre-Production',
      subtitle: 'Strategic Foundation',
      description: 'Brand audit, market research, competitive analysis, target audience profiling. Setting the stage with data-driven insights.',
      icon: Lightbulb,
      deliverables: ['Brand Strategy', 'Market Research', 'Creative Brief', 'Media Plan'],
    },
    {
      number: '02',
      title: 'Concept Development',
      subtitle: 'Creative Ideation',
      description: 'Big idea generation, narrative architecture, visual language development. Where strategy meets creativity.',
      icon: Film,
      deliverables: ['Campaign Concept', 'Storyboards', 'Mood Boards', 'Copy Platform'],
    },
    {
      number: '03',
      title: 'Production',
      subtitle: 'Flawless Execution',
      description: 'Film production, photography, design, animation. Every asset crafted to cinematic standards by master craftspeople.',
      icon: Camera,
      deliverables: ['Brand Films', 'Photography', 'Design Assets', 'Digital Creative'],
    },
    {
      number: '04',
      title: 'Post-Production',
      subtitle: 'Refinement & Polish',
      description: 'Editing, color grading, VFX, sound design, final revisions. Obsessive attention to every frame, every detail.',
      icon: Palette,
      deliverables: ['Final Edits', 'Color Grade', 'VFX', 'Sound Mix'],
    },
    {
      number: '05',
      title: 'Campaign Launch',
      subtitle: 'Orchestrated Rollout',
      description: 'Multi-channel deployment across ATL, BTL, TTL touchpoints. Coordinated launch for maximum impact.',
      icon: Rocket,
      deliverables: ['Media Placement', 'Social Rollout', 'Event Activation', 'PR Campaign'],
    },
    {
      number: '06',
      title: 'Optimization',
      subtitle: 'Continuous Improvement',
      description: 'Real-time monitoring, A/B testing, performance analysis, iterative refinement. Data-driven optimization throughout.',
      icon: TrendingUp,
      deliverables: ['Analytics', 'Testing', 'Insights', 'Adjustments'],
    },
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Film className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR PROCESS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            FROM BRIEF TO BRILLIANCE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Like a film production pipeline, our process is methodical, collaborative, 
            and focused on delivering <strong className="text-black">award-worthy results</strong>.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black via-gray-300 to-transparent" />

          {/* Timeline Steps */}
          <div className="space-y-12">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                      {/* Outer Ring */}
                      <div className="w-16 h-16 rounded-full border-4 border-white bg-black flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center">
                        <span className="font-antonio font-bold text-xs text-black">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-16' : 'md:pl-16'} pl-20 md:pl-0 pr-4 md:pr-0`}>
                    <div className="glass-card card-compact-md hover:glass-shine transition-all duration-500 group">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="badge-glass inline-flex mb-3 px-3 py-1">
                          <span className="text-xs font-semibold text-black">{step.subtitle}</span>
                        </div>
                        <h3 className="heading-sm text-lg mb-2">{step.title}</h3>
                        <p className="body-sm text-muted leading-relaxed">{step.description}</p>
                      </div>

                      {/* Deliverables */}
                      <div className="pt-4 border-t border-gray-200/50">
                        <p className="body-xs font-semibold text-black mb-2">Key Deliverables:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((item) => (
                            <span
                              key={item}
                              className="badge-glass px-2 py-1 text-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  PortfolioMasonrySection,
  FilmProductionBentoSection,
  IconMethodologiesSection,
  CinematicTimelineSection,
};