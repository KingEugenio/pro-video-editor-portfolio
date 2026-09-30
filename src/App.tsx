import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { ServicesSection } from './components/public/ServicesSection';
import { AboutSection } from './components/public/AboutSection';
import { FaqSection } from './components/public/FaqSection';
import { MapDirectionsSection } from './components/public/MapDirectionsSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactBookingSection } from './components/public/ContactBookingSection';
import { PublicFooter } from './components/public/PublicFooter';
import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { ShowreelModal } from './components/public/ShowreelModal';
import { PrivacyPolicyPage } from './components/public/PrivacyPolicyPage';
import { ThankYouPage } from './components/public/ThankYouPage';
import { NotFoundPage } from './components/public/NotFoundPage';
import { PrivateReviewPage } from './components/public/PrivateReviewPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { ToastContainer } from './components/ui/Toast';
import { Project } from './types/portfolio';
import { PublicPageSkeleton } from './components/skeletons/public/PublicPageSkeleton';
import { AdminLayoutSkeleton } from './components/skeletons/admin/AdminLayoutSkeleton';

type AppView = 'public' | 'admin' | 'privacy-policy' | 'thank-you' | '404' | 'client-review';

interface SubmissionState {
  id?: string;
  name?: string;
  email?: string;
  projectType?: string;
}

const PortfolioAppContent: React.FC = () => {
  const { auth, toasts, removeToast, brandTheme } = usePortfolio();

  const [currentView, setCurrentView] = useState<AppView>('public');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isViewSwitching, setIsViewSwitching] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<SubmissionState | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Initial load skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Update dynamic page title according to view & active section
  useEffect(() => {
    if (currentView === 'privacy-policy') {
      document.title = `Privacy Policy & NDAs | ${brandTheme.brandName}`;
    } else if (currentView === 'thank-you') {
      document.title = `Project Brief Received | ${brandTheme.brandName}`;
    } else if (currentView === 'client-review') {
      document.title = `Client Review Room & Cut Approval | ${brandTheme.brandName}`;
    } else if (currentView === '404') {
      document.title = `404 - Sequence Not Found | ${brandTheme.brandName}`;
    } else if (currentView === 'admin') {
      document.title = `Studio Admin CMS | ${brandTheme.brandName}`;
    } else {
      document.title = `${brandTheme.brandName} — Video Editor & Colorist Portfolio | Commercial & Music Videos`;
    }
  }, [currentView, brandTheme.brandName]);

  // Handle URL hash, pathname, and browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (path.includes('/admin') || search.includes('admin=true') || hash === '#admin') {
        setCurrentView('admin');
      } else if (path.includes('/privacy-policy') || hash === '#privacy-policy' || search.includes('privacy=true')) {
        setCurrentView('privacy-policy');
      } else if (path.includes('/thank-you') || hash === '#thank-you' || search.includes('thankyou=true')) {
        setCurrentView('thank-you');
      } else if (path.includes('/review') || hash === '#review' || search.includes('review=')) {
        setCurrentView('client-review');
      } else if (path.includes('/404') || hash === '#404') {
        setCurrentView('404');
      } else {
        setCurrentView('public');
        if (hash) {
          const targetSection = hash.replace('#', '');
          setTimeout(() => {
            const el = document.getElementById(targetSection);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(targetSection);
            }
          }, 300);
        }
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Track active scroll section for dynamic navbar highlight & titles
  useEffect(() => {
    if (currentView !== 'public') return;

    const sections = ['hero', 'work', 'services', 'about', 'faq', 'map', 'testimonials', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleSwitchView = (newView: AppView) => {
    if (newView === currentView) return;
    setIsViewSwitching(true);
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsViewSwitching(false);
    }, 250);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'public') {
      handleSwitchView('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 260);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleBookService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    scrollToSection('contact');
  };

  const handleFormSuccess = (submission: SubmissionState) => {
    setLastSubmission(submission);
    handleSwitchView('thank-you');
  };

  // Initial Full Screen Skeleton
  if (isInitialLoading || isViewSwitching) {
    return currentView === 'admin' ? (
      <AdminLayoutSkeleton />
    ) : (
      <PublicPageSkeleton layout={brandTheme?.portfolioLayout || 'grid'} />
    );
  }

  // 1. ADMIN VIEW
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-cyan-500 selection:text-neutral-950">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        {!auth.isAuthenticated ? (
          <AdminLogin
            onSuccess={() => handleSwitchView('admin')}
            onBackToPublic={() => handleSwitchView('public')}
          />
        ) : (
          <AdminLayout onBackToPublic={() => handleSwitchView('public')} />
        )}
      </div>
    );
  }

  // 2. PRIVACY POLICY VIEW
  if (currentView === 'privacy-policy') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <PrivacyPolicyPage
          onBack={() => handleSwitchView('public')}
          onNavigateSection={scrollToSection}
        />
      </div>
    );
  }

  // 3. THANK YOU VIEW
  if (currentView === 'thank-you') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <ThankYouPage
          submissionDetails={lastSubmission || undefined}
          onReturnHome={() => handleSwitchView('public')}
          onNavigateSection={scrollToSection}
        />
      </div>
    );
  }

  // 4. 404 NOT FOUND VIEW
  if (currentView === '404') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <NotFoundPage
          onReturnHome={() => handleSwitchView('public')}
          onNavigateSection={scrollToSection}
          onOpenPrivacyPolicy={() => handleSwitchView('privacy-policy')}
        />
      </div>
    );
  }

  // 5. CLIENT REVIEW & CUT APPROVAL VIEW
  if (currentView === 'client-review') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <PrivateReviewPage onBack={() => handleSwitchView('public')} />
      </div>
    );
  }

  // 6. MAIN PUBLIC PORTFOLIO VIEW
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-cyan-500 selection:text-neutral-950 font-sans antialiased flex flex-col relative">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Semantic HTML5 Header & Navigation */}
      <PublicNavbar
        onNavigate={scrollToSection}
        activeSection={activeSection}
        onOpenShowreel={() => setIsShowreelOpen(true)}
        onOpenAdmin={() => handleSwitchView('admin')}
      />

      {/* Semantic HTML5 Main Content Landmark */}
      <main id="main-content" role="main" className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onBookProject={() => scrollToSection('contact')}
          onExploreWork={() => scrollToSection('work')}
        />

        {/* Portfolio Section */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Services Section */}
        <ServicesSection onBookService={handleBookService} />

        {/* About Section */}
        <AboutSection />

        {/* Post-Production FAQ Section */}
        <FaqSection
          onNavigate={scrollToSection}
          onOpenPrivacyPolicy={() => handleSwitchView('privacy-policy')}
        />

        {/* Studio Location & Map Directions Section */}
        <MapDirectionsSection onNavigate={scrollToSection} />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact & Booking Section with Formspree Rate Limiting */}
        <ContactBookingSection
          prefilledService={prefilledService}
          onSuccessRedirect={handleFormSuccess}
          onNavigateSection={scrollToSection}
          onOpenPrivacyPolicy={() => handleSwitchView('privacy-policy')}
        />
      </main>

      {/* Semantic HTML5 Public Footer */}
      <PublicFooter
        onNavigate={scrollToSection}
        onOpenPrivacyPolicy={() => handleSwitchView('privacy-policy')}
        onOpenClientReview={() => handleSwitchView('client-review')}
        onOpen404={() => handleSwitchView('404')}
      />

      {/* Modals & Dialogs */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookProject={() => scrollToSection('contact')}
      />

      <ShowreelModal isOpen={isShowreelOpen} onClose={() => setIsShowreelOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}
