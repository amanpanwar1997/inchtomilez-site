import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, X, Send, Minimize2, Phone, Mail, 
  CheckCircle2, AlertCircle, Loader2, 
  ChevronLeft, ChevronRight, Globe, TrendingUp, Target, Award,
  Zap, Users as UsersIcon, Sparkles, ArrowRight, MessageSquare,
  Megaphone, Palette, PenTool, Film, Radio, Search, Laptop, User, Building2, HelpCircle,
  Home, ArrowLeft, ShoppingCart, BarChart, Gift, FileText, Calendar
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { InchyAvatar, InchyAvatarSimple } from './InchyAvatar';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
  component?: 'services' | 'audit' | 'phone-input' | 'calendar' | 'qualification';
}

interface UserData {
  name?: string;
  phone?: string;
  businessName?: string;
  selectedService?: string;
  query?: string;
  email?: string;
  industry?: string;
  budget?: string;
  isVerified: boolean;
  isReturning: boolean;
  conversationHistory?: Message[];
}

interface ServiceCard {
  icon: any;
  title: string;
  description: string;
  emoji: string;
}

import { projectId, publicAnonKey } from '../utils/supabase/info';

// Lead submission function - Sends to backend (stores in DB + sends email)
const sendLeadNotification = async (leadData: any) => {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/submit-lead`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(leadData),
      }
    );

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Lead submitted successfully!', result);
      if (result.emailSent) {
        console.log('📧 Email notification sent to owner');
      } else {
        console.warn('⚠️ Lead saved but email notification failed');
      }
      return { success: true, leadId: result.leadId };
    } else {
      console.error('❌ Failed to submit lead:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('❌ Error submitting lead:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export function InchyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState<string>('initial');
  const [userData, setUserData] = useState<UserData>({
    isVerified: false,
    isReturning: false
  });
  const [showToast, setShowToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });
  
  // Proactive engagement
  const [hasEngaged, setHasEngaged] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [phoneInput, setPhoneInput] = useState('');

  // Enhanced Service cards configuration with all 8 services
  const serviceCards: ServiceCard[] = [
    { icon: Megaphone, title: 'Digital Marketing Services', description: 'Complete digital strategy', emoji: '📢' },
    { icon: Target, title: 'Digital Advertising Services', description: 'PPC, Display & Retargeting', emoji: '🎯' },
    { icon: Laptop, title: 'Website Development', description: 'Custom web solutions', emoji: '🌐' },
    { icon: Search, title: 'SEO Services', description: 'Rank higher on Google', emoji: '🔍' },
    { icon: MessageSquare, title: 'Social Media Marketing', description: 'Grow your social presence', emoji: '📱' },
    { icon: Mail, title: 'Email Marketing', description: 'Convert leads via email', emoji: '✉️' },
    { icon: ShoppingCart, title: 'E-commerce Marketing', description: 'Boost online sales', emoji: '🛒' },
    { icon: BarChart, title: 'Analytics & Reporting', description: 'Data-driven insights', emoji: '📊' },
  ];

  // Proactive engagement timer
  useEffect(() => {
    if (hasEngaged || isOpen) return;
    
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    if (timeOnPage >= 15 && !hasEngaged && !isOpen) {
      setIsOpen(true);
      setHasEngaged(true);
      initializeChat();
    }

    return () => clearInterval(timer);
  }, [timeOnPage, hasEngaged, isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const addMessage = (text: string, isBot: boolean, quickReplies?: string[], component?: Message['component']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      quickReplies,
      component
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (delay: number = 800) => {
    setIsTyping(true);
    return new Promise(resolve => setTimeout(() => {
      setIsTyping(false);
      resolve(true);
    }, delay));
  };

  const initializeChat = async () => {
    await simulateTyping(500);
    addMessage(
      "👋 Hi! I'm **Inchy**, your AI marketing assistant from InchToMilez!\n\nI'm here to help you grow your business with our digital marketing services. What would you like to do today?",
      true,
      ['🚀 Start My Project', '🆓 Book Free Consultation', '📝 Get a Free Quote', '🏠 Main Menu']
    );
  };

  const showMainMenu = async () => {
    setStage('main-menu');
    addMessage(
      "**Main Menu** 🏠\n\nHow can I help you today?",
      true,
      ['📋 Explore Services', '🆓 Book Free Consultation', '📝 Get a Free Quote', '🧾 See Packages & Pricing', '📞 Request a Callback', '🎁 Claim Special Offer', '❓ Help / FAQs']
    );
  };

  const showServices = async () => {
    setStage('service-selection');
    addMessage(
      "**Our Services** 📋\n\nSelect the service you're interested in:",
      true,
      [],
      'services'
    );
  };

  const showPricing = async () => {
    addMessage(
      "**Packages & Pricing** 🧾\n\nWe offer customized packages based on your needs:\n\n**Starter Package** - ₹15,000/month\n• Basic SEO & Social Media\n• 2 platforms management\n• Monthly reports\n\n**Growth Package** - ₹35,000/month\n• Advanced SEO & PPC\n• 4 platforms management\n• Bi-weekly reports\n• Content creation\n\n**Enterprise Package** - ₹75,000/month\n• Complete digital marketing\n• Unlimited platforms\n• Weekly reports\n• Dedicated account manager\n• Custom solutions\n\n*All packages are customizable!*",
      true,
      ['🚀 Start My Project', '📞 Request a Callback', '🔙 Go Back']
    );
  };

  const showFAQs = async () => {
    addMessage(
      "**Frequently Asked Questions** ❓\n\n**Q: How quickly can you start?**\nA: We can begin within 24-48 hours of onboarding!\n\n**Q: Do you offer contracts?**\nA: Yes, flexible monthly or annual contracts.\n\n**Q: What's your success rate?**\nA: 95% client retention with avg. 3x ROI!\n\n**Q: Do you work with small businesses?**\nA: Absolutely! We serve businesses of all sizes.\n\n**Q: Can I customize my package?**\nA: Yes, all packages are fully customizable!",
      true,
      ['🚀 Start My Project', '📞 Request a Callback', '🏠 Main Menu']
    );
  };

  const showSpecialOffer = async () => {
    addMessage(
      "**🎁 Special Offer - Limited Time!**\n\n✨ **Get 20% OFF** on your first 3 months!\n\n🎯 **Plus FREE Bonuses:**\n• Free website audit (₹5,000 value)\n• Free social media strategy (₹8,000 value)\n• Free competitor analysis (₹6,000 value)\n\n**Total Savings: ₹19,000+**\n\n*Offer valid for new clients only. Limited slots available!*",
      true,
      ['🚀 Claim Now', '📞 Request a Callback', '🔙 Go Back']
    );
  };

  const getServiceResponse = (service: string) => {
    const responses: Record<string, string> = {
      'Digital Marketing Services': "**Digital Marketing Excellence** 📢\n\nComprehensive digital marketing solutions:\n• SEO & Content Marketing\n• PPC & Paid Advertising\n• Social Media Management\n• Email Marketing Campaigns\n• Conversion Rate Optimization\n\n**Results:** Average 250% ROI for our clients!",
      'Digital Advertising Services': "**Strategic Digital Advertising** 🎯\n\nData-driven ad campaigns that convert:\n• Google Ads (Search & Display)\n• Facebook & Instagram Ads\n• LinkedIn Advertising\n• Retargeting Campaigns\n• Video Advertising\n\n**Performance:** 3x better ROAS than industry average!",
      'Website Development': "**Custom Web Solutions** 🌐\n\nHigh-performance websites that drive results:\n• Responsive Website Design\n• E-commerce Development\n• Web Applications\n• Landing Page Optimization\n• Website Maintenance\n\n**Speed:** Lightning-fast load times guaranteed!",
      'SEO Services': "**Advanced SEO Optimization** 🔍\n\nRank #1 on Google with our proven strategies:\n• Technical SEO Audit\n• On-page Optimization\n• Link Building\n• Local SEO\n• Content Strategy\n\n**Track Record:** 85% of clients reach page 1 within 6 months!",
      'Social Media Marketing': "**Social Media Growth** 📱\n\nBuild engaged communities and drive sales:\n• Content Creation & Curation\n• Community Management\n• Influencer Marketing\n• Social Media Ads\n• Analytics & Reporting\n\n**Growth:** Average 5x follower increase in 6 months!",
      'Email Marketing': "**Email Campaign Excellence** ✉️\n\nTurn subscribers into loyal customers:\n• Email Strategy & Design\n• Automated Workflows\n• List Building & Segmentation\n• A/B Testing\n• Performance Analytics\n\n**Conversion:** 40% average open rate, 15% CTR!",
      'E-commerce Marketing': "**E-commerce Growth Engine** 🛒\n\nMaximize your online store revenue:\n• Product Feed Optimization\n• Shopping Ads Management\n• Conversion Optimization\n• Cart Abandonment Recovery\n• Marketplace Management\n\n**Results:** Average 180% revenue increase in 1 year!",
      'Analytics & Reporting': "**Data-Driven Insights** 📊\n\nMake informed decisions with our analytics:\n• Google Analytics Setup\n• Custom Dashboards\n• Conversion Tracking\n• Competitor Analysis\n• Monthly Performance Reports\n\n**Clarity:** Real-time insights for better ROI!"
    };
    return responses[service] || "Tell me more about what you need!";
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    addMessage(messageText, false);
    setInputValue('');

    await simulateTyping();

    // Main Menu Navigation
    if (messageText === '🏠 Main Menu') {
      showMainMenu();
      return;
    }

    // Go Back functionality
    if (messageText === '🔙 Go Back') {
      showMainMenu();
      return;
    }

    // Help / FAQs
    if (messageText === '❓ Help / FAQs') {
      showFAQs();
      return;
    }

    // See Packages & Pricing
    if (messageText === '🧾 See Packages & Pricing') {
      showPricing();
      return;
    }

    // Claim Special Offer
    if (messageText === '🎁 Claim Special Offer' || messageText === '🚀 Claim Now') {
      showSpecialOffer();
      return;
    }

    // Explore Services
    if (messageText === '📋 Explore Services') {
      showServices();
      return;
    }

    // Initial stage
    if (stage === 'initial' || messageText === '🚀 Start My Project') {
      setStage('action-selection');
      addMessage(
        "**Excellent!** Let's get your project started! 🚀\n\nWhat would you like to do first?",
        true,
        ['📋 Explore Services', '📞 Request a Callback', '📝 Get a Free Quote', '🆓 Book Free Consultation']
      );
      return;
    }

    // Book Free Consultation
    if (messageText === '🆓 Book Free Consultation' || messageText === '💼 Free Consultation') {
      setStage('consultation-booking');
      addMessage(
        "**Perfect!** 🆓 Let's book your free 30-minute consultation!\n\nOur digital marketing expert will:\n✅ Analyze your current strategy\n✅ Identify growth opportunities\n✅ Provide actionable recommendations\n✅ Answer all your questions\n\nTo schedule your consultation, please provide your **10-digit mobile number**:",
        true,
        [],
        'phone-input'
      );
      setUserData(prev => ({ ...prev, selectedService: 'Free Consultation' }));
      return;
    }

    // Get a Free Quote
    if (messageText === '📝 Get a Free Quote') {
      setStage('quote-request');
      addMessage(
        "**Great choice!** 📝 I'll help you get a customized quote.\n\nFirst, which service are you interested in?",
        true,
        [],
        'services'
      );
      return;
    }

    // Request a Callback
    if (messageText === '📞 Request a Callback') {
      setStage('callback-request');
      addMessage(
        "**I'll arrange a callback for you!** 📞\n\nOur expert will call you within **15 minutes** during business hours (9 AM - 7 PM IST).\n\nPlease share your **10-digit mobile number**:",
        true,
        [],
        'phone-input'
      );
      setUserData(prev => ({ ...prev, selectedService: 'Callback Request' }));
      return;
    }

    // Service Selection
    if (serviceCards.some(s => messageText.includes(s.title))) {
      const service = serviceCards.find(s => messageText.includes(s.title));
      if (service) {
        setUserData(prev => ({ ...prev, selectedService: service.title }));
        addMessage(getServiceResponse(service.title), true);
        await simulateTyping(600);
        addMessage(
          "**What would you like to do next?**",
          true,
          ['🚀 Start My Project', '📞 Request a Callback', '📝 Get a Free Quote', '🆓 Book Free Consultation', '🔙 Go Back']
        );
        setStage('post-service-selection');
      }
      return;
    }

    // Phone Collection for various flows
    if ((stage === 'callback-request' || stage === 'consultation-booking' || stage === 'phone-collection' || stage === 'quote-request-phone') && /^\d{10}$/.test(messageText)) {
      setUserData(prev => ({ ...prev, phone: messageText, isVerified: true }));
      
      // Submit lead to backend
      const leadData = {
        phone: messageText,
        service: userData.selectedService || 'General Inquiry',
        source: 'Inchy AI Chatbot',
        timestamp: new Date().toISOString(),
        name: userData.name,
        businessName: userData.businessName,
        query: userData.query,
        type: stage
      };

      const result = await sendLeadNotification(leadData);
      
      if (result.success) {
        setStage('success');
        
        let successMessage = '';
        if (stage === 'callback-request') {
          successMessage = `**✅ Callback Requested Successfully!**\n\n📱 Phone: ${messageText}\n🎯 Service: ${userData.selectedService}\n\nOur expert will call you within **15 minutes**!\n\nMeanwhile, explore our other services or ask me anything!`;
        } else if (stage === 'consultation-booking') {
          successMessage = `**✅ Free Consultation Booked!**\n\n📱 Phone: ${messageText}\n📅 Duration: 30 minutes\n\nOur expert will call you to schedule a convenient time!\n\nGet ready for actionable insights! 🚀`;
        } else {
          successMessage = `**✅ Request Received!**\n\n📱 Phone: ${messageText}\n🎯 Service: ${userData.selectedService}\n\nOur expert will contact you shortly to discuss your requirements!`;
        }
        
        addMessage(successMessage, true);
        await simulateTyping(600);
        addMessage(
          "**What else can I help you with?**",
          true,
          ['📋 Explore Services', '🧾 See Packages & Pricing', '🎁 Claim Special Offer', '❓ Help / FAQs', '🏠 Main Menu']
        );
      } else {
        addMessage(
          "⚠️ **Oops!** There was an issue. Please try again or contact us:\n\n💬 WhatsApp: +91-9669988666\n📧 Email: inchtomilez@gmail.com",
          true,
          ['🔄 Try Again', '🏠 Main Menu']
        );
      }
      return;
    }

    // Invalid phone number
    if ((stage === 'callback-request' || stage === 'consultation-booking' || stage === 'phone-collection' || stage === 'quote-request-phone') && !/^\d{10}$/.test(messageText)) {
      addMessage(
        "Please provide a valid **10-digit mobile number** (e.g., 9876543210).\n\nThis helps us connect you with the right expert! 📞",
        true,
        [],
        'phone-input'
      );
      return;
    }

    // Post-service selection flow
    if (stage === 'post-service-selection') {
      if (messageText === '🚀 Start My Project') {
        setStage('phone-collection');
        addMessage(
          "**Perfect!** Let's get started with your project! 🚀\n\nPlease share your **10-digit mobile number** so our expert can reach you:",
          true,
          [],
          'phone-input'
        );
        return;
      }
    }

    // Quote request - need phone after service selection
    if (stage === 'quote-request' && serviceCards.some(s => messageText.includes(s.title))) {
      const service = serviceCards.find(s => messageText.includes(s.title));
      if (service) {
        setUserData(prev => ({ ...prev, selectedService: service.title }));
        setStage('quote-request-phone');
        addMessage(
          `**Great!** I'll prepare a customized quote for **${service.title}**.\n\nPlease share your **10-digit mobile number** so we can send you the detailed quote:`,
          true,
          [],
          'phone-input'
        );
      }
      return;
    }

    // Try Again
    if (messageText === '🔄 Try Again') {
      if (stage === 'callback-request' || stage === 'consultation-booking' || stage === 'phone-collection') {
        addMessage(
          "No problem! Please share your **10-digit mobile number**:",
          true,
          [],
          'phone-input'
        );
      } else {
        showMainMenu();
      }
      return;
    }

    // Learn More / Get Started / Call Expert
    if (messageText === '❓ Learn More') {
      addMessage(
        "**About InchToMilez** 🌟\n\nIndore's leading digital marketing agency with:\n\n✅ 500+ successful projects\n✅ 95% client retention rate\n✅ Average 3x ROI\n✅ Award-winning team\n✅ Proven track record since 2015\n\n**Services:**\n• Digital Marketing & SEO\n• Website Development\n• Social Media Marketing\n• E-commerce Solutions\n• Analytics & Reporting\n\nReady to grow your business?",
        true,
        ['🚀 Start My Project', '📋 Explore Services', '📞 Request a Callback', '🏠 Main Menu']
      );
      return;
    }

    if (messageText === '📞 Call Expert') {
      addMessage(
        "**Connect with our experts!** 📞\n\n💬 WhatsApp: +91-9669988666\n📧 Email: inchtomilez@gmail.com\n🌐 Website: inchtomilez.com\n\n**Business Hours:** 9 AM - 7 PM IST (Mon-Sat)\n\nOr continue chatting here!",
        true,
        ['🚀 Start My Project', '📋 Explore Services', '🆓 Book Free Consultation', '🏠 Main Menu']
      );
      return;
    }

    // Close Chat
    if (messageText === '❌ Close Chat') {
      setIsOpen(false);
      return;
    }

    // Start Over
    if (messageText === '🔄 Start Over') {
      setStage('initial');
      setUserData({ isVerified: false, isReturning: false });
      setMessages([]);
      initializeChat();
      return;
    }

    // Generic / Help response
    addMessage(
      "I'm here to help! 😊\n\nYou can:\n• Explore our services\n• Book a free consultation\n• Get a quote\n• Request a callback\n• View pricing\n\nWhat interests you?",
      true,
      ['📋 Explore Services', '🆓 Book Free Consultation', '📝 Get a Free Quote', '📞 Request a Callback', '🏠 Main Menu']
    );
  };

  const handlePhoneSubmit = () => {
    if (phoneInput.trim()) {
      handleSendMessage(phoneInput);
      setPhoneInput('');
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8"
          >
            {/* Pulse Rings with Glassmorphism */}
            <motion.div
              className="absolute inset-0 rounded-full glass-ultra-light border border-black/10"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full glass-ultra-light border border-black/5"
              animate={{
                scale: [1, 1.7, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Main Button with Enhanced Glassmorphism */}
            <motion.button
              onClick={() => {
                setIsOpen(true);
                if (messages.length === 0) initializeChat();
              }}
              className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full glass-ultra-strong border-2 border-black/20 flex items-center justify-center shadow-dramatic hover:shadow-xl transition-all backdrop-blur-2xl group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-7 h-7 text-black group-hover:scale-110 transition-transform" strokeWidth={2} />
              
              {/* AI Badge with Glassmorphism */}
              <motion.div
                className="absolute -top-1 -right-1 w-7 h-7 bg-black rounded-full flex items-center justify-center shadow-strong glass-ultra border border-white/30"
                animate={{ 
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </motion.div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-48px)] sm:w-[440px] glass-ultra-strong border-2 border-black/20 rounded-3xl overflow-hidden shadow-dramatic backdrop-blur-2xl"
            style={{
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            {/* Header with Enhanced Glassmorphism */}
            <motion.div 
              className="relative p-4 flex items-center justify-between glass-ultra border-b-2 border-black/10 backdrop-blur-xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <InchyAvatar className="w-12 h-12" />
                  {/* Online Indicator with Glow */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-black rounded-full border-2 border-white shadow-soft"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute inset-0.5 bg-white rounded-full" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-antonio font-semibold text-black">Inchy AI</h3>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-2 h-2 bg-black rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <p className="text-xs text-gray-600 font-raleway">Always here to help</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex items-center gap-2">
                <motion.a
                  href="https://wa.me/919669988666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-black/5 rounded-xl transition-all group relative glass-ultra-light"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title="WhatsApp us at +91-9669988666"
                >
                  <MessageSquare className="w-4 h-4 text-black group-hover:scale-110 transition-transform" strokeWidth={2} />
                  <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-raleway">
                    WhatsApp
                  </span>
                </motion.a>
                
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-black/5 rounded-xl transition-all glass-ultra-light"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minimize2 className="w-4 h-4 text-black" strokeWidth={2} />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-xl transition-all glass-ultra-light"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-black" strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages Area with Enhanced Background */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-subtle backdrop-blur-xl relative"
                >
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  
                  {/* Chat Messages */}
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4 relative z-10">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        {message.isBot && (
                          <div className="flex items-start gap-2 max-w-[85%]">
                            <InchyAvatarSimple className="w-8 h-8 flex-shrink-0 ring-2 ring-black/5" />
                            <div className="glass-ultra-strong border border-black/20 px-4 py-3 rounded-2xl rounded-tl-none shadow-soft backdrop-blur-xl hover:shadow-medium transition-all">
                              <div 
                                className="text-sm font-raleway text-black whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                  __html: message.text
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\n/g, '<br/>')
                                }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {!message.isBot && (
                          <div className="bg-black text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-soft max-w-[85%] hover:shadow-medium transition-all backdrop-blur-sm">
                            <p className="text-sm font-raleway">{message.text}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Service Cards */}
                    {messages.some(m => m.component === 'services') && stage.includes('service') && (
                      <motion.div 
                        className="grid grid-cols-2 gap-2 mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {serviceCards.map((service, idx) => {
                          const Icon = service.icon;
                          return (
                            <motion.button
                              key={idx}
                              onClick={() => handleSendMessage(service.title)}
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ 
                                delay: idx * 0.05,
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                              }}
                              className="p-3 glass-ultra-strong border border-black/20 rounded-xl hover:bg-black hover:text-white hover:border-black transition-all group backdrop-blur-xl hover:shadow-medium"
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-base">{service.emoji}</span>
                                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2} />
                              </div>
                              <p className="text-xs font-antonio font-semibold mb-0.5 text-left">{service.title}</p>
                              <p className="text-[10px] opacity-60 font-raleway text-left">{service.description}</p>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* Phone Input Component */}
                    {messages.some(m => m.component === 'phone-input') && (stage === 'callback-request' || stage === 'consultation-booking' || stage === 'phone-collection' || stage === 'quote-request-phone') && (
                      <motion.div 
                        className="ml-10 mt-3 w-full max-w-[280px]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="glass-ultra-strong border-2 border-black/20 rounded-xl p-4 shadow-soft backdrop-blur-xl">
                          <div className="flex gap-2">
                            <input
                              type="tel"
                              value={phoneInput}
                              onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              placeholder="10-digit mobile"
                              className="flex-1 px-3 py-2 border-2 border-gray-300/50 rounded-lg focus:border-black focus:outline-none font-raleway text-sm glass-ultra backdrop-blur-sm transition-all hover:border-gray-400/50"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') handlePhoneSubmit();
                              }}
                            />
                            <motion.button
                              onClick={handlePhoneSubmit}
                              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-soft hover:shadow-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Send className="w-4 h-4" strokeWidth={2} />
                            </motion.button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 font-raleway">
                            Format: 10 digits (e.g., 9876543210)
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Quick Replies */}
                    {messages.length > 0 && messages[messages.length - 1].quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-10">
                        {messages[messages.length - 1].quickReplies!.map((reply, idx) => {
                          let Icon = ArrowRight;
                          if (reply.includes('Start') || reply.includes('Claim')) Icon = Sparkles;
                          else if (reply.includes('Learn') || reply.includes('Help') || reply.includes('FAQs')) Icon = HelpCircle;
                          else if (reply.includes('Call') || reply.includes('Callback')) Icon = Phone;
                          else if (reply.includes('Services') || reply.includes('Explore')) Icon = Globe;
                          else if (reply.includes('Consultation')) Icon = Target;
                          else if (reply.includes('Quote')) Icon = FileText;
                          else if (reply.includes('All') || reply.includes('Close')) Icon = CheckCircle2;
                          else if (reply.includes('Over') || reply.includes('Again') || reply.includes('Back')) Icon = ArrowLeft;
                          else if (reply.includes('Menu')) Icon = Home;
                          else if (reply.includes('Packages') || reply.includes('Pricing')) Icon = BarChart;
                          else if (reply.includes('Offer') || reply.includes('Special')) Icon = Gift;

                          return (
                            <motion.button
                              key={idx}
                              onClick={() => handleSendMessage(reply)}
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ 
                                delay: idx * 0.05,
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                              }}
                              className="px-4 py-2 glass-ultra-strong border-2 border-black/20 hover:bg-black hover:text-white hover:border-black rounded-full text-xs font-raleway font-medium transition-all shadow-soft hover:shadow-medium flex items-center gap-2 group backdrop-blur-xl"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2} />
                              <span>{reply}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {/* Enhanced Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <InchyAvatarSimple className="w-8 h-8 ring-2 ring-black/5" />
                        <div className="glass-ultra-strong border border-black/20 px-5 py-3 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-soft backdrop-blur-xl">
                          <motion.div 
                            className="w-2 h-2 bg-black rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} 
                          />
                          <motion.div 
                            className="w-2 h-2 bg-gray-600 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} 
                          />
                          <motion.div 
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} 
                          />
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Enhanced Input Area */}
                  <div className="p-4 glass-ultra border-t-2 border-black/10 backdrop-blur-xl">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border-2 border-gray-300/50 rounded-xl focus:border-black focus:outline-none font-raleway text-sm glass-ultra-light backdrop-blur-sm transition-all hover:border-gray-400/50 hover:shadow-soft"
                      />
                      <motion.button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim()}
                        className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft hover:shadow-medium"
                        whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                        whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
                      >
                        <Send className="w-5 h-5" strokeWidth={2} />
                      </motion.button>
                    </div>
                    
                    {/* Powered by Badge */}
                    <motion.div 
                      className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500 font-raleway"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Sparkles className="w-3 h-3" strokeWidth={2} />
                      <span>Powered by InchToMilez AI</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 right-6 sm:right-8 px-6 py-4 rounded-2xl shadow-dramatic glass-ultra-strong border-2 backdrop-blur-2xl z-50 ${
              showToast.type === 'success' ? 'border-black/20' : 'border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              {showToast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-black" strokeWidth={2} />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" strokeWidth={2} />
              )}
              <p className="text-sm font-raleway font-medium text-black">{showToast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
