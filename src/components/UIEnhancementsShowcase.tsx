import { motion } from 'motion/react';
import { useState } from 'react';
import { Star, TrendingUp, Award, Zap, Heart, CheckCircle } from 'lucide-react';
import { PremiumCard, ExpandableCard } from './PremiumCard';
import { MicroButton, MicroCheckbox, MicroInput } from './MicroInteractions';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { InteractiveStats } from './InteractiveStats';

export function UIEnhancementsShowcase() {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = () => {
    if (!inputValue) {
      setInputError('This field is required');
    } else {
      setInputError('');
      alert(`Submitted: ${inputValue}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container-award space-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="heading-xl mb-4">UI/UX Enhancements Showcase</h1>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Experience India's best website design with premium micro-interactions, 
            sophisticated animations, and delightful user experiences.
          </p>
        </motion.div>

        {/* Premium Cards Section */}
        <section>
          <h2 className="heading-lg mb-8 text-center">Premium Card Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <PremiumCard variant="default" className="p-6">
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 icon-color-yellow icon-float" />
              </div>
              <h3 className="heading-md mb-2">Default Card</h3>
              <p className="body-sm text-gray-600">
                Smooth hover lift with glass morphism and elegant shadows.
              </p>
            </PremiumCard>

            {/* 3D Tilt Card */}
            <PremiumCard variant="3d-tilt" className="p-6">
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 icon-color-blue icon-bounce" />
              </div>
              <h3 className="heading-md mb-2">3D Tilt Card</h3>
              <p className="body-sm text-gray-600">
                Follows your mouse with subtle 3D perspective effects.
              </p>
            </PremiumCard>

            {/* Magnetic Card */}
            <PremiumCard variant="magnetic" className="p-6">
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 icon-color-orange icon-pulse-glow" />
              </div>
              <h3 className="heading-md mb-2">Magnetic Card</h3>
              <p className="body-sm text-gray-600">
                Magnetically attracted to your cursor for interactive feel.
              </p>
            </PremiumCard>

            {/* Glow Border Card */}
            <PremiumCard variant="glow" className="p-6">
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 icon-color-purple icon-rainbow-gradient" />
              </div>
              <h3 className="heading-md mb-2">Glow Card</h3>
              <p className="body-sm text-gray-600">
                Animated rainbow gradient border on hover for premium feel.
              </p>
            </PremiumCard>

            {/* Expandable Card */}
            <ExpandableCard
              title="Expandable Card"
              preview={
                <p className="body-sm text-gray-600">
                  Click to expand and see more content...
                </p>
              }
              expanded={
                <div className="space-y-3">
                  <p className="body-sm text-gray-600">
                    This card smoothly expands to reveal additional information. 
                    Perfect for FAQs, service details, or any content that benefits 
                    from progressive disclosure.
                  </p>
                  <ul className="space-y-2">
                    <li className="body-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 icon-color-green" />
                      Smooth layout animations
                    </li>
                    <li className="body-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 icon-color-green" />
                      Better information hierarchy
                    </li>
                    <li className="body-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 icon-color-green" />
                      Mobile-friendly design
                    </li>
                  </ul>
                </div>
              }
            />
          </div>
        </section>

        {/* Micro-Interactions Section */}
        <section className="glass-card p-8">
          <h2 className="heading-lg mb-8 text-center">Micro-Interactions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div>
              <h3 className="heading-sm mb-4">Interactive Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <MicroButton variant="primary">
                  Primary Button
                </MicroButton>
                <MicroButton variant="outline">
                  Outline Button
                </MicroButton>
                <MicroButton 
                  variant="primary" 
                  size="lg"
                  icon={<Heart className="w-4 h-4" />}
                >
                  With Icon
                </MicroButton>
              </div>
            </div>

            {/* Checkbox */}
            <div>
              <h3 className="heading-sm mb-4">Animated Checkbox</h3>
              <div className="space-y-3">
                <MicroCheckbox
                  checked={checked}
                  onChange={setChecked}
                  label="Smooth checkmark animation"
                />
                <MicroCheckbox
                  checked={!checked}
                  onChange={(val) => setChecked(!val)}
                  label="Animated background fill"
                />
              </div>
            </div>

            {/* Input */}
            <div className="md:col-span-2">
              <h3 className="heading-sm mb-4">Smart Form Input</h3>
              <div className="space-y-4">
                <MicroInput
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="Type something and submit..."
                  error={inputError}
                  icon={<Star className="w-4 h-4" />}
                />
                <MicroButton onClick={handleSubmit}>
                  Submit Form
                </MicroButton>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Slider */}
        <section>
          <h2 className="heading-lg mb-8 text-center">Before/After Comparison</h2>
          <p className="body-md text-gray-600 text-center mb-8">
            Interactive slider to showcase transformations
          </p>
          
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"
            afterImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
            beforeLabel="Old Design"
            afterLabel="New Design"
          />
        </section>

        {/* Animated Icons Grid */}
        <section className="glass-card p-8">
          <h2 className="heading-lg mb-8 text-center">Colorful Animated Icons</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { icon: Star, color: 'icon-color-yellow', anim: 'icon-float' },
              { icon: TrendingUp, color: 'icon-color-blue', anim: 'icon-bounce' },
              { icon: Award, color: 'icon-color-purple', anim: 'icon-pulse-glow' },
              { icon: Zap, color: 'icon-color-orange', anim: 'icon-wobble' },
              { icon: Heart, color: 'icon-color-pink', anim: 'icon-heartbeat' },
              { icon: CheckCircle, color: 'icon-color-green', anim: 'icon-jump' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="icon-container-glass flex flex-col items-center justify-center p-6 hover-lift-md"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className={`w-8 h-8 ${item.color} ${item.anim}`} />
                <p className="body-xs mt-2 text-gray-600 text-center">{item.anim}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Stats */}
        <InteractiveStats />

        {/* Gradient Text & Headings */}
        <section className="glass-card p-8">
          <h2 className="heading-lg mb-8 text-center">Animated Headings</h2>
          
          <div className="space-y-6 text-center">
            <h3 className="heading-shimmer heading-md">
              Shimmer Effect Heading
            </h3>
            
            <h3 className="heading-gradient-sweep heading-md">
              Gradient Sweep Heading
            </h3>
            
            <motion.h3
              className="heading-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Fade-In Animated Heading
            </motion.h3>
          </div>
        </section>

        {/* Scroll Effects Notice */}
        <motion.div
          className="glass-premium p-8 text-center"
          style={{ background: 'rgba(255, 255, 255, 0.95)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="heading-md mb-4">✨ More Enhancements Added</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 icon-color-green" />
              </div>
              <p className="body-sm font-semibold mb-1">Floating Action Buttons</p>
              <p className="body-xs text-gray-600">Mobile-optimized quick actions</p>
            </div>
            <div>
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 icon-color-blue" />
              </div>
              <p className="body-sm font-semibold mb-1">Live Notifications</p>
              <p className="body-xs text-gray-600">Real-time social proof popups</p>
            </div>
            <div>
              <div className="icon-container-glass w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 icon-color-purple" />
              </div>
              <p className="body-sm font-semibold mb-1">Scroll Indicators</p>
              <p className="body-xs text-gray-600">Progress bar & back to top</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
