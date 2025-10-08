import { motion } from 'motion/react';
import { useState } from 'react';
import { PremiumForm } from './PremiumForm';
import { PremiumButton } from './PremiumButton';
import { ParticleHover } from './ParticleHover';
import { useToast } from './AdvancedToast';
import { ConfettiEffect } from './ConfettiEffect';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { InteractiveStats } from './InteractiveStats';
import { ROICalculator } from './ROICalculator';
import { 
  TrendingUp, 
  Award, 
  Zap, 
  Star, 
  ArrowRight,
  CheckCircle,
  Sparkles 
} from 'lucide-react';

export function EliteShowcasePage() {
  const { showToast } = useToast();
  const [confetti, setConfetti] = useState(false);

  const handleCelebrate = () => {
    setConfetti(true);
    showToast({
      type: 'success',
      title: 'Celebration!',
      message: 'Look at that beautiful confetti! 🎉'
    });
  };

  return (
    <div className="min-h-screen">
      <ConfettiEffect trigger={confetti} onComplete={() => setConfetti(false)} />

      {/* Hero Section */}
      <section className="section-compact-lg glass-section-light">
        <div className="container-award text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl mb-6">Elite Design Showcase</h1>
            <p className="body-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Experience India's best website design with world-class micro-interactions,
              premium animations, and delightful user experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <PremiumButton 
                variant="gradient" 
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get Started Now
              </PremiumButton>
              
              <PremiumButton 
                variant="outline" 
                size="lg"
                onClick={handleCelebrate}
                icon={<Sparkles className="w-5 h-5" />}
              >
                Celebrate! 🎊
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Button Showcase */}
      <section className="section-compact-lg">
        <div className="container-award">
          <h2 className="heading-lg mb-8 text-center">Premium Buttons</h2>
          
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="body-sm font-medium mb-3">Primary Variant</p>
                <PremiumButton variant="primary" size="md">
                  Click Me
                </PremiumButton>
              </div>

              <div>
                <p className="body-sm font-medium mb-3">Outline Variant</p>
                <PremiumButton variant="outline" size="md">
                  Click Me
                </PremiumButton>
              </div>

              <div>
                <p className="body-sm font-medium mb-3">Glow Variant</p>
                <PremiumButton variant="glow" size="md">
                  Click Me
                </PremiumButton>
              </div>

              <div>
                <p className="body-sm font-medium mb-3">Gradient Variant</p>
                <PremiumButton variant="gradient" size="md">
                  Click Me
                </PremiumButton>
              </div>
            </div>

            <div className="divider-frosted my-8" />

            <p className="body-sm text-gray-600 text-center">
              Try clicking the buttons to see the <strong>ripple effect</strong>!
              Hover to see the <strong>shimmer animation</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <section className="section-compact-lg glass-section-light">
        <div className="container-award">
          <h2 className="heading-lg mb-8 text-center">Toast Notifications</h2>
          
          <div className="glass-card p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PremiumButton
                variant="primary"
                onClick={() => showToast({
                  type: 'success',
                  title: 'Success!',
                  message: 'Your action completed successfully.',
                  duration: 5000
                })}
              >
                Success
              </PremiumButton>

              <PremiumButton
                variant="primary"
                onClick={() => showToast({
                  type: 'error',
                  title: 'Error',
                  message: 'Something went wrong. Please try again.',
                  duration: 5000
                })}
              >
                Error
              </PremiumButton>

              <PremiumButton
                variant="primary"
                onClick={() => showToast({
                  type: 'warning',
                  title: 'Warning',
                  message: 'Please review before continuing.',
                  duration: 5000
                })}
              >
                Warning
              </PremiumButton>

              <PremiumButton
                variant="primary"
                onClick={() => showToast({
                  type: 'info',
                  title: 'Info',
                  message: 'Here is some helpful information.',
                  duration: 5000
                })}
              >
                Info
              </PremiumButton>
            </div>

            <p className="body-sm text-gray-600 text-center mt-6">
              Click buttons to trigger toast notifications (top-right corner)
            </p>
          </div>
        </div>
      </section>

      {/* Particle Hover Effect */}
      <section className="section-compact-lg">
        <div className="container-award">
          <h2 className="heading-lg mb-8 text-center">Particle Hover Effects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ParticleHover particleCount={25} particleColor="#4285F4">
              <div className="glass-card p-8 hover-lift-md text-center card-equal-height">
                <div className="icon-container-glass w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 icon-color-blue icon-bounce" />
                </div>
                <h3 className="heading-md mb-3">Growth</h3>
                <p className="body-sm text-gray-600">
                  Hover over this card to see magical particle effects
                </p>
              </div>
            </ParticleHover>

            <ParticleHover particleCount={25} particleColor="#9333EA">
              <div className="glass-card p-8 hover-lift-md text-center card-equal-height">
                <div className="icon-container-glass w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 icon-color-purple icon-pulse-glow" />
                </div>
                <h3 className="heading-md mb-3">Excellence</h3>
                <p className="body-sm text-gray-600">
                  Premium interactions that delight users
                </p>
              </div>
            </ParticleHover>

            <ParticleHover particleCount={25} particleColor="#EA4335">
              <div className="glass-card p-8 hover-lift-md text-center card-equal-height">
                <div className="icon-container-glass w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 icon-color-orange icon-wobble" />
                </div>
                <h3 className="heading-md mb-3">Speed</h3>
                <p className="body-sm text-gray-600">
                  Fast, smooth, and buttery animations
                </p>
              </div>
            </ParticleHover>
          </div>

          <p className="body-sm text-gray-600 text-center mt-8">
            <Star className="w-4 h-4 icon-color-yellow inline mr-2" />
            Hover over the cards to see particles emit and rise!
          </p>
        </div>
      </section>

      {/* Interactive Stats */}
      <section className="section-compact-lg glass-section-medium">
        <div className="container-award">
          <h2 className="heading-lg mb-8 text-center">Animated Statistics</h2>
          <InteractiveStats />
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="section-compact-lg">
        <div className="container-award">
          <h2 className="heading-lg mb-8 text-center">Before/After Comparison</h2>
          <p className="body-md text-gray-600 text-center mb-8">
            Drag the slider to compare images
          </p>
          
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200"
            afterImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"
            beforeLabel="Before InchToMilez"
            afterLabel="After InchToMilez"
          />
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section-compact-lg glass-section-light">
        <div className="container-award max-w-3xl">
          <h2 className="heading-lg mb-8 text-center">ROI Calculator</h2>
          <ROICalculator />
        </div>
      </section>

      {/* Premium Form */}
      <section className="section-compact-lg">
        <div className="container-award max-w-2xl">
          <h2 className="heading-lg mb-8 text-center">Premium Contact Form</h2>
          <p className="body-md text-gray-600 text-center mb-8">
            Try submitting with validation errors, then submit correctly to see confetti!
          </p>
          <PremiumForm />
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-compact-lg glass-section-strong">
        <div className="container-award">
          <h2 className="heading-lg mb-12 text-center">What Makes This Elite?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Magnetic Cursor',
                description: 'Smooth spring physics that adapts to interactive elements',
                color: 'icon-color-blue'
              },
              {
                icon: Zap,
                title: 'Premium Buttons',
                description: 'Ripple effects, shimmer animations, 4 stunning variants',
                color: 'icon-color-orange'
              },
              {
                icon: Star,
                title: 'Toast System',
                description: 'Professional notifications with progress bars and icons',
                color: 'icon-color-yellow'
              },
              {
                icon: Sparkles,
                title: 'Confetti Celebrations',
                description: 'Delightful moments that create emotional connections',
                color: 'icon-color-pink'
              },
              {
                icon: Award,
                title: 'Particle Effects',
                description: 'Magical hover interactions that wow your visitors',
                color: 'icon-color-purple'
              },
              {
                icon: CheckCircle,
                title: 'Smart Forms',
                description: 'Real-time validation with smooth error animations',
                color: 'icon-color-green'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 hover-lift-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="icon-container-glass w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className={`w-6 h-6 ${feature.color} icon-float`} />
                </div>
                <h3 className="heading-sm mb-2">{feature.title}</h3>
                <p className="body-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-compact-lg">
        <div className="container-award">
          <div className="glass-premium p-12 text-center" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
            <h2 className="heading-lg mb-4">This is India's Best Website</h2>
            <p className="body-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Every interaction is delightful. Every animation is smooth. Every detail is polished.
              Your business deserves nothing less.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <PremiumButton 
                variant="gradient" 
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Start Your Project
              </PremiumButton>
              
              <PremiumButton 
                variant="outline" 
                size="lg"
              >
                View Portfolio
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
