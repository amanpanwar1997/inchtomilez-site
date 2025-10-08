import { motion } from 'motion/react';
import { ColorfulIcon } from './ColorfulIcon';
import { AnimatedHeading } from './AnimatedHeading';
import { ScrollReveal } from './ScrollReveal';
import { InnovativeCard } from './InnovativeCard';
import { 
  Rocket, Zap, Star, Heart, TrendingUp, Award,
  Target, Sparkles, Shield, Crown, Flame, Gift
} from 'lucide-react';

export function UIShowcase() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Animated Headings Section */}
        <ScrollReveal animation="fade">
          <section className="text-center space-y-8">
            <AnimatedHeading as="h1" animation="shimmer" className="heading-xl">
              Animated Headings Showcase
            </AnimatedHeading>
            
            <AnimatedHeading as="h2" animation="gradient-sweep" className="heading-lg">
              Gradient Sweep Effect
            </AnimatedHeading>
            
            <AnimatedHeading as="h3" animation="fade-scale" className="heading-md">
              Fade & Scale Animation
            </AnimatedHeading>
          </section>
        </ScrollReveal>

        {/* Colorful Icons Section */}
        <ScrollReveal animation="zoom">
          <section>
            <AnimatedHeading as="h2" animation="shimmer" className="heading-lg text-center mb-12">
              Colorful Animated Icons
            </AnimatedHeading>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <ColorfulIcon 
                icon={Rocket} 
                color="blue" 
                animation="bounce" 
                size={48}
                containerGradient
                className="p-6 hover-lift-md"
              />
              <ColorfulIcon 
                icon={Zap} 
                color="yellow" 
                animation="pulse-glow" 
                size={48}
                containerGradient
                className="p-6 hover-lift-md"
              />
              <ColorfulIcon 
                icon={Star} 
                color="purple" 
                animation="rotate-y" 
                size={48}
                containerGradient
                className="p-6 hover-lift-md"
              />
              <ColorfulIcon 
                icon={Heart} 
                color="red" 
                animation="heartbeat" 
                size={48}
                containerGradient
                className="p-6 hover-lift-md"
              />
              <ColorfulIcon 
                icon={TrendingUp} 
                color="green" 
                animation="float" 
                size={48}
                containerGradient
                className="p-6 hover-lift-md"
              />
              <ColorfulIcon 
                icon={Award} 
                color="orange" 
                animation="swing" 
                size={48}
                containerGradient
                className="p-6 hover-lift-md"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Icon Grid with Stagger */}
        <ScrollReveal animation="stagger">
          <section>
            <AnimatedHeading as="h2" animation="gradient-sweep" className="heading-lg text-center mb-12">
              Staggered Icon Animation
            </AnimatedHeading>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {[
                { icon: Target, color: 'cyan' as const },
                { icon: Sparkles, color: 'pink' as const },
                { icon: Shield, color: 'indigo' as const },
                { icon: Crown, color: 'amber' as const },
                { icon: Flame, color: 'rose' as const },
                { icon: Gift, color: 'emerald' as const }
              ].map((item, index) => (
                <ColorfulIcon
                  key={index}
                  icon={item.icon}
                  color={item.color}
                  animation="jump"
                  hoverAnimation="bounce"
                  size={40}
                  stagger={index + 1}
                  className="glass-premium p-6 rounded-xl hover-lift-md"
                />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Interactive Cards Section */}
        <ScrollReveal animation="fade">
          <section>
            <AnimatedHeading as="h2" animation="shimmer" className="heading-lg text-center mb-12">
              Innovative Interactive Cards
            </AnimatedHeading>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* 3D Tilt Card */}
              <InnovativeCard effect="3d-tilt" className="p-8 hover-lift-md">
                <ColorfulIcon icon={Rocket} color="blue" animation="float" size={48} className="mb-4" />
                <h3 className="heading-md mb-3">3D Tilt Effect</h3>
                <p className="body-md">Hover to see the 3D tilt transformation</p>
              </InnovativeCard>

              {/* Magnetic Card */}
              <InnovativeCard effect="magnetic" className="p-8 hover-lift-md">
                <ColorfulIcon icon={Zap} color="yellow" animation="pulse-glow" size={48} className="mb-4" />
                <h3 className="heading-md mb-3">Magnetic Hover</h3>
                <p className="body-md">Card follows your cursor movement</p>
              </InnovativeCard>

              {/* Glow Border Card */}
              <InnovativeCard effect="glow-border" className="p-8 hover-lift-md">
                <ColorfulIcon icon={Star} color="purple" animation="rotate-y" size={48} className="mb-4" />
                <h3 className="heading-md mb-3">Rainbow Glow</h3>
                <p className="body-md">Animated rainbow border on hover</p>
              </InnovativeCard>
            </div>
          </section>
        </ScrollReveal>

        {/* Flip Cards */}
        <ScrollReveal animation="slide-left">
          <section>
            <AnimatedHeading as="h2" animation="gradient-sweep" className="heading-lg text-center mb-12">
              Flip Cards on Hover
            </AnimatedHeading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InnovativeCard 
                effect="flip"
                flipContent={
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ColorfulIcon icon={Heart} color="red" size={64} className="mb-4" />
                    <h4 className="heading-sm mb-2 text-white">Back Side</h4>
                    <p className="body-sm text-gray-300">Hidden content revealed!</p>
                  </div>
                }
                className="h-64"
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ColorfulIcon icon={Rocket} color="blue" animation="bounce" size={64} className="mb-4" />
                  <h4 className="heading-sm mb-2">Front Side</h4>
                  <p className="body-sm text-gray-600">Hover to flip</p>
                </div>
              </InnovativeCard>

              <InnovativeCard 
                effect="flip"
                flipContent={
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ColorfulIcon icon={Award} color="orange" size={64} className="mb-4" />
                    <h4 className="heading-sm mb-2 text-white">Achievement</h4>
                    <p className="body-sm text-gray-300">Unlocked!</p>
                  </div>
                }
                className="h-64"
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ColorfulIcon icon={Star} color="yellow" animation="pulse-glow" size={64} className="mb-4" />
                  <h4 className="heading-sm mb-2">Discover</h4>
                  <p className="body-sm text-gray-600">Flip to reveal</p>
                </div>
              </InnovativeCard>

              <InnovativeCard 
                effect="flip"
                flipContent={
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ColorfulIcon icon={Crown} color="purple" size={64} className="mb-4" />
                    <h4 className="heading-sm mb-2 text-white">Premium</h4>
                    <p className="body-sm text-gray-300">Exclusive content</p>
                  </div>
                }
                className="h-64"
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ColorfulIcon icon={Shield} color="indigo" animation="swing" size={64} className="mb-4" />
                  <h4 className="heading-sm mb-2">Protected</h4>
                  <p className="body-sm text-gray-600">Hover to unlock</p>
                </div>
              </InnovativeCard>
            </div>
          </section>
        </ScrollReveal>

        {/* Particles Card */}
        <ScrollReveal animation="zoom">
          <section>
            <AnimatedHeading as="h2" animation="shimmer" className="heading-lg text-center mb-12">
              Special Effects Cards
            </AnimatedHeading>
            
            <div className="grid md:grid-cols-2 gap-8">
              <InnovativeCard effect="particles" className="p-12 hover-lift-md text-center">
                <ColorfulIcon icon={Sparkles} color="rainbow" animation="glow-pulse" size={64} className="mb-6 mx-auto" />
                <h3 className="heading-md mb-4">Particle Effect</h3>
                <p className="body-md">Animated particles on hover</p>
              </InnovativeCard>

              <InnovativeCard effect="expand" className="p-12 hover-lift-md text-center">
                <ColorfulIcon icon={TrendingUp} color="green" animation="float" size={64} className="mb-6 mx-auto" />
                <h3 className="heading-md mb-4">Expand Effect</h3>
                <p className="body-md">Card expands on hover</p>
              </InnovativeCard>
            </div>
          </section>
        </ScrollReveal>

        {/* Scroll Animations Demo */}
        <section className="space-y-12">
          <AnimatedHeading as="h2" animation="gradient-sweep" className="heading-lg text-center">
            Scroll-Based Animations
          </AnimatedHeading>
          
          <ScrollReveal animation="slide-left">
            <div className="glass-premium p-8 rounded-xl hover-lift-md">
              <ColorfulIcon icon={Flame} color="orange" animation="wobble" size={48} className="mb-4" />
              <h3 className="heading-md mb-3">Slide from Left</h3>
              <p className="body-md">This card slides in from the left when scrolled into view</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-right">
            <div className="glass-premium p-8 rounded-xl hover-lift-md">
              <ColorfulIcon icon={Gift} color="pink" animation="jump" size={48} className="mb-4" />
              <h3 className="heading-md mb-3">Slide from Right</h3>
              <p className="body-md">This card slides in from the right when scrolled into view</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom">
            <div className="glass-premium p-8 rounded-xl hover-lift-md text-center">
              <ColorfulIcon icon={Crown} color="purple" animation="rotate-y" size={48} className="mb-4 mx-auto" />
              <h3 className="heading-md mb-3">Zoom In</h3>
              <p className="body-md">This card zooms in when scrolled into view</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="rotate">
            <div className="glass-premium p-8 rounded-xl hover-lift-md text-center">
              <ColorfulIcon icon={Shield} color="cyan" animation="swing" size={48} className="mb-4 mx-auto" />
              <h3 className="heading-md mb-3">Rotate In</h3>
              <p className="body-md">This card rotates in when scrolled into view</p>
            </div>
          </ScrollReveal>
        </section>

        {/* Rainbow Icons */}
        <ScrollReveal animation="fade">
          <section className="text-center">
            <AnimatedHeading as="h2" animation="shimmer" className="heading-lg mb-12">
              Rainbow Gradient Icons
            </AnimatedHeading>
            
            <div className="flex justify-center gap-8 flex-wrap">
              <ColorfulIcon icon={Star} color="rainbow" animation="pulse-glow" size={64} />
              <ColorfulIcon icon={Heart} color="rainbow" animation="heartbeat" size={64} />
              <ColorfulIcon icon={Crown} color="rainbow" animation="rotate-y" size={64} />
              <ColorfulIcon icon={Sparkles} color="rainbow" animation="glow-pulse" size={64} />
            </div>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
