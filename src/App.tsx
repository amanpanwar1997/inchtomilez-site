import { useState, Suspense, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { InchyChatbot } from './components/InchyChatbot';
import { MagneticCursor } from './components/MagneticCursor';
import { PWAManager } from './components/pwa/PWAManager';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/AdvancedToast';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingActionButton } from './components/FloatingActionButton';
import { LiveNotification } from './components/LiveNotification';
import { ScrollIndicator } from './components/ScrollIndicator';

// Direct imports - optimized for Figma Make environment
import { HomePageComprehensive } from './components/pages/HomePageComprehensive';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';
import { BlogsPageDynamic } from './components/pages/BlogsPageDynamic';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { AdvertisingPage } from './components/pages/AdvertisingPage';
import { BrandingPage } from './components/pages/BrandingPage';
import { GraphicDesignPage } from './components/pages/GraphicDesignPage';
import { AnimationPage } from './components/pages/AnimationPage';
import { PublicRelationsPage } from './components/pages/PublicRelationsPage';
import { WebsiteDevelopmentPage } from './components/pages/WebsiteDevelopmentPage';
import { AdminPage } from './components/pages/AdminPage';
import { BlogPostPage } from './components/pages/BlogPostPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  // Handle URL query parameters for admin access
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page) {
      setCurrentPage(page);
    }
  }, []);

  const handleNavigate = (page: string) => {
    // Prevent navigation loops and invalid states
    if (page === currentPage) return;
    
    // Update URL for admin panel
    if (page === 'admin') {
      window.history.pushState({}, '', '?page=admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    
    // Show loading state for better UX
    setIsLoading(true);
    
    // Simulate page load delay (remove in production if not needed)
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 300);
  };

  // Track page views (for analytics)
  useEffect(() => {
    // Log page view
    console.log(`Page view: ${currentPage}`);
    
    // In production, send to analytics service
    // analytics.trackPageView(currentPage);
  }, [currentPage]);

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'home':
          return <HomePageComprehensive onNavigate={handleNavigate} />;
        case 'about':
          return <AboutPage onNavigate={handleNavigate} />;
        case 'services':
          return <ServicesPage onNavigate={handleNavigate} />;
        case 'contact':
          return <ContactPage />;
        case 'blogs':
          return <BlogsPageDynamic onNavigate={handleNavigate} />;
        case 'portfolio':
          return <PortfolioPage onNavigate={handleNavigate} />;
        case 'advertising':
          return <AdvertisingPage onNavigate={handleNavigate} />;
        case 'branding':
          return <BrandingPage onNavigate={handleNavigate} />;
        case 'graphic-design':
          return <GraphicDesignPage onNavigate={handleNavigate} />;
        case 'animation':
          return <AnimationPage onNavigate={handleNavigate} />;
        case 'public-relations':
          return <PublicRelationsPage onNavigate={handleNavigate} />;
        case 'website-development':
          return <WebsiteDevelopmentPage onNavigate={handleNavigate} />;
        case 'blog-post':
          return <BlogPostPage onNavigate={handleNavigate} />;
        default:
          return <HomePageComprehensive onNavigate={handleNavigate} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-lg mb-4">Something went wrong</h2>
            <button onClick={() => handleNavigate('home')} className="btn-award">
              Go Home
            </button>
          </div>
        </div>
      );
    }
  };

  // Admin Panel - Completely Separate
  if (currentPage === 'admin') {
    return <AdminPage onNavigate={handleNavigate} />;
  }

  // Website - Normal Layout
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ToastProvider>
          <div className="min-h-screen relative overflow-x-hidden cursor-none" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)' }}>
            {/* PWA Manager - Install Prompt, Offline Detection, Updates */}
            <PWAManager />
            
            {/* Magnetic Custom Cursor */}
            <MagneticCursor />
            
            {/* Inchy AI Chatbot */}
            <InchyChatbot />
            
            {/* Floating Action Buttons (Mobile) */}
            <FloatingActionButton />
            
            {/* Live Notification Popup (Desktop) */}
            <LiveNotification />
            
            {/* Scroll Progress & Back to Top */}
            <ScrollIndicator />
            
            {/* Loading Screen */}
            {isLoading && <LoadingScreen message="Loading..." />}
            
            {/* Main Content */}
            <div className="relative">
              <Header currentPage={currentPage} onNavigate={handleNavigate} />
              <main className="relative">
                <Suspense fallback={<LoadingScreen />}>
                  <PageTransition pageKey={currentPage}>
                    {renderPage()}
                  </PageTransition>
                </Suspense>
              </main>
              <Footer onNavigate={handleNavigate} />
            </div>
          </div>
        </ToastProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

