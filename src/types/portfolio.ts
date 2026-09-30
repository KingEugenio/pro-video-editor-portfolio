export type VideoSourceType = 'upload' | 'google_drive' | 'youtube' | 'vimeo' | 'direct_url';

export type VideoOrientation = 'landscape' | 'portrait' | 'square' | 'custom';

export interface VideoItem {
  id: string;
  title: string;
  provider: VideoSourceType;
  url: string;
  driveFileId?: string;
  orientation: VideoOrientation;
  aspectRatio?: string; // e.g. "16:9", "9:16", "1:1", "2.35:1"
  width?: number;
  height?: number;
  thumbnail?: string;
  isFeatured?: boolean;
  type?: 'main' | 'vertical_cut' | 'bts' | 'before' | 'after' | 'supporting';
  description?: string;
  autoplay?: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  category: string;
  services: string[];
  role: string;
  software: string[];
  thumbnail: string;
  videos: VideoItem[];
  gallery?: string[];
  beforeVideo?: VideoItem;
  afterVideo?: VideoItem;
  brief?: string;
  approach?: string;
  resultStory?: string;
  tags: string[];
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  button: string;
  buttonText: string;
}

export interface AuroraSettings {
  enabled: boolean;
  intensity: 'low' | 'medium' | 'high';
  blur: 'low' | 'medium' | 'high';
  speed: 'slow' | 'medium' | 'fast';
  opacity: number; // 0 to 100
  color1: string; // Primary Aurora Color
  color2: string; // Secondary Aurora Color
  color3: string; // Tertiary Aurora Color
  scrollInteraction: boolean;
  cursorInteraction: boolean;
}

export interface KineticTypographySettings {
  enabled: boolean;
  intensity: 'low' | 'medium' | 'high';
  scrollResponse: boolean;
  cursorResponse: boolean;
  entranceAnimation: 'none' | 'fade' | 'slide' | 'scale' | 'reveal';
  heroHeadline: string;
  heroSubheadline?: string;
  aboutHeadline?: string;
  contactHeadline?: string;
}

export interface TypographySettings {
  displayFont: string;
  headingFont: string;
  bodyFont: string;
  navFont?: string;
  buttonFont?: string;
  headingWeight: string;
  letterSpacing: string;
}

export interface GlassSettings {
  blur: number;
  opacity: number;
  borderRadius: number;
}

export interface BrandTheme {
  brandName: string;
  professionalTitle: string;
  bio: string;
  location: string;
  yearsExperience: string;
  projectsCompleted: string;
  happyClients: string;
  logoUrl?: string;
  faviconUrl?: string;
  profilePhotoUrl: string;
  heroVideoUrl: string;
  heroVideoType: VideoSourceType;
  heroPosterUrl: string;
  heroLayout: 'cinematic_split' | 'fullscreen_showreel' | 'large_typography' | 'minimal_editorial';
  portfolioLayout: 'grid' | 'masonry' | 'cinematic' | 'social_reels' | 'mixed';
  template: 'cinematic' | 'minimal' | 'editorial' | 'creative_grid' | 'luxury';
  colors: BrandColors;
  aurora: AuroraSettings;
  kineticTypography: KineticTypographySettings;
  typography: TypographySettings;
  glassSettings: GlassSettings;
  showStats: boolean;
  skills: string[];
  softwareList: string[];
}

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  vimeo?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  behance?: string;
  dribbble?: string;
  whatsapp?: string;
  personalWebsite?: string;
  customLinks?: { label: string; url: string }[];
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'number';
  required: boolean;
  enabled: boolean;
  options?: string[];
  placeholder?: string;
}

export type FormFieldConfig = FormField;
export type ClientEnquiry = Enquiry;
export type ServiceOffering = Service;

export interface WordPressConfig {
  enabled: boolean;
  siteUrl?: string;
  restApiUrl?: string;
  customPostType: string;
  applicationPassword?: string;
  autoSync: boolean;
  lastSyncTime?: string;
  status?: 'connected' | 'disconnected' | 'error';
  errorMessage?: string;
}

export interface FormConfig {
  provider: 'formspree' | 'custom_backend' | 'getform' | 'custom_webhook';
  endpoint?: string;
  formspreeEndpoint?: string;
  heading: string;
  subheading: string;
  buttonText: string;
  successMessage: string;
  whatsappNumber?: string;
  enableWhatsApp: boolean;
  fields: FormField[];
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  deadline?: string;
  hasFootage?: string;
  footageStorage?: string;
  footageDetails?: string;
  footageStorageLink?: string;
  videoCount?: string;
  deliverables?: string;
  description: string;
  createdAt: string;
  status: 'new' | 'in_review' | 'contacted' | 'in_progress' | 'archived';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  startingPrice?: string;
  showPricing: boolean;
  order?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  projectTitle?: string;
  rating: number;
  isPublished: boolean;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  thumbnailLink?: string;
  embedLink: string;
  downloadLink?: string;
  width?: number;
  height?: number;
  duration?: string;
  orientation: VideoOrientation;
  tags?: string[];
  modifiedTime?: string;
  folder?: string;
}
