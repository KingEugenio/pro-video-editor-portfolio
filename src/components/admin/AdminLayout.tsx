import React, { useState } from 'react';
import {
  LayoutDashboard,
  Film,
  Palette,
  Cloud,
  Inbox,
  FileSpreadsheet,
  Layers,
  Quote,
  Globe,
  Video,
  ListChecks,
  Eye,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { ProjectsListManager } from './ProjectsListManager';
import { ProjectFormModal } from './ProjectFormModal';
import { MediaLibraryManager } from './MediaLibraryManager';
import { BrandStudio } from './BrandStudio';
import { GoogleDriveManager } from './GoogleDriveManager';
import { EnquiriesManager } from './EnquiriesManager';
import { BookingFormSettings } from './BookingFormSettings';
import { ServicesManager } from './ServicesManager';
import { TestimonialsManager } from './TestimonialsManager';
import { WordPressManager } from './WordPressManager';
import { OnboardingWizard } from './OnboardingWizard';
import { SettingsManager } from './SettingsManager';
import {
  DashboardSkeleton,
  ProjectsManagerSkeleton,
  MediaLibrarySkeleton,
  BrandStudioSkeleton,
  GoogleDriveManagerSkeleton,
  EnquiriesManagerSkeleton,
  BookingFormSettingsSkeleton,
  ServicesManagerSkeleton,
  TestimonialsManagerSkeleton,
  WordPressManagerSkeleton,
  OnboardingWizardSkeleton,
  SettingsManagerSkeleton,
} from '../skeletons/admin';

interface AdminLayoutProps {
  onBackToPublic: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToPublic }) => {
  const { brandTheme, logout, enquiries } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [previewSkeleton, setPreviewSkeleton] = useState(false);

  // Project Modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleTabSwitch = (tabId: string) => {
    if (tabId === activeTab && !previewSkeleton) return;
    setIsTabTransitioning(true);
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
    setTimeout(() => {
      setIsTabTransitioning(false);
    }, 280);
  };

  const renderTabSkeleton = (tabId: string) => {
    switch (tabId) {
      case 'overview':
        return <DashboardSkeleton />;
      case 'projects':
        return <ProjectsManagerSkeleton />;
      case 'media':
        return <MediaLibrarySkeleton />;
      case 'branding':
        return <BrandStudioSkeleton />;
      case 'drive':
        return <GoogleDriveManagerSkeleton />;
      case 'enquiries':
        return <EnquiriesManagerSkeleton />;
      case 'booking-form':
        return <BookingFormSettingsSkeleton />;
      case 'services':
        return <ServicesManagerSkeleton />;
      case 'testimonials':
        return <TestimonialsManagerSkeleton />;
      case 'wordpress':
        return <WordPressManagerSkeleton />;
      case 'wizard':
        return <OnboardingWizardSkeleton />;
      case 'settings':
        return <SettingsManagerSkeleton />;
      default:
        return <DashboardSkeleton />;
    }
  };

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects Library', icon: <Film className="w-4 h-4" /> },
    { id: 'media', label: 'Media Assets & Stream Hub', icon: <Video className="w-4 h-4 text-cyan-400" /> },
    { id: 'branding', label: 'Brand Studio & Tokens', icon: <Palette className="w-4 h-4" /> },
    { id: 'drive', label: 'Google Drive Video Hub', icon: <Cloud className="w-4 h-4" /> },
    {
      id: 'enquiries',
      label: 'Client Enquiries Inbox',
      icon: <Inbox className="w-4 h-4" />,
      badge: newEnquiriesCount > 0 ? `${newEnquiriesCount}` : undefined,
    },
    { id: 'booking-form', label: 'Booking Form Config', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'services', label: 'Services & Rates', icon: <Layers className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Client Reviews', icon: <Quote className="w-4 h-4" /> },
    { id: 'wordpress', label: 'WordPress CMS Sync', icon: <Globe className="w-4 h-4" /> },
    { id: 'wizard', label: '12-Step Setup Wizard', icon: <ListChecks className="w-4 h-4 text-cyan-400" /> },
    { id: 'settings', label: 'Settings & Backups', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (p: Project) => {
    setEditingProject(p);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-neutral-900 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{
              backgroundColor: brandTheme.colors.primary,
              color: brandTheme.colors.buttonText,
            }}
          >
            <Film className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white">{brandTheme.brandName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewSkeleton(!previewSkeleton)}
            className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 font-medium transition-colors ${
              previewSkeleton
                ? 'bg-cyan-400 text-neutral-950 font-bold'
                : 'bg-white/10 text-neutral-300'
            }`}
            title="Toggle Skeleton preview"
          >
            <Eye className="w-3 h-3" />
            {previewSkeleton ? 'Skeleton ON' : 'Skeleton'}
          </button>
          <button
            onClick={onBackToPublic}
            className="px-2.5 py-1 rounded-lg bg-white/10 text-xs text-white flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" /> View Site
          </button>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-lg bg-white/5 text-neutral-300"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-neutral-900/95 border-r border-white/10 p-5 flex flex-col justify-between transition-transform duration-300 backdrop-blur-xl shrink-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-lg"
                style={{
                  backgroundColor: brandTheme.colors.primary,
                  color: brandTheme.colors.buttonText,
                }}
              >
                <Film className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block truncate">{brandTheme.brandName}</span>
                <span className="text-[10px] font-mono text-neutral-400">Admin CMS Studio</span>
              </div>
            </div>
          </div>

          {/* Quick Create Action */}
          <button
            onClick={handleOpenCreateProject}
            className="w-full py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            style={{
              backgroundColor: brandTheme.colors.primary,
              color: brandTheme.colors.buttonText,
            }}
          >
            <Plus className="w-4 h-4" /> New Project
          </button>

          {/* Navigation Items */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-320px)] pr-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSwitch(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm border border-white/10'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-cyan-400' : 'text-neutral-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-neutral-950 text-[10px] font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2 shrink-0">
          <button
            onClick={() => setPreviewSkeleton(!previewSkeleton)}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              previewSkeleton
                ? 'bg-cyan-500 text-neutral-950 font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle Skeleton Mode to test loaders"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5" />
              Skeleton Mode
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase ${previewSkeleton ? 'bg-neutral-950 text-cyan-400' : 'bg-white/10 text-neutral-400'}`}>
              {previewSkeleton ? 'Active' : 'Off'}
            </span>
          </button>

          <button
            onClick={onBackToPublic}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              View Public Website
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
        {isTabTransitioning || previewSkeleton ? (
          renderTabSkeleton(activeTab)
        ) : (
          <>
            {activeTab === 'overview' && (
              <AdminDashboardOverview
                onNavigateTab={(tab) => handleTabSwitch(tab)}
                onOpenNewProject={handleOpenCreateProject}
                onEditProject={handleOpenEditProject}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsListManager
                onOpenCreate={handleOpenCreateProject}
                onEditProject={handleOpenEditProject}
              />
            )}
            {activeTab === 'media' && <MediaLibraryManager />}
            {activeTab === 'branding' && <BrandStudio />}
            {activeTab === 'drive' && <GoogleDriveManager />}
            {activeTab === 'enquiries' && <EnquiriesManager />}
            {activeTab === 'booking-form' && <BookingFormSettings />}
            {activeTab === 'services' && <ServicesManager />}
            {activeTab === 'testimonials' && <TestimonialsManager />}
            {activeTab === 'wordpress' && <WordPressManager />}
            {activeTab === 'wizard' && (
              <OnboardingWizard onComplete={() => handleTabSwitch('overview')} />
            )}
            {activeTab === 'settings' && <SettingsManager />}
          </>
        )}
      </main>

      {/* Project Form Modal (Add / Edit) */}
      {isProjectModalOpen && (
        <ProjectFormModal
          project={editingProject}
          isOpen={isProjectModalOpen}
          onClose={() => {
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
          onSaved={() => {
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};
