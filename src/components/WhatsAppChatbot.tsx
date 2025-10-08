import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Minimize2, User, Bot, Phone, Mail, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface UserRequirements {
  name?: string;
  businessName?: string;
  industry?: string;
  budget?: string;
  goals?: string;
}

export function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🙏 **Namaste! Welcome to InchToMilez!**\n\nI\'m your AI marketing assistant, here to help you **grow your business** and dominate your market! 🚀\n\n**What can I help you with today?**',
      isBot: true,
      timestamp: new Date(),
      quickReplies: [
        '📊 Our Services',
        '💰 Pricing Plans',
        '🎯 Start a Project',
        '📞 Contact Team',
        '🏆 Success Stories',
        '❓ Ask a Question'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [conversationStage, setConversationStage] = useState<string>('initial');
  const [userRequirements, setUserRequirements] = useState<UserRequirements>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart response system
  const getResponse = (userMessage: string, stage: string): { response: string; quickReplies?: string[]; nextStage?: string } => {
    const lowerMessage = userMessage.toLowerCase();

    // Services
    if (lowerMessage.includes('services') || lowerMessage.includes('📊')) {
      return {
        response: `🚀 **InchToMilez Complete Services:**\n\n✨ **Digital Marketing** - SEO, SEM, Social Media, PPC\n🎨 **Branding & Design** - Logo, Identity, Strategy\n💻 **Website Development** - Custom sites, E-commerce\n📢 **Advertising** - Print, Digital, TV, Outdoor\n📰 **PR & Media** - Press releases, Influencer marketing\n🎬 **Video Production** - Corporate videos, Ads\n📊 **Analytics** - Data-driven insights\n\n💡 **30 Years Experience | 500+ Clients | 98% Success**\n\nWhich service interests you?`,
        quickReplies: ['Digital Marketing', 'Branding', 'Web Development', 'Custom Package', 'Get Consultation'],
        nextStage: 'initial'
      };
    }

    // Pricing
    if (lowerMessage.includes('pricing') || lowerMessage.includes('💰') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return {
        response: `💰 **Our Investment Plans:**\n\n🌱 **STARTER** - ₹25,000/month\n→ Social Media + Basic SEO + Content\n→ Perfect for startups\n\n🚀 **GROWTH** - ₹75,000/month\n→ Full Digital Marketing Suite\n→ Best for growing businesses\n\n👑 **ENTERPRISE** - Custom (₹2L+/month)\n→ Complete Marketing Solution\n→ Ideal for established brands\n\n🎁 **SPECIAL:** 20% off + Free Brand Audit!\n\nWhich plan fits your goals?`,
        quickReplies: ['Starter Details', 'Growth Details', 'Enterprise Details', 'Custom Quote', 'Talk to Expert'],
        nextStage: 'initial'
      };
    }

    // Start Project
    if (lowerMessage.includes('start') || lowerMessage.includes('🎯') || lowerMessage.includes('project')) {
      if (stage === 'initial') {
        return {
          response: `🎯 **Exciting! Let's build something amazing!**\n\nTo give you the best strategy, may I know your name? 😊`,
          nextStage: 'project_name'
        };
      }
      if (stage === 'project_name') {
        setUserRequirements(prev => ({ ...prev, name: userMessage }));
        return {
          response: `Great to meet you, **${userMessage}**! 🎉\n\nWhat's your business or brand name?`,
          nextStage: 'project_business'
        };
      }
      if (stage === 'project_business') {
        setUserRequirements(prev => ({ ...prev, businessName: userMessage }));
        return {
          response: `Love it! **${userMessage}** 💎\n\nWhich industry are you in?`,
          quickReplies: ['E-commerce', 'Healthcare', 'Real Estate', 'Education', 'Food & Beverage', 'Technology', 'Fashion', 'Other'],
          nextStage: 'project_industry'
        };
      }
      if (stage === 'project_industry') {
        setUserRequirements(prev => ({ ...prev, industry: userMessage }));
        return {
          response: `Perfect! ${userMessage} is booming! 📈\n\nWhat's your monthly marketing budget?`,
          quickReplies: ['Under ₹50K', '₹50K - ₹1L', '₹1L - ₹3L', '₹3L - ₹5L', 'Above ₹5L', 'Need Guidance'],
          nextStage: 'project_budget'
        };
      }
      if (stage === 'project_budget') {
        setUserRequirements(prev => ({ ...prev, budget: userMessage }));
        const { name, businessName, industry, budget } = userRequirements;
        return {
          response: `🎉 **Perfect, ${name}!**\n\n📋 **Summary for ${businessName}:**\n🏢 Industry: ${industry}\n💰 Budget: ${budget}\n\n✨ I'll connect you with our expert team who will create a custom proposal within 24 hours!\n\n🎁 **SPECIAL OFFER:**\n✓ FREE Brand Audit (₹10,000)\n✓ FREE 30-min Strategy Call\n✓ 20% Discount for new clients\n\nHow would you like to proceed?`,
          quickReplies: ['WhatsApp Expert', 'Call Now', 'Email Details', 'Schedule Meeting'],
          nextStage: 'initial'
        };
      }
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('📞') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
      return {
        response: `📞 **Let's Connect!**\n\n💬 **WhatsApp:** +91-9669988666\n📱 **Call:** +91-9009970709\n📧 **Email:** info@inchtomilez.com\n🌐 **Website:** www.inchtomilez.com\n\n📍 **Office:** Indore, Madhya Pradesh\n⏰ **Hours:** Mon-Sat, 9 AM - 7 PM\n\n🎁 **FREE 30-min Strategy Call!**\n\nHow would you prefer to connect?`,
        quickReplies: ['Call Me Now', 'WhatsApp Chat', 'Schedule Meeting', 'Email Quote'],
        nextStage: 'initial'
      };
    }

    // Success Stories
    if (lowerMessage.includes('success') || lowerMessage.includes('🏆') || lowerMessage.includes('results') || lowerMessage.includes('portfolio')) {
      return {
        response: `🏆 **Real Results from Real Clients:**\n\n📈 **E-commerce Store**\n→ 350% sales increase in 6 months\n→ ₹50L to ₹2.5Cr revenue\n\n🏥 **Healthcare Startup**\n→ 10,000+ patient acquisitions\n→ #1 Google ranking\n\n🏢 **Real Estate Developer**\n→ ₹100Cr+ property sales\n→ 500% lead generation\n\n🍔 **Restaurant Chain**\n→ Expanded to 15 locations\n→ 200% social media growth\n\n**Average ROI: 450% | 98% Client Retention**\n\nWant to see more?`,
        quickReplies: ['My Industry Results', 'Case Studies', 'Client Testimonials', 'Start My Project'],
        nextStage: 'initial'
      };
    }

    // SEO
    if (lowerMessage.includes('seo') || lowerMessage.includes('google') || lowerMessage.includes('search')) {
      return {
        response: `🔍 **SEO Services - Get Found on Google!**\n\n**What We Do:**\n✓ Keyword Research & Strategy\n✓ On-Page Optimization\n✓ Technical SEO\n✓ Link Building\n✓ Local SEO\n\n**Results:**\n📈 250% traffic increase (avg)\n🎯 85% reach Page 1\n💰 400%+ ROI\n\n**Starting at ₹15,000/month**\n\nWant a free SEO audit?`,
        quickReplies: ['Free SEO Audit', 'SEO Pricing', 'See Results', 'Get Started'],
        nextStage: 'initial'
      };
    }

    // Social Media
    if (lowerMessage.includes('social') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook')) {
      return {
        response: `📱 **Social Media Marketing!**\n\n**Platforms We Master:**\n✓ Instagram - Reels, Stories, Posts\n✓ Facebook - Ads, Pages\n✓ LinkedIn - B2B Marketing\n✓ YouTube - Video Marketing\n\n**Results:**\n📸 Professional content\n📊 Data-driven strategy\n📈 200% follower growth\n\n**From ₹20,000/month**\n\nWhich platform interests you?`,
        quickReplies: ['Instagram Marketing', 'Facebook Ads', 'LinkedIn B2B', 'All Platforms'],
        nextStage: 'initial'
      };
    }

    // Website
    if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
      return {
        response: `💻 **Website Development!**\n\n**We Build:**\n✓ Business Websites - ₹50K\n✓ E-commerce Stores - ₹75K\n✓ Custom Web Apps - ₹1.5L+\n✓ Landing Pages - ₹15K\n\n**Features:**\n⚡ Lightning fast\n📱 Mobile responsive\n🔍 SEO optimized\n🔒 Secure\n\n**Timeline: 3-4 weeks**\n\nWhat do you need?`,
        quickReplies: ['Business Website', 'E-commerce Store', 'Landing Page', 'See Examples'],
        nextStage: 'initial'
      };
    }

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)/)) {
      return {
        response: `🙏 **Namaste!** Welcome back! 😊\n\nHow can I help grow your business today?`,
        quickReplies: ['📊 Our Services', '💰 Pricing Plans', '🎯 Start a Project', '📞 Contact Team', '🏆 Success Stories'],
        nextStage: 'initial'
      };
    }

    // Thank you
    if (lowerMessage.includes('thank')) {
      return {
        response: `🙏 **You're most welcome!**\n\nI'm here 24/7 to help! 😊\n\nAnything else?`,
        quickReplies: ['Start a Project', 'View Services', 'Get Pricing', 'Talk to Expert'],
        nextStage: 'initial'
      };
    }

    // Actions - WhatsApp
    if (lowerMessage.includes('whatsapp')) {
      const { name, businessName } = userRequirements;
      const message = name && businessName 
        ? `Hi! I'm ${name} from ${businessName}. I want to discuss my marketing needs.`
        : 'Hi! I want to discuss my marketing needs.';
      window.open(`https://wa.me/919669988666?text=${encodeURIComponent(message)}`, '_blank');
      return {
        response: `🚀 **Opening WhatsApp!**\n\nOur team will respond shortly!\n\nAnything else I can help with?`,
        quickReplies: ['View Services', 'Pricing', 'Success Stories'],
        nextStage: 'initial'
      };
    }

    // Actions - Call
    if (lowerMessage.includes('call me')) {
      window.location.href = 'tel:+919009970709';
      return {
        response: `📞 **Connecting you now!**\n\nOr call: +91-9009970709\n\nAnything else?`,
        quickReplies: ['WhatsApp Instead', 'Email Details', 'Browse Services'],
        nextStage: 'initial'
      };
    }

    // Default intelligent response
    return {
      response: `I'd love to help you with that! 😊\n\n**I can answer questions about:**\n\n📊 Marketing Services\n💰 Pricing & Packages\n🏆 Results & Case Studies\n📞 Getting Started\n\n**What interests you most?**`,
      quickReplies: ['View All Services', 'Get Pricing', 'See Results', 'Talk to Expert', 'Start a Project'],
      nextStage: 'initial'
    };
  };

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { response, quickReplies, nextStage } = getResponse(text, conversationStage);
      
      if (nextStage) {
        setConversationStage(nextStage);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        quickReplies
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
          >
            {/* Glowing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #1a1a1a, #25D366, #1a1a1a)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #25D366, #1a1a1a, #25D366)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: [1.1, 1.25, 1.1],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            />

            {/* Main Button */}
            <motion.div
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-dramatic overflow-hidden border-2 border-white/50"
              style={{
                background: 'rgba(37, 211, 102, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
              
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center shadow-strong"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-48px)] sm:w-[420px] rounded-3xl overflow-hidden shadow-dramatic"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(32px)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #1a1a1a, #25D366, #1a1a1a, #25D366)',
                backgroundSize: '300% 300%',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Header */}
            <div 
              className="relative p-5 flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.95), rgba(18, 140, 126, 0.95))',
                backdropFilter: 'blur(20px)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
                animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(186, 255, 0, 0.4)',
                        '0 0 40px rgba(186, 255, 0, 0.6)',
                        '0 0 20px rgba(186, 255, 0, 0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-black border-2 border-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="text-white">
                  <div className="font-antonio font-semibold text-lg">InchToMilez AI</div>
                  <div className="text-xs text-white/90 flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 bg-[#baff00] rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Always here to help
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div 
                  className="h-[420px] sm:h-[480px] overflow-y-auto p-5 space-y-4"
                  style={{
                    background: 'rgba(248, 248, 248, 0.5)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {messages.map((message, idx) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-3`}>
                        <div className={`flex gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                          {message.isBot && (
                            <motion.div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <Bot className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                          
                          <motion.div
                            className={`rounded-2xl px-4 py-3 ${
                              message.isBot
                                ? 'rounded-tl-none glass-strong border border-white/50'
                                : 'rounded-tr-none bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            style={{
                              boxShadow: message.isBot 
                                ? '0 4px 12px rgba(0, 0, 0, 0.08)'
                                : '0 4px 12px rgba(37, 211, 102, 0.3)',
                            }}
                          >
                            <div className={`text-sm font-raleway leading-relaxed whitespace-pre-line ${message.isBot ? 'text-gray-800' : 'text-white'}`}>
                              {message.text}
                            </div>
                            <div className={`text-xs mt-1.5 ${message.isBot ? 'text-gray-400' : 'text-white/70'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </motion.div>

                          {!message.isBot && (
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                              whileHover={{ scale: 1.1, rotate: -5 }}
                            >
                              <User className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Quick Replies */}
                      {message.isBot && message.quickReplies && (
                        <div className="flex flex-wrap gap-2 ml-10 mt-3">
                          {message.quickReplies.map((reply, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => handleQuickReply(reply)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(186, 255, 0, 0.4)' }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-2 glass-strong hover:glass-ultra-strong rounded-full text-xs font-medium font-raleway transition-all duration-200 border border-white/30 hover:border-[#baff00]/50"
                              style={{ background: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {reply}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 ml-10"
                    >
                      <div className="glass-strong px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                        <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div 
                  className="px-5 py-3 border-t"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex gap-2 mb-3">
                    {[
                      { icon: Phone, label: 'Call', action: () => window.location.href = 'tel:+919009970709' },
                      { icon: Mail, label: 'Email', action: () => window.location.href = 'mailto:info@inchtomilez.com' },
                      { icon: MessageCircle, label: 'WhatsApp', action: () => window.open('https://wa.me/919669988666', '_blank') },
                    ].map((btn, idx) => (
                      <motion.button
                        key={idx}
                        onClick={btn.action}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 glass-card hover:glass-strong rounded-xl text-xs font-medium transition-all duration-200 border border-white/30"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <btn.icon className="w-4 h-4" />
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 text-sm font-raleway border border-white/30"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    <motion.button
                      onClick={() => handleSendMessage()}
                      className="px-4 py-3 rounded-xl transition-all flex items-center justify-center shadow-medium"
                      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37, 211, 102, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Powered By */}
                <div 
                  className="px-5 py-2 border-t text-center"
                  style={{
                    background: 'rgba(248, 248, 248, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="text-xs text-gray-500 font-raleway flex items-center justify-center gap-2">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                      <Sparkles className="w-3 h-3 text-[#baff00]" />
                    </motion.div>
                    Powered by InchToMilez AI
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
