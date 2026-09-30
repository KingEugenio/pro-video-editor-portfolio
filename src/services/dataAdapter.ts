/**
 * CineFolio Centralized Data Abstraction Layer
 * 
 * Provides a clean boundary between UI/Business Logic and the underlying data source
 * (Local Storage, WordPress REST API, Custom Backend, or Headless CMS).
 */

import {
  Project,
  BrandTheme,
  Service,
  Testimonial,
  SocialLinks,
  Enquiry,
  FormConfig,
} from '../types/portfolio';
import { MediaAsset } from '../types/media';
import {
  INITIAL_PROJECTS,
  INITIAL_BRAND_THEME,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_FORM_CONFIG,
  INITIAL_MEDIA_ASSETS,
} from '../data/initialData';

export interface PortfolioDataExport {
  version: string;
  exportedAt: string;
  platform: string;
  brandTheme: BrandTheme;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  socialLinks: SocialLinks;
  formConfig: FormConfig;
}

export interface IDataAdapter {
  readonly adapterName: string;
  readonly isConnected: boolean;

  // Projects
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  saveProject(project: Project): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;

  // Brand Theme / Profile
  getBrandTheme(): Promise<BrandTheme>;
  saveBrandTheme(theme: BrandTheme): Promise<BrandTheme>;

  // Services
  getServices(): Promise<Service[]>;
  saveServices(services: Service[]): Promise<Service[]>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  saveTestimonials(testimonials: Testimonial[]): Promise<Testimonial[]>;

  // Social Links
  getSocialLinks(): Promise<SocialLinks>;
  saveSocialLinks(links: SocialLinks): Promise<SocialLinks>;

  // Enquiries
  getEnquiries(): Promise<Enquiry[]>;
  submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry>;
  updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean>;
  deleteEnquiry(id: string): Promise<boolean>;

  // Form Configuration
  getFormConfig(): Promise<FormConfig>;
  saveFormConfig(config: FormConfig): Promise<FormConfig>;

  // Media Assets
  getMediaAssets(): Promise<MediaAsset[]>;
  saveMediaAsset(asset: MediaAsset): Promise<MediaAsset>;
  deleteMediaAsset(id: string): Promise<boolean>;

  // Full Export & Import (Portability)
  exportAllData(): Promise<PortfolioDataExport>;
  importAllData(data: PortfolioDataExport): Promise<boolean>;
}

/**
 * 1. Local Browser Storage Data Adapter (Default Mode A & C)
 */
export class LocalDataAdapter implements IDataAdapter {
  public readonly adapterName = 'Local Storage & Memory Adapter';
  public readonly isConnected = true;

  private getStorageItem<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(`cinefolio_${key}`);
      if (!stored) return fallback;
      return JSON.parse(stored) as T;
    } catch {
      return fallback;
    }
  }

  private setStorageItem<T>(key: string, data: T): void {
    try {
      localStorage.setItem(`cinefolio_${key}`, JSON.stringify(data));
    } catch (err) {
      console.warn(`[LocalDataAdapter] Failed to persist key ${key}:`, err);
    }
  }

  async getProjects(): Promise<Project[]> {
    return this.getStorageItem<Project[]>('projects', INITIAL_PROJECTS);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug) || null;
  }

  async saveProject(project: Project): Promise<Project> {
    const projects = await this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (index >= 0) {
      updated = [...projects];
      updated[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      updated = [project, ...projects];
    }
    this.setStorageItem('projects', updated);
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    const projects = await this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    this.setStorageItem('projects', filtered);
    return true;
  }

  async getBrandTheme(): Promise<BrandTheme> {
    return this.getStorageItem<BrandTheme>('theme', INITIAL_BRAND_THEME);
  }

  async saveBrandTheme(theme: BrandTheme): Promise<BrandTheme> {
    this.setStorageItem('theme', theme);
    return theme;
  }

  async getServices(): Promise<Service[]> {
    return this.getStorageItem<Service[]>('services', INITIAL_SERVICES);
  }

  async saveServices(services: Service[]): Promise<Service[]> {
    this.setStorageItem('services', services);
    return services;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.getStorageItem<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS);
  }

  async saveTestimonials(testimonials: Testimonial[]): Promise<Testimonial[]> {
    this.setStorageItem('testimonials', testimonials);
    return testimonials;
  }

  async getSocialLinks(): Promise<SocialLinks> {
    return this.getStorageItem<SocialLinks>('socials', INITIAL_SOCIAL_LINKS);
  }

  async saveSocialLinks(links: SocialLinks): Promise<SocialLinks> {
    this.setStorageItem('socials', links);
    return links;
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return this.getStorageItem<Enquiry[]>('enquiries', []);
  }

  async submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
    const enquiries = await this.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: 'enq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    this.setStorageItem('enquiries', [newEnquiry, ...enquiries]);
    return newEnquiry;
  }

  async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> {
    const enquiries = await this.getEnquiries();
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
    this.setStorageItem('enquiries', updated);
    return true;
  }

  async deleteEnquiry(id: string): Promise<boolean> {
    const enquiries = await this.getEnquiries();
    const updated = enquiries.filter((e) => e.id !== id);
    this.setStorageItem('enquiries', updated);
    return true;
  }

  async getFormConfig(): Promise<FormConfig> {
    return this.getStorageItem<FormConfig>('booking_config', INITIAL_FORM_CONFIG);
  }

  async saveFormConfig(config: FormConfig): Promise<FormConfig> {
    this.setStorageItem('booking_config', config);
    return config;
  }

  async getMediaAssets(): Promise<MediaAsset[]> {
    return this.getStorageItem<MediaAsset[]>('media_assets', INITIAL_MEDIA_ASSETS);
  }

  async saveMediaAsset(asset: MediaAsset): Promise<MediaAsset> {
    const assets = await this.getMediaAssets();
    const index = assets.findIndex((a) => a.id === asset.id);
    let updated: MediaAsset[];
    if (index >= 0) {
      updated = [...assets];
      updated[index] = asset;
    } else {
      updated = [asset, ...assets];
    }
    this.setStorageItem('media_assets', updated);
    return asset;
  }

  async deleteMediaAsset(id: string): Promise<boolean> {
    const assets = await this.getMediaAssets();
    this.setStorageItem('media_assets', assets.filter((a) => a.id !== id));
    return true;
  }

  async exportAllData(): Promise<PortfolioDataExport> {
    const [projects, brandTheme, services, testimonials, socialLinks, formConfig] = await Promise.all([
      this.getProjects(),
      this.getBrandTheme(),
      this.getServices(),
      this.getTestimonials(),
      this.getSocialLinks(),
      this.getFormConfig(),
    ]);

    return {
      version: '2.1.0',
      exportedAt: new Date().toISOString(),
      platform: 'CineFolio Decoupled Data Engine',
      brandTheme,
      projects,
      services,
      testimonials,
      socialLinks,
      formConfig,
    };
  }

  async importAllData(data: PortfolioDataExport): Promise<boolean> {
    if (!data || !data.projects) return false;
    if (data.projects) this.setStorageItem('projects', data.projects);
    if (data.brandTheme) await this.saveBrandTheme(data.brandTheme);
    if (data.services) await this.saveServices(data.services);
    if (data.testimonials) await this.saveTestimonials(data.testimonials);
    if (data.socialLinks) await this.saveSocialLinks(data.socialLinks);
    if (data.formConfig) await this.saveFormConfig(data.formConfig);
    return true;
  }
}

/**
 * 2. WordPress REST API Data Adapter (Mode B & Option 1 / 4)
 * Bridges WordPress Custom Post Types (`/wp-json/wp/v2/projects`, etc.) and Custom Fields (ACF/REST)
 * to CineFolio's standardized Portfolio models.
 */
export class WordPressAdapter implements IDataAdapter {
  public readonly adapterName = 'WordPress REST API Bridge';
  private localFallback = new LocalDataAdapter();
  private endpoint: string;
  private appPassword?: string;
  public isConnected = false;

  constructor(endpoint: string, appPassword?: string) {
    this.endpoint = endpoint.replace(/\/+$/, '');
    this.appPassword = appPassword;
    this.isConnected = Boolean(endpoint);
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.appPassword) {
      headers['Authorization'] = `Basic ${btoa(this.appPassword)}`;
    }
    return headers;
  }

  private mapWpPostToProject(wpPost: any): Project {
    const acf = wpPost.acf || {};
    return {
      id: String(wpPost.id || wpPost.slug),
      title: wpPost.title?.rendered || wpPost.title || 'Untitled Project',
      slug: wpPost.slug || `project-${wpPost.id}`,
      client: acf.client || wpPost.client || 'Client',
      year: String(acf.year || new Date(wpPost.date || Date.now()).getFullYear()),
      category: acf.category || (wpPost._embedded?.['wp:term']?.[0]?.[0]?.name) || 'Commercial',
      services: acf.services ? (Array.isArray(acf.services) ? acf.services : [acf.services]) : ['Video Editing'],
      role: acf.role || 'Lead Editor & Colorist',
      software: acf.software || ['Premiere Pro', 'DaVinci Resolve'],
      thumbnail: acf.thumbnail || wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
      videos: acf.videos || [
        {
          id: 'wp_vid_1',
          title: wpPost.title?.rendered || 'Main Cut',
          provider: acf.video_provider || 'youtube',
          url: acf.video_url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          orientation: acf.video_orientation || 'landscape',
          aspectRatio: acf.aspect_ratio || '16:9',
          type: 'main',
        },
      ],
      brief: acf.brief || wpPost.excerpt?.rendered?.replace(/<[^>]*>?/gm, '') || '',
      approach: acf.approach || '',
      resultStory: acf.result_story || '',
      tags: acf.tags || [],
      isFeatured: Boolean(acf.is_featured ?? true),
      status: wpPost.status === 'publish' ? 'published' : 'draft',
      createdAt: wpPost.date || new Date().toISOString(),
      updatedAt: wpPost.modified || new Date().toISOString(),
    };
  }

  async getProjects(): Promise<Project[]> {
    if (!this.isConnected) return this.localFallback.getProjects();
    try {
      const res = await fetch(`${this.endpoint}/wp-json/wp/v2/projects?_embed&per_page=100`, {
        headers: this.getHeaders(),
      });
      if (!res.ok) throw new Error(`WP API Error ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid WP response');
      return data.map((item) => this.mapWpPostToProject(item));
    } catch (err) {
      console.warn('[WordPressAdapter] Fetch failed, falling back to local data:', err);
      return this.localFallback.getProjects();
    }
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (!this.isConnected) return this.localFallback.getProjectBySlug(slug);
    try {
      const res = await fetch(`${this.endpoint}/wp-json/wp/v2/projects?slug=${encodeURIComponent(slug)}&_embed`, {
        headers: this.getHeaders(),
      });
      if (!res.ok) throw new Error(`WP API Error ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return this.mapWpPostToProject(data[0]);
      }
      return null;
    } catch (err) {
      console.warn('[WordPressAdapter] Slug fetch failed:', err);
      return this.localFallback.getProjectBySlug(slug);
    }
  }

  async saveProject(project: Project): Promise<Project> {
    await this.localFallback.saveProject(project);
    if (!this.isConnected || !this.appPassword) return project;

    try {
      const payload = {
        title: project.title,
        slug: project.slug,
        status: project.status === 'published' ? 'publish' : 'draft',
        acf: {
          client: project.client,
          year: project.year,
          category: project.category,
          services: project.services,
          role: project.role,
          software: project.software,
          thumbnail: project.thumbnail,
          videos: project.videos,
          brief: project.brief,
          approach: project.approach,
          result_story: project.resultStory,
          tags: project.tags,
          is_featured: project.isFeatured,
        },
      };

      const wpId = project.id.match(/^\d+$/) ? project.id : '';
      const url = wpId ? `${this.endpoint}/wp-json/wp/v2/projects/${wpId}` : `${this.endpoint}/wp-json/wp/v2/projects`;
      const method = wpId ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('[WordPressAdapter] Project sync error:', err);
    }
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    await this.localFallback.deleteProject(id);
    if (this.isConnected && this.appPassword && id.match(/^\d+$/)) {
      try {
        await fetch(`${this.endpoint}/wp-json/wp/v2/projects/${id}?force=true`, {
          method: 'DELETE',
          headers: this.getHeaders(),
        });
      } catch (err) {
        console.warn('[WordPressAdapter] Delete failed:', err);
      }
    }
    return true;
  }

  async getBrandTheme(): Promise<BrandTheme> { return this.localFallback.getBrandTheme(); }
  async saveBrandTheme(theme: BrandTheme): Promise<BrandTheme> { return this.localFallback.saveBrandTheme(theme); }
  async getServices(): Promise<Service[]> { return this.localFallback.getServices(); }
  async saveServices(services: Service[]): Promise<Service[]> { return this.localFallback.saveServices(services); }
  async getTestimonials(): Promise<Testimonial[]> { return this.localFallback.getTestimonials(); }
  async saveTestimonials(testimonials: Testimonial[]): Promise<Testimonial[]> { return this.localFallback.saveTestimonials(testimonials); }
  async getSocialLinks(): Promise<SocialLinks> { return this.localFallback.getSocialLinks(); }
  async saveSocialLinks(links: SocialLinks): Promise<SocialLinks> { return this.localFallback.saveSocialLinks(links); }
  async getEnquiries(): Promise<Enquiry[]> { return this.localFallback.getEnquiries(); }
  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> { return this.localFallback.submitEnquiry(enquiry); }
  async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> { return this.localFallback.updateEnquiryStatus(id, status); }
  async deleteEnquiry(id: string): Promise<boolean> { return this.localFallback.deleteEnquiry(id); }
  async getFormConfig(): Promise<FormConfig> { return this.localFallback.getFormConfig(); }
  async saveFormConfig(config: FormConfig): Promise<FormConfig> { return this.localFallback.saveFormConfig(config); }
  async getMediaAssets(): Promise<MediaAsset[]> { return this.localFallback.getMediaAssets(); }
  async saveMediaAsset(asset: MediaAsset): Promise<MediaAsset> { return this.localFallback.saveMediaAsset(asset); }
  async deleteMediaAsset(id: string): Promise<boolean> { return this.localFallback.deleteMediaAsset(id); }
  async exportAllData(): Promise<PortfolioDataExport> { return this.localFallback.exportAllData(); }
  async importAllData(data: PortfolioDataExport): Promise<boolean> { return this.localFallback.importAllData(data); }
}

/**
 * 3. Custom REST / GraphQL Backend Data Adapter (Mode D & Future API Backend)
 */
export class CustomAPIAdapter implements IDataAdapter {
  public readonly adapterName = 'Custom REST / Microservice Adapter';
  private localFallback = new LocalDataAdapter();
  private apiBaseUrl: string;
  public isConnected = false;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl.replace(/\/+$/, '');
    this.isConnected = Boolean(apiBaseUrl);
  }

  async getProjects(): Promise<Project[]> {
    if (!this.isConnected) return this.localFallback.getProjects();
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/projects`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return this.localFallback.getProjects();
    }
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (!this.isConnected) return this.localFallback.getProjectBySlug(slug);
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/projects/by-slug/${slug}`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return this.localFallback.getProjectBySlug(slug);
    }
  }

  async saveProject(project: Project): Promise<Project> {
    await this.localFallback.saveProject(project);
    if (this.isConnected) {
      try {
        await fetch(`${this.apiBaseUrl}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });
      } catch (err) {
        console.warn('[CustomAPIAdapter] Save failed:', err);
      }
    }
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    await this.localFallback.deleteProject(id);
    if (this.isConnected) {
      try {
        await fetch(`${this.apiBaseUrl}/api/projects/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('[CustomAPIAdapter] Delete failed:', err);
      }
    }
    return true;
  }

  async getBrandTheme(): Promise<BrandTheme> { return this.localFallback.getBrandTheme(); }
  async saveBrandTheme(theme: BrandTheme): Promise<BrandTheme> { return this.localFallback.saveBrandTheme(theme); }
  async getServices(): Promise<Service[]> { return this.localFallback.getServices(); }
  async saveServices(services: Service[]): Promise<Service[]> { return this.localFallback.saveServices(services); }
  async getTestimonials(): Promise<Testimonial[]> { return this.localFallback.getTestimonials(); }
  async saveTestimonials(testimonials: Testimonial[]): Promise<Testimonial[]> { return this.localFallback.saveTestimonials(testimonials); }
  async getSocialLinks(): Promise<SocialLinks> { return this.localFallback.getSocialLinks(); }
  async saveSocialLinks(links: SocialLinks): Promise<SocialLinks> { return this.localFallback.saveSocialLinks(links); }
  async getEnquiries(): Promise<Enquiry[]> { return this.localFallback.getEnquiries(); }
  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> { return this.localFallback.submitEnquiry(enquiry); }
  async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> { return this.localFallback.updateEnquiryStatus(id, status); }
  async deleteEnquiry(id: string): Promise<boolean> { return this.localFallback.deleteEnquiry(id); }
  async getFormConfig(): Promise<FormConfig> { return this.localFallback.getFormConfig(); }
  async saveFormConfig(config: FormConfig): Promise<FormConfig> { return this.localFallback.saveFormConfig(config); }
  async getMediaAssets(): Promise<MediaAsset[]> { return this.localFallback.getMediaAssets(); }
  async saveMediaAsset(asset: MediaAsset): Promise<MediaAsset> { return this.localFallback.saveMediaAsset(asset); }
  async deleteMediaAsset(id: string): Promise<boolean> { return this.localFallback.deleteMediaAsset(id); }
  async exportAllData(): Promise<PortfolioDataExport> { return this.localFallback.exportAllData(); }
  async importAllData(data: PortfolioDataExport): Promise<boolean> { return this.localFallback.importAllData(data); }
}
