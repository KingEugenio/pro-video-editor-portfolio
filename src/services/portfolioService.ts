/**
 * CineFolio Portfolio Service
 * 
 * Centralized business logic orchestrator that exposes unified methods to the UI layer
 * while delegating storage and network calls to the active DataAdapter (Local, WordPress, Custom API).
 */

import { IDataAdapter, LocalDataAdapter, WordPressAdapter, CustomAPIAdapter, PortfolioDataExport } from './dataAdapter';
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

export class PortfolioService {
  private static instance: PortfolioService;
  private adapter: IDataAdapter;

  private constructor() {
    this.adapter = new LocalDataAdapter();
  }

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  /**
   * Switch the active data source at runtime
   */
  public setAdapter(adapter: IDataAdapter): void {
    this.adapter = adapter;
    console.info(`[PortfolioService] Switched active data source to: ${adapter.adapterName}`);
  }

  public configureWordPress(endpoint: string, appPassword?: string): void {
    this.adapter = new WordPressAdapter(endpoint, appPassword);
  }

  public configureCustomAPI(baseUrl: string): void {
    this.adapter = new CustomAPIAdapter(baseUrl);
  }

  public useLocalStorage(): void {
    this.adapter = new LocalDataAdapter();
  }

  public getActiveAdapterName(): string {
    return this.adapter.adapterName;
  }

  public isConnected(): boolean {
    return this.adapter.isConnected;
  }

  // --- Projects API ---
  public async getProjects(options?: { category?: string; status?: 'draft' | 'published' | 'all'; featuredOnly?: boolean }): Promise<Project[]> {
    const all = await this.adapter.getProjects();
    return all.filter((p) => {
      if (options?.category && options.category.toLowerCase() !== 'all' && p.category.toLowerCase() !== options.category.toLowerCase()) {
        return false;
      }
      if (options?.status && options.status !== 'all' && p.status !== options.status) {
        return false;
      }
      if (options?.featuredOnly && !p.isFeatured) {
        return false;
      }
      return true;
    });
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.adapter.getProjectBySlug(slug);
  }

  public async saveProject(project: Project): Promise<Project> {
    return this.adapter.saveProject(project);
  }

  public async deleteProject(id: string): Promise<boolean> {
    return this.adapter.deleteProject(id);
  }

  // --- Brand Theme Settings ---
  public async getBrandTheme(): Promise<BrandTheme> {
    return this.adapter.getBrandTheme();
  }

  public async saveBrandTheme(theme: BrandTheme): Promise<BrandTheme> {
    return this.adapter.saveBrandTheme(theme);
  }

  // --- Services & Testimonials ---
  public async getServices(): Promise<Service[]> {
    return this.adapter.getServices();
  }

  public async saveServices(services: Service[]): Promise<Service[]> {
    return this.adapter.saveServices(services);
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    return this.adapter.getTestimonials();
  }

  public async saveTestimonials(testimonials: Testimonial[]): Promise<Testimonial[]> {
    return this.adapter.saveTestimonials(testimonials);
  }

  public async getSocialLinks(): Promise<SocialLinks> {
    return this.adapter.getSocialLinks();
  }

  public async saveSocialLinks(links: SocialLinks): Promise<SocialLinks> {
    return this.adapter.saveSocialLinks(links);
  }

  // --- Enquiries & Booking ---
  public async getEnquiries(): Promise<Enquiry[]> {
    return this.adapter.getEnquiries();
  }

  public async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
    return this.adapter.submitEnquiry(enquiry);
  }

  public async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> {
    return this.adapter.updateEnquiryStatus(id, status);
  }

  public async deleteEnquiry(id: string): Promise<boolean> {
    return this.adapter.deleteEnquiry(id);
  }

  public async getFormConfig(): Promise<FormConfig> {
    return this.adapter.getFormConfig();
  }

  public async saveFormConfig(config: FormConfig): Promise<FormConfig> {
    return this.adapter.saveFormConfig(config);
  }

  // --- Media Assets ---
  public async getMediaAssets(): Promise<MediaAsset[]> {
    return this.adapter.getMediaAssets();
  }

  public async saveMediaAsset(asset: MediaAsset): Promise<MediaAsset> {
    return this.adapter.saveMediaAsset(asset);
  }

  public async deleteMediaAsset(id: string): Promise<boolean> {
    return this.adapter.deleteMediaAsset(id);
  }

  // --- Export / Import ---
  public async exportAllData(): Promise<PortfolioDataExport> {
    return this.adapter.exportAllData();
  }

  public async importAllData(data: PortfolioDataExport): Promise<boolean> {
    return this.adapter.importAllData(data);
  }
}

export const portfolioService = PortfolioService.getInstance();
