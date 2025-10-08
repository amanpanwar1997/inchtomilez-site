import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Sparkles, MessageCircle } from 'lucide-react';
import { RevealOnScroll, GlassCard } from './ThemeComponents';
import { Badge } from './ui/badge';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What makes InchToMilez different from other marketing agencies?",
    answer: "We don't do cookie-cutter campaigns. Every strategy is custom-built, data-driven, and designed to make your brand dominate. Plus, we're obsessed with results—not just deliverables. We're your growth partners, not just vendors."
  },
  {
    question: "How quickly can you deliver results?",
    answer: "While some campaigns show traction within 2-4 weeks, real transformation takes 3-6 months. We're transparent: marketing is a marathon, not a sprint. But rest assured, you'll see progress, metrics, and ROI at every stage."
  },
  {
    question: "Do you work with startups or only established brands?",
    answer: "BOTH! We've helped scrappy startups become market leaders and revitalized legacy brands. Whether you're launching or scaling, we bring the strategy, creativity, and execution to WIN."
  },
  {
    question: "What's your pricing structure?",
    answer: "Every brand is unique, so we don't do one-size-fits-all pricing. After understanding your goals, we create a custom package that maximizes ROI. Book a free strategy call and let's talk numbers that make sense for YOU."
  },
  {
    question: "Can you guarantee results?",
    answer: "We guarantee our best effort, strategic excellence, and relentless execution. Marketing has variables (market trends, competition, audience behavior), but our 98% client satisfaction rate and proven track record speak for themselves. We deliver—period."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We've conquered industries from tech and e-commerce to healthcare, real estate, fashion, and more. Our strength? Understanding human psychology and market dynamics—skills that translate across ANY industry."
  },
  {
    question: "What digital marketing services do you offer?",
    answer: "We offer a complete suite: SEO, PPC, social media marketing, content marketing, email campaigns, influencer marketing, branding, web development, video production, and more. Everything you need to dominate the digital space."
  },
  {
    question: "Do you provide monthly reports and analytics?",
    answer: "Absolutely! We provide detailed monthly reports with transparent metrics, insights, and actionable recommendations. You'll always know where your investment is going and what results you're getting."
  },
  {
    question: "How long are your contracts?",
    answer: "We typically work on 3-6 month contracts to ensure meaningful results. However, we're flexible and can discuss shorter-term projects or ongoing partnerships based on your specific needs."
  },
  {
    question: "Do you offer social media management?",
    answer: "Yes! We handle everything from strategy and content creation to posting, engagement, community management, and paid social campaigns across all major platforms—Instagram, Facebook, LinkedIn, Twitter, YouTube, and more."
  },
  {
    question: "Can you help with website design and development?",
    answer: "Absolutely! We build stunning, high-converting websites that are mobile-responsive, SEO-optimized, and designed to turn visitors into customers. From landing pages to full e-commerce platforms, we've got you covered."
  },
  {
    question: "What's your approach to SEO?",
    answer: "Our SEO strategy is white-hat, data-driven, and results-focused. We combine technical SEO, on-page optimization, quality content creation, and authoritative link-building to get you ranking on page 1 of Google."
  },
  {
    question: "Do you handle content creation?",
    answer: "Yes! Our creative team produces blog posts, social media content, video scripts, graphics, infographics, email copy, and more. Every piece is crafted to engage your audience and drive conversions."
  },
  {
    question: "Can you help with branding and brand strategy?",
    answer: "Definitely! We help define your brand identity, positioning, messaging, visual identity, and brand guidelines. Whether you're building from scratch or rebranding, we'll make your brand unforgettable."
  },
  {
    question: "Do you offer paid advertising services (Google Ads, Facebook Ads)?",
    answer: "Yes! We're certified experts in Google Ads, Facebook Ads, Instagram Ads, LinkedIn Ads, and more. We create high-ROI campaigns that target the right audience at the right time with the right message."
  },
  {
    question: "What's the onboarding process like?",
    answer: "Simple! We start with a discovery call, conduct a comprehensive audit, develop a custom strategy, and then kick off execution. You'll have a dedicated account manager guiding you every step of the way."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! While we're based in Indore, India, we work with clients globally. We're experienced in navigating different markets, time zones, and cultural nuances to deliver world-class results."
  },
  {
    question: "What's your refund policy?",
    answer: "We stand by our work. If we don't meet agreed-upon milestones or deliverables, we'll make it right. We believe in earning your business through results, not locking you into unfair contracts."
  },
  {
    question: "Can you help with video marketing and production?",
    answer: "Yes! We create everything from explainer videos and product demos to social media reels, animated graphics, and full commercial productions. Video is king, and we help you rule."
  },
  {
    question: "Do you provide email marketing services?",
    answer: "Absolutely! We design high-converting email campaigns, automated sequences, newsletters, and drip campaigns that nurture leads and drive sales. Email marketing is still one of the highest ROI channels."
  },
  {
    question: "How do you stay updated with digital marketing trends?",
    answer: "Our team is constantly learning through certifications, industry conferences, testing new strategies, and monitoring algorithm updates. We're not just keeping up—we're staying ahead."
  },
  {
    question: "Can you help with influencer marketing campaigns?",
    answer: "Yes! We connect brands with the right influencers, negotiate partnerships, manage campaigns, and track ROI. Influencer marketing is powerful when done right, and we know how to do it right."
  },
  {
    question: "What tools and platforms do you use?",
    answer: "We use industry-leading tools like Google Analytics, SEMrush, Ahrefs, HubSpot, Hootsuite, Canva, Adobe Creative Suite, Facebook Business Manager, and more to deliver exceptional results."
  },
  {
    question: "Do you offer training or consulting services?",
    answer: "Yes! We provide workshops, training sessions, and consulting for businesses that want to build in-house marketing capabilities. We empower you with the knowledge and strategies to succeed."
  },
  {
    question: "How do you measure campaign success?",
    answer: "We track KPIs like traffic, engagement, conversion rates, lead quality, ROI, customer acquisition cost, and lifetime value. Every metric is tied back to your business goals—not vanity numbers."
  },
  {
    question: "Can you help with reputation management?",
    answer: "Absolutely! We monitor your online reputation, respond to reviews, manage crises, and build a positive brand image. Your reputation is everything, and we protect and enhance it."
  },
  {
    question: "Do you provide graphic design services?",
    answer: "Yes! Our designers create logos, brand assets, social media graphics, brochures, packaging, presentations, and more. Every design is crafted to reflect your brand and captivate your audience."
  },
  {
    question: "What's your client communication process?",
    answer: "We believe in transparency and collaboration. You'll have a dedicated account manager, regular check-ins, monthly reports, and open communication via phone, email, or WhatsApp—whatever works best for you."
  },
  {
    question: "Can you help with e-commerce marketing?",
    answer: "Absolutely! We specialize in driving e-commerce sales through product listing optimization, conversion rate optimization, retargeting campaigns, abandoned cart recovery, and influencer partnerships."
  },
  {
    question: "Why should I choose InchToMilez over a freelancer or larger agency?",
    answer: "Freelancers lack resources and consistency. Big agencies treat you like a number. We offer the perfect balance: dedicated attention, expert team, proven processes, and genuine care for your success. We're your secret weapon."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-[#baff00] text-black hover:bg-[#baff00]">
              <Sparkles className="w-4 h-4 mr-2" />
              GOT QUESTIONS? WE'VE GOT ANSWERS
            </Badge>
            <h2 className="heading-lg mb-4">
              Everything You Need to Know
            </h2>
            <p className="body-lg text-gray-700">
              Still curious? We're here to help. No fluff, just straight answers.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <GlassCard className="overflow-hidden" hover={false}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between p-6 text-left group"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="heading-sm text-black group-hover:text-[#baff00] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-[#baff00]" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#baff00] transition-colors" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <motion.p
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          className="text-gray-600 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? Let's talk!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="tel:+919009970709"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:bg-[#baff00] hover:text-black transition-all font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Call Us: +91-9009970709
              </motion.a>
              <motion.a
                href="https://wa.me/919669988666?text=Hi%20InchToMilez!%20I%27d%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp: +91-9669988666
              </motion.a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}