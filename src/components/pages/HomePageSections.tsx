import { motion } from 'motion/react';
import {
  Zap, TrendingUp, Users, Star, Code, Search, Globe, MapPin, Mail, Phone,
  Award, Shield, Lightbulb, Target, CheckCircle2, ArrowRight, Quote, Trophy, Briefcase
} from 'lucide-react';
import { AnimatedIcon } from '../AnimatedIcon';
import { ProgressBar } from '../ProgressBar';

// 8. INDUSTRIES SERVED SECTION - COMPACT
export function IndustriesSection() {
  const industries = [
    'E-Commerce', 'Fintech', 'Real Estate', 'Healthcare', 'Manufacturing',
    'SaaS', 'B2B', 'Automotive', 'Education', 'Hospitality',
    'FMCG', 'Energy', 'Media', 'Telecom', 'Startups',
    'Luxury Brands', 'Fashion', 'Travel', 'Sports', 'Legal',
    'Financial', 'IT & Software', 'Food & Beverage', 'Home Services', 'Non-Profits',
    'Consulting', 'Logistics', 'Pharmaceutical', 'AgriTech', 'Wellness',
    'Gaming', 'Government', 'Retail', 'YOUR INDUSTRY'
  ];

  return (
    <section className="section-compact-md">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-shine">
            INDUSTRIES WE SERVE
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            Cross-industry expertise with proven strategies that drive results across diverse sectors.
          </p>
        </motion.div>

        <div className="glass-premium card-compact-md rounded-2xl hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                className="bg-[#1a1a1a] text-white px-3 py-2 text-center body-sm font-medium hover:bg-[#000000] hover:scale-105 transition-all duration-300 cursor-default shadow-award btn-ripple hover-glow-white"
                style={{ borderRadius: '10px' }}
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 9. GMB SECTION - COMPACT
export function GMBSection() {
  return (
    <section className="section-compact-md bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="badge-glass mb-4 hover-glow-white animate-pulse-glow">
              <motion.div 
                className="w-2 h-2 rounded-full bg-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="subheading text-xs">LOCAL EXCELLENCE</span>
            </div>

            <h2 className="heading-lg mb-4 text-gradient-bw">
              ELEVATE YOUR LOCAL PRESENCE
            </h2>

            <p className="body-md mb-6">
              Local search is your digital storefront. We optimize your Google Business Profile 
              to maximize visibility, drive foot traffic, and convert searches into customers.
            </p>

            <div className="space-y-4">
              <ProgressBar label="Local Search Visibility" value={95} color="green" delay={0} />
              <ProgressBar label="Review Acquisition Rate" value={89} color="yellow" delay={0.1} />
              <ProgressBar label="Map Pack Rankings" value={92} color="black" delay={0.2} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-premium card-compact-md rounded-2xl hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up"
          >
            <div className="space-y-5">
              {[
                { icon: Search, title: 'Profile Optimization', desc: 'Complete business profile enhancement for maximum impact' },
                { icon: Star, title: 'Review Management', desc: 'Strategic reputation building and 5-star acquisition' },
                { icon: MapPin, title: 'Geo-Targeting', desc: 'Hyper-local visibility in your key market areas' },
                { icon: TrendingUp, title: 'Analytics & Insights', desc: 'Real-time performance tracking and optimization' }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="icon-container-glass w-11 h-11 p-2.5 flex-shrink-0 hover-scale-md">
                    <item.icon className="w-full h-full text-black icon-interactive icon-pulse" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="heading-sm text-sm mb-1">{item.title}</h4>
                    <p className="body-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 10. WEBSITE DEVELOPMENT SECTION - COMPACT
export function WebsitesSection() {
  return (
    <section className="section-compact-md">
      <div className="container-award">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-premium card-compact-md rounded-2xl order-2 lg:order-1 hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up"
          >
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '99.9%', label: 'Uptime', icon: Shield },
                { value: '<2s', label: 'Load Time', icon: Zap },
                { value: '256-bit', label: 'Encryption', icon: Shield },
                { value: '100%', label: 'Responsive', icon: Code }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="icon-container-glass w-12 h-12 p-3 mx-auto mb-3 hover-scale-lg">
                    <stat.icon className="w-full h-full text-black icon-interactive icon-float" strokeWidth={2} />
                  </div>
                  <div className="heading-md text-xl mb-1">{stat.value}</div>
                  <div className="body-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="badge-glass mb-4 hover-glow-white animate-pulse-glow">
              <motion.div 
                className="w-2 h-2 rounded-full bg-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <span className="subheading text-xs">DIGITAL EXCELLENCE</span>
            </div>

            <h2 className="heading-lg mb-4 text-gradient-shine">
              BUILD YOUR DIGITAL FOUNDATION
            </h2>

            <p className="body-md mb-6">
              We craft beautiful, high-performance websites that convert visitors into customers. 
              Every pixel is purposeful, every interaction is optimized for your business goals.
            </p>

            <div className="space-y-2">
              {[
                'Lightning-fast load times (<2 seconds)',
                'Enterprise-grade security architecture',
                'Conversion Rate Optimization (CRO)',
                'Scalable cloud infrastructure',
                'Mobile-first responsive design'
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 icon-interactive" strokeWidth={2.5} />
                  <span className="body-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 11. CAMPAIGNS SECTION - COMPACT
export function CampaignsSection() {
  return (
    <section className="section-compact-md bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-bw">
            CAMPAIGNS THAT CONVERT
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            Strategic campaigns with one objective: Maximum visibility, optimal ROI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'SEARCH EXCELLENCE', platforms: ['Google Ads', 'Bing Ads', 'SEO'], roi: '987%' },
            { title: 'SOCIAL MASTERY', platforms: ['Facebook', 'Instagram', 'LinkedIn'], roi: '764%' },
            { title: 'DISPLAY IMPACT', platforms: ['GDN', 'Programmatic', 'Retargeting'], roi: '632%' }
          ].map((campaign, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-premium card-compact-md rounded-2xl text-center group hover-lift-lg hover-glow-white hover-scale-sm shadow-dramatic border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}
            >
              <h3 className="heading-sm text-base mb-4">{campaign.title}</h3>
              
              <div className="space-y-2 mb-5">
                {campaign.platforms.map((platform, idx) => (
                  <div key={idx} className="glass-subtle px-3 py-1.5 rounded-lg body-xs">
                    {platform}
                  </div>
                ))}
              </div>

              <div className="heading-xl text-3xl mb-2">
                {campaign.roi}
              </div>
              <div className="body-sm text-muted">Average ROI</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 12. TESTIMONIALS SECTION - COMPACT
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "InchToMilez didn't just market our product—they made us a household name. The ROI exceeded all expectations. Best decision we ever made.",
      author: "Rajesh Kumar",
      position: "CEO, TechVision India"
    },
    {
      quote: "Finally, a marketing agency that truly understands growth. They delivered bold strategies, creative brilliance, and results that transformed our business.",
      author: "Priya Sharma",
      position: "Founder, StyleHub Fashion"
    },
    {
      quote: "The transformation was incredible. From struggling to leading our market segment in just 6 months. They're not a vendor, they're a true growth partner.",
      author: "Amit Patel",
      position: "Director, GreenTech Solutions"
    }
  ];

  return (
    <section className="section-compact-md">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-shine">
            CLIENT SUCCESS STORIES
          </h2>
          <p className="body-md text-muted">Real results from real partnerships</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-premium card-compact-md rounded-2xl relative hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}
            >
              <Quote className="w-8 h-8 text-black opacity-20 absolute top-4 right-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>

              <p className="body-md mb-5 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-gray-200 pt-4">
                <div className="heading-sm text-sm">{testimonial.author}</div>
                <div className="body-xs text-muted">{testimonial.position}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 13. EXPERTISE SECTION - COMPACT
export function ExpertiseSection() {
  const expertise = [
    {
      icon: Target,
      title: 'Conversion Rate Optimization',
      description: 'Data-driven testing to transform visitors into loyal customers.',
      progress: 94
    },
    {
      icon: TrendingUp,
      title: 'Growth Marketing',
      description: 'Strategic funnels engineered for sustainable, exponential growth.',
      progress: 91
    },
    {
      icon: Globe,
      title: 'Market Intelligence',
      description: 'Deep competitive analysis to identify untapped opportunities.',
      progress: 88
    },
    {
      icon: Lightbulb,
      title: 'Personalized Content',
      description: 'Right message, right audience, perfect timing for maximum impact.',
      progress: 93
    }
  ];

  return (
    <section className="section-compact-md bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-bw">
            OUR STRATEGIC ADVANTAGE
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            Specialized expertise in high-impact growth strategies that deliver measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-premium card-compact-md rounded-2xl hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="icon-container-glass w-13 h-13 p-3 flex-shrink-0 hover-scale-lg">
                  <item.icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="heading-sm text-base mb-2">{item.title}</h3>
                  <p className="body-sm mb-4">{item.description}</p>
                </div>
              </div>
              <ProgressBar 
                label="Expertise Level" 
                value={item.progress} 
                color="green"
                showPercentage={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 14. TEAM SECTION - COMPACT
export function TeamSection() {
  return (
    <section className="section-compact-md">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-shine">
            MEET THE DREAM TEAM
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            A collective of marketing strategists, creative visionaries, and data scientists dedicated to your success.
          </p>
        </motion.div>

        <div className="glass-premium card-compact-lg rounded-2xl hover-lift-md hover-glow-white shadow-dramatic border-gradient-subtle animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { icon: Users, label: 'Team Size', value: '50+' },
              { icon: Award, label: 'Awards Won', value: '23' },
              { icon: Target, label: 'Specializations', value: '15+' },
              { icon: Trophy, label: 'Years Combined', value: '500+' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="icon-container-glass w-14 h-14 p-3.5 mx-auto mb-3 hover-scale-lg">
                  <stat.icon className="w-full h-full text-black icon-interactive icon-float" strokeWidth={2} />
                </div>
                <div className="heading-md text-2xl mb-1">{stat.value}</div>
                <div className="body-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center border-t border-gray-200 pt-6">
            <div className="heading-sm text-base mb-2">
              AWARD-WINNING TEAM. SEAMLESS COLLABORATION. EXCEPTIONAL RESULTS.
            </div>
            <p className="body-md text-muted max-w-2xl mx-auto">
              Each team member brings specialized expertise and unwavering commitment to your success and growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 15. RECRUITMENT SECTION - COMPACT
export function RecruitmentSection() {
  return (
    <section className="section-compact-md bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-bw">
            JOIN OUR TALENTED TEAM
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            We're looking for passionate individuals who thrive on creativity, innovation, and delivering exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-premium card-compact-md group hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle cursor-pointer animate-fade-in-up stagger-delay-1"
          >
            <div className="icon-container-glass w-14 h-14 p-3.5 mb-4 hover-scale-lg">
              <Users className="w-full h-full text-black icon-interactive icon-pulse" strokeWidth={2} />
            </div>

            <h3 className="heading-sm text-lg mb-2">FULL-TIME POSITIONS</h3>
            <div className="subheading text-xs mb-4">Join Our Core Team</div>
            
            <p className="body-md mb-5">
              Looking for talented professionals ready for exciting challenges. We offer competitive 
              compensation, growth opportunities, and a culture where excellence thrives.
            </p>

            <button className="btn-award w-full btn-enhanced btn-ripple hover-scale-sm">
              EXPLORE CAREERS
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-premium card-compact-md group hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle cursor-pointer animate-fade-in-up stagger-delay-2"
          >
            <div className="icon-container-glass w-14 h-14 p-3.5 mb-4 hover-scale-lg">
              <Briefcase className="w-full h-full text-black icon-interactive icon-pulse" strokeWidth={2} />
            </div>

            <h3 className="heading-sm text-lg mb-2">FREELANCE OPPORTUNITIES</h3>
            <div className="subheading text-xs mb-4">Project-Based Collaboration</div>
            
            <p className="body-md mb-5">
              We partner with specialist freelancers for targeted projects. Bring your expertise 
              and proven track record. We value quality and reward excellence.
            </p>

            <button className="btn-award w-full btn-enhanced btn-ripple hover-scale-sm">
              VIEW PROJECTS
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 16. FAQ WRAPPER - COMPACT
export function FAQSectionWrapper() {
  const faqs = [
    {
      question: "What makes InchToMilez different from other agencies?",
      answer: "We're results-driven growth partners, not just service providers. Our commitment to data-driven strategies, creative excellence, and transparent communication sets us apart. With a 96% success rate and 30+ years of experience, we deliver measurable results."
    },
    {
      question: "Can you guarantee results?",
      answer: "Our 96% success rate speaks for itself. While marketing results depend on various factors, we guarantee strategic excellence, transparent reporting, and relentless optimization designed to achieve your goals."
    },
    {
      question: "How quickly can you deliver results?",
      answer: "Every campaign is unique, but we're known for rapid execution. Many clients see significant improvements within the first 90 days, with our 48-hour asset turnaround ensuring you stay ahead of the competition."
    },
    {
      question: "What's your pricing and contract policy?",
      answer: "We offer flexible engagement models tailored to your needs. Our pricing is transparent and performance-oriented. We earn your business through results, not lengthy contracts."
    }
  ];

  return (
    <section className="section-compact-md">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-shine">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="body-md text-muted">Clear answers to your important questions</p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`glass-premium card-compact-md rounded-xl hover-lift-sm hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
            >
              <h3 className="heading-sm text-base mb-3">{faq.question}</h3>
              <p className="body-md">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 17. CONTACT SECTION - COMPACT
export function ContactSection() {
  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg mb-3 text-gradient-bw">
            START YOUR GROWTH JOURNEY TODAY
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            Free Strategy Session. No Commitments. 100% Results-Focused.<br />
            Let's transform your brand into a market leader. <strong>Your success story starts here.</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-premium card-compact-lg rounded-2xl hover-lift-md hover-glow-white shadow-dramatic border-gradient-subtle animate-fade-in-up"
        >
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block body-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 glass-input rounded-lg focus:outline-none focus-ring-elegant body-md"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 glass-input rounded-lg focus:outline-none focus-ring-elegant body-md"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <label className="block body-sm font-semibold mb-2">
                Primary Goal
              </label>
              <select className="w-full px-4 py-2.5 glass-input rounded-lg focus:outline-none focus-ring-elegant body-md">
                <option>Brand Awareness</option>
                <option>Lead Generation</option>
                <option>Revenue Growth</option>
                <option>Market Leadership</option>
                <option>Digital Transformation</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block body-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 glass-input rounded-lg focus:outline-none focus-ring-elegant body-md"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block body-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 glass-input rounded-lg focus:outline-none focus-ring-elegant body-md"
                  placeholder="email@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block body-sm font-semibold mb-2">
                Your Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 glass-input rounded-lg focus:outline-none focus-ring-elegant body-md"
                placeholder="Tell us about your goals and challenges..."
              />
            </div>

            <button
              type="submit"
              className="btn-award w-full group btn-enhanced btn-ripple hover-scale-sm"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="w-4 h-4 icon-interactive group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </form>
        </motion.div>

        {/* Contact Info - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[
            { icon: Mail, label: 'Email Us', value: 'Inchtomilez@gmail.com' },
            { icon: Phone, label: 'Call Us', value: '+91 XXXXX XXXXX' },
            { icon: MapPin, label: 'Visit Us', value: 'Indore, India' }
          ].map((contact, index) => (
            <motion.div 
              key={index} 
              className={`glass-premium card-compact text-center hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="icon-container-glass w-11 h-11 p-2.5 mx-auto mb-3 hover-scale-lg">
                <contact.icon className="w-full h-full text-black icon-interactive icon-pulse" strokeWidth={2} />
              </div>
              <div className="heading-sm text-sm mb-1">{contact.label}</div>
              <div className="body-sm">{contact.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}