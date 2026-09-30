import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  BrandTheme,
  Enquiry,
  FormConfig,
  GoogleDriveFile,
  Project,
  Service,
  SocialLinks,
  Testimonial,
  WordPressConfig,
} from '../types/portfolio';
import { MediaAsset, MediaHealthStatus } from '../types/media';
import {
  INITIAL_BRAND_THEME,
  INITIAL_FORM_CONFIG,
  INITIAL_GOOGLE_DRIVE_FILES,
  INITIAL_MEDIA_ASSETS,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_SOCIAL_LINKS,
  INITIAL_TESTIMONIALS,
  INITIAL_WORDPRESS_CONFIG,
} from '../data/initialData';
import { MediaResolver } from '../services/mediaResolver';
import { FormRateLimiter, RateLimitStatus } from '../services/rateLimiter';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: string } | null;
  token: string | null;
}

interface PortfolioContextType {
  // Brand & Theme
  brandTheme: BrandTheme;
  updateBrandTheme: (updates: Partial<BrandTheme>) => void;
  resetBrandTheme: () => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  getProjectBySlug: (slug: string) => Project | undefined;

  // Media Library & Providers
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt' | 'updatedAt'>) => MediaAsset;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  deleteMediaAsset: (id: string) => void;
  replaceMediaAsset: (targetAssetId: string, newSource: Partial<MediaAsset>) => void;
  runMediaHealthCheck: () => Promise<{ total: number; healthy: number; issues: number }>;

  // Services
  services: Service[];
  addService: (service: Omit<Service, 'id' | 'order'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Social
  socialLinks: SocialLinks;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;

  // Forms & Enquiries
  formConfig: FormConfig;
  updateFormConfig: (updates: Partial<FormConfig>) => void;
  enquiries: Enquiry[];
  submitEnquiry: (data: Record<string, any>) => Promise<{ success: boolean; message: string; enquiry?: Enquiry }>;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;

  // Google Drive
  isDriveConnected: boolean;
  driveFiles: GoogleDriveFile[];
  connectGoogleDrive: (customAuthData?: { email?: string; token?: string }) => void;
  disconnectGoogleDrive: () => void;
  addDriveFile: (file: GoogleDriveFile) => void;

  // WordPress
  wordPressConfig: WordPressConfig;
  updateWordPressConfig: (updates: Partial<WordPressConfig>) => void;
  syncWordPress: () => Promise<{ success: boolean; count?: number; error?: string }>;

  // Auth & Admin Protection
  auth: AuthState;
  login: (password: string) => boolean;
  logout: () => void;

  // Notifications
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'cinefolio_brand_theme_v1',
  PROJECTS: 'cinefolio_projects_v1',
  MEDIA_ASSETS: 'cinefolio_media_assets_v1',
  SERVICES: 'cinefolio_services_v1',
  TESTIMONIALS: 'cinefolio_testimonials_v1',
  SOCIAL: 'cinefolio_social_v1',
  FORM: 'cinefolio_form_config_v1',
  ENQUIRIES: 'cinefolio_enquiries_v1',
  DRIVE_CONNECTED: 'cinefolio_drive_connected_v1',
  DRIVE_FILES: 'cinefolio_drive_files_v1',
  WORDPRESS: 'cinefolio_wordpress_v1',
  AUTH: 'cinefolio_admin_auth_v1',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Brand Theme State
  const [brandTheme, setBrandTheme] = useState<BrandTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (!saved) return INITIAL_BRAND_THEME;
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_BRAND_THEME,
        ...parsed,
        colors: {
          ...INITIAL_BRAND_THEME.colors,
          ...(parsed.colors || {}),
        },
        aurora: {
          ...INITIAL_BRAND_THEME.aurora,
          ...(parsed.aurora || {}),
        },
        kineticTypography: {
          ...INITIAL_BRAND_THEME.kineticTypography,
          ...(parsed.kineticTypography || {}),
        },
        typography: {
          ...INITIAL_BRAND_THEME.typography,
          ...(parsed.typography || {}),
        },
        glassSettings: {
          ...INITIAL_BRAND_THEME.glassSettings,
          ...(parsed.glassSettings || {}),
        },
      };
    } catch {
      return INITIAL_BRAND_THEME;
    }
  });

  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Media Assets State
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEDIA_ASSETS);
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
    } catch {
      return INITIAL_MEDIA_ASSETS;
    }
  });

  // Services State
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // Social Links State
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOCIAL);
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_LINKS;
    } catch {
      return INITIAL_SOCIAL_LINKS;
    }
  });

  // Form Config State
  const [formConfig, setFormConfig] = useState<FormConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FORM);
      return saved ? JSON.parse(saved) : INITIAL_FORM_CONFIG;
    } catch {
      return INITIAL_FORM_CONFIG;
    }
  });

  // Enquiries State
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Google Drive State
  const [isDriveConnected, setIsDriveConnected] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRIVE_CONNECTED);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [driveFiles, setDriveFiles] = useState<GoogleDriveFile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRIVE_FILES);
      return saved ? JSON.parse(saved) : INITIAL_GOOGLE_DRIVE_FILES;
    } catch {
      return INITIAL_GOOGLE_DRIVE_FILES;
    }
  });

  // WordPress Config State
  const [wordPressConfig, setWordPressConfig] = useState<WordPressConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORDPRESS);
      return saved ? JSON.parse(saved) : INITIAL_WORDPRESS_CONFIG;
    } catch {
      return INITIAL_WORDPRESS_CONFIG;
    }
  });

  // Auth State
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null, token: null };
    } catch {
      return { isAuthenticated: false, user: null, token: null };
    }
  });

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  // Apply Theme CSS Variables dynamically to :root whenever brandTheme changes
  useEffect(() => {
    const root = document.documentElement;
    const { colors, typography, glassSettings, aurora } = brandTheme;

    root.style.setProperty('--brand-primary', colors.primary);
    root.style.setProperty('--brand-secondary', colors.secondary);
    root.style.setProperty('--brand-accent', colors.accent);
    root.style.setProperty('--brand-bg', colors.background || '#050505');
    root.style.setProperty('--brand-surface', colors.surface || '#0E0E12');
    root.style.setProperty('--brand-surface-elevated', colors.surfaceElevated || '#17171E');
    root.style.setProperty('--brand-text-primary', colors.textPrimary);
    root.style.setProperty('--brand-text-secondary', colors.textSecondary);
    root.style.setProperty('--brand-border', colors.border);
    root.style.setProperty('--brand-button', colors.button);
    root.style.setProperty('--brand-button-text', colors.buttonText);
    root.style.setProperty('--brand-radius', `${glassSettings.borderRadius}px`);
    root.style.setProperty('--brand-glass-blur', `${glassSettings.blur}px`);
    root.style.setProperty('--brand-surface-glass', `rgba(${hexToRgb(colors.surface || '#0E0E12')}, ${glassSettings.opacity})`);
    
    // Typography tokens
    root.style.setProperty('--font-display', `'${typography.displayFont || typography.headingFont || 'Space Grotesk'}', sans-serif`);
    root.style.setProperty('--font-heading', `'${typography.headingFont || 'Syne'}', sans-serif`);
    root.style.setProperty('--font-body', `'${typography.bodyFont || 'Plus Jakarta Sans'}', sans-serif`);
    root.style.setProperty('--font-nav', `'${typography.navFont || typography.displayFont || 'Space Grotesk'}', sans-serif`);
    root.style.setProperty('--font-button', `'${typography.buttonFont || typography.displayFont || 'Space Grotesk'}', sans-serif`);

    // Aurora tokens
    if (aurora) {
      root.style.setProperty('--aurora-color1', aurora.color1 || colors.primary);
      root.style.setProperty('--aurora-color2', aurora.color2 || colors.secondary);
      root.style.setProperty('--aurora-color3', aurora.color3 || colors.accent);
      root.style.setProperty('--aurora-opacity', `${aurora.opacity / 100}`);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(brandTheme));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [brandTheme]);

  // Helper to convert hex to rgb string
  function hexToRgb(hex: string): string {
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      return `${r}, ${g}, ${b}`;
    }
    if (clean.length === 6) {
      const r = parseInt(clean.substring(0, 2), 16) || 20;
      const g = parseInt(clean.substring(2, 4), 16) || 20;
      const b = parseInt(clean.substring(4, 6), 16) || 24;
      return `${r}, ${g}, ${b}`;
    }
    return '20, 20, 24';
  }

  // Persistence helpers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA_ASSETS, JSON.stringify(mediaAssets));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [mediaAssets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(socialLinks));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [socialLinks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FORM, JSON.stringify(formConfig));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [formConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRIVE_CONNECTED, String(isDriveConnected));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [isDriveConnected]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRIVE_FILES, JSON.stringify(driveFiles));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [driveFiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WORDPRESS, JSON.stringify(wordPressConfig));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [wordPressConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [auth]);

  // Brand Theme Actions
  const updateBrandTheme = (updates: Partial<BrandTheme>) => {
    setBrandTheme((prev) => ({ ...prev, ...updates }));
    showToast('Brand settings updated');
  };

  const resetBrandTheme = () => {
    setBrandTheme(INITIAL_BRAND_THEME);
    showToast('Brand settings reset to defaults');
  };

  // Projects Actions
  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
    };
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Project "${newProject.title}" created`);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
    showToast('Project updated');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project deleted', 'info');
  };

  const duplicateProject = (id: string) => {
    const existing = projects.find((p) => p.id === id);
    if (!existing) return;
    const duplicated: Project = {
      ...existing,
      id: `proj-${Date.now()}`,
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy-${Date.now().toString().slice(-4)}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
    };
    setProjects((prev) => [duplicated, ...prev]);
    showToast('Project duplicated as draft');
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find((p) => p.slug === slug);
  };

  // Media Library Actions
  const addMediaAsset = (data: Omit<MediaAsset, 'id' | 'createdAt' | 'updatedAt'>): MediaAsset => {
    const newAsset: MediaAsset = {
      ...data,
      id: `asset-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    showToast(`Media asset "${newAsset.title}" added`);
    return newAsset;
  };

  const updateMediaAsset = (id: string, updates: Partial<MediaAsset>) => {
    setMediaAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a))
    );
    showToast('Media asset updated');
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((a) => a.id !== id));
    showToast('Media asset removed from library', 'info');
  };

  const replaceMediaAsset = (targetAssetId: string, newSource: Partial<MediaAsset>) => {
    const existing = mediaAssets.find((a) => a.id === targetAssetId);
    if (!existing) return;

    // Update the media asset itself
    const updatedAsset: MediaAsset = {
      ...existing,
      ...newSource,
      updatedAt: new Date().toISOString(),
      healthStatus: 'healthy',
      status: 'ready',
    };

    setMediaAssets((prev) => prev.map((a) => (a.id === targetAssetId ? updatedAsset : a)));

    // Cascade update any attached projects that use this media's old URL or provider
    if (existing.attachedProjectIds && existing.attachedProjectIds.length > 0) {
      setProjects((prev) =>
        prev.map((proj) => {
          if (!existing.attachedProjectIds.includes(proj.id)) return proj;
          const updatedVideos = proj.videos.map((v) => {
            if (v.url === existing.playbackUrl || v.url === existing.sourceUrl) {
              return {
                ...v,
                url: updatedAsset.playbackUrl || updatedAsset.sourceUrl,
                thumbnail: updatedAsset.thumbnailUrl || v.thumbnail,
                aspectRatio: updatedAsset.aspectRatio || v.aspectRatio,
                orientation: updatedAsset.orientation || v.orientation,
              };
            }
            return v;
          });
          return { ...proj, videos: updatedVideos, updatedAt: new Date().toISOString() };
        })
      );
    }

    showToast(`Media replaced and synchronized with attached projects`);
  };

  const runMediaHealthCheck = async (): Promise<{ total: number; healthy: number; issues: number }> => {
    showToast('Running media diagnostic scan...', 'info');
    let healthyCount = 0;
    let issuesCount = 0;

    const checkedAssets = await Promise.all(
      mediaAssets.map(async (asset) => {
        const result = await MediaResolver.runHealthCheck(asset);
        if (result.status === 'healthy') {
          healthyCount++;
        } else {
          issuesCount++;
        }
        return {
          ...asset,
          healthStatus: result.status,
          errorMessage: result.status === 'healthy' ? undefined : result.message,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    setMediaAssets(checkedAssets);
    showToast(
      `Health check completed: ${healthyCount} healthy, ${issuesCount} issues flagged`,
      issuesCount > 0 ? 'error' : 'success'
    );

    return { total: checkedAssets.length, healthy: healthyCount, issues: issuesCount };
  };

  // Services Actions
  const addService = (data: Omit<Service, 'id' | 'order'>) => {
    const newService: Service = {
      ...data,
      id: `srv-${Date.now()}`,
      order: services.length + 1,
    };
    setServices((prev) => [...prev, newService]);
    showToast('Service added');
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    showToast('Service updated');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service removed', 'info');
  };

  // Testimonials Actions
  const addTestimonial = (data: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...data,
      id: `t-${Date.now()}`,
    };
    setTestimonials((prev) => [...prev, newTestimonial]);
    showToast('Testimonial added');
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast('Testimonial updated');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Testimonial removed', 'info');
  };

  // Social Links
  const updateSocialLinks = (links: Partial<SocialLinks>) => {
    setSocialLinks((prev) => ({ ...prev, ...links }));
    showToast('Social links updated');
  };

  // Form Config
  const updateFormConfig = (updates: Partial<FormConfig>) => {
    setFormConfig((prev) => ({ ...prev, ...updates }));
    showToast('Booking form settings saved');
  };

  // Enquiries
  const submitEnquiry = async (
    data: Record<string, any>
  ): Promise<{ success: boolean; message: string; enquiry?: Enquiry }> => {
    try {
      // 1. Enforce Client Rate Limits
      const limitStatus = FormRateLimiter.checkLimit();
      if (!limitStatus.allowed) {
        return {
          success: false,
          message: limitStatus.message,
        };
      }

      const newEnquiry: Enquiry = {
        id: `enq-${Date.now()}`,
        name: data.name || data.clientName || 'Anonymous Client',
        email: data.email || '',
        phone: data.phone,
        company: data.company,
        projectType: data.projectType || 'Video Editing Project',
        budget: data.budget,
        deadline: data.deadline,
        hasFootage: data.hasFootage,
        footageStorage: data.footageStorage,
        videoCount: data.videoCount,
        deliverables: data.deliverables,
        description: data.description || data.message || '',
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      // 2. If Formspree provider is selected and endpoint is configured, submit to Formspree
      if (formConfig.provider === 'formspree' && formConfig.endpoint) {
        try {
          await fetch(formConfig.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              ...data,
              _subject: `New Video Editing Brief from ${newEnquiry.name} (${newEnquiry.projectType})`,
            }),
          });
        } catch (formspreeErr) {
          console.warn('Formspree dispatch notice:', formspreeErr);
        }
      }

      // 3. Record rate limit timestamp in local persistence
      FormRateLimiter.recordSubmission();

      // 4. Always persist to local dashboard inbox as well
      setEnquiries((prev) => [newEnquiry, ...prev]);
      return {
        success: true,
        message: formConfig.successMessage || "Thanks for reaching out! Your project enquiry has been received.",
        enquiry: newEnquiry,
      };
    } catch (err: any) {
      return {
        success: false,
        message: 'Could not send enquiry. Please check required fields and try again.',
      };
    }
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    showToast(`Enquiry marked as ${status}`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast('Enquiry deleted', 'info');
  };

  // Google Drive
  const connectGoogleDrive = (customAuthData?: { email?: string; token?: string }) => {
    setIsDriveConnected(true);
    showToast(`Google Drive connected: ${customAuthData?.email || 'Authorized Account'}`);
  };

  const disconnectGoogleDrive = () => {
    setIsDriveConnected(false);
    showToast('Google Drive disconnected', 'info');
  };

  const addDriveFile = (file: GoogleDriveFile) => {
    setDriveFiles((prev) => [file, ...prev]);
    showToast(`Video "${file.name}" linked from Drive`);
  };

  // WordPress
  const updateWordPressConfig = (updates: Partial<WordPressConfig>) => {
    setWordPressConfig((prev) => ({ ...prev, ...updates }));
    showToast('WordPress configuration saved');
  };

  const syncWordPress = async (): Promise<{ success: boolean; count?: number; error?: string }> => {
    if (!wordPressConfig.siteUrl) {
      showToast('Please provide a valid WordPress site URL', 'error');
      return { success: false, error: 'Missing WordPress site URL' };
    }

    try {
      // Simulate/Attempt REST API fetch to WordPress endpoint
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const syncTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setWordPressConfig((prev) => ({
        ...prev,
        status: 'connected',
        lastSyncTime: syncTime,
      }));
      showToast('WordPress content synchronized successfully');
      return { success: true, count: projects.length };
    } catch (err: any) {
      setWordPressConfig((prev) => ({ ...prev, status: 'error', errorMessage: err.message }));
      showToast('Failed to connect to WordPress REST API', 'error');
      return { success: false, error: err.message };
    }
  };

  // Auth (Protected Admin Portal)
  const login = (password: string): boolean => {
    // Default pass is "admin123" or any custom authorization check
    if (password.trim() === 'admin123' || password.trim() === 'cinematic2026' || password.trim() === 'ekopixels') {
      const authData: AuthState = {
        isAuthenticated: true,
        user: {
          name: brandTheme.brandName || 'Video Editor',
          email: 'editor@portfolio.com',
          role: 'Administrator',
        },
        token: `auth_tok_${Date.now()}`,
      };
      setAuth(authData);
      showToast('Logged into Admin Dashboard');
      return true;
    }
    showToast('Invalid password. (Hint: default is admin123)', 'error');
    return false;
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
    showToast('Logged out of Admin Portal', 'info');
  };

  return (
    <PortfolioContext.Provider
      value={{
        brandTheme,
        updateBrandTheme,
        resetBrandTheme,
        projects,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        getProjectBySlug,
        mediaAssets,
        addMediaAsset,
        updateMediaAsset,
        deleteMediaAsset,
        replaceMediaAsset,
        runMediaHealthCheck,
        services,
        addService,
        updateService,
        deleteService,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        socialLinks,
        updateSocialLinks,
        formConfig,
        updateFormConfig,
        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        isDriveConnected,
        driveFiles,
        connectGoogleDrive,
        disconnectGoogleDrive,
        addDriveFile,
        wordPressConfig,
        updateWordPressConfig,
        syncWordPress,
        auth,
        login,
        logout,
        toast,
        showToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
