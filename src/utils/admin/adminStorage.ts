/**
 * Admin Panel localStorage Management
 * Complete data persistence for all admin features
 */

import { safeStorage } from '../errorHandler';

// Storage Keys
const KEYS = {
  BLOG_POSTS: 'admin_blog_posts',
  THEME_SETTINGS: 'admin_theme_settings',
  WEBSITE_SETTINGS: 'admin_website_settings',
  SEO_SETTINGS: 'admin_seo_settings',
  USERS: 'admin_users',
  ANALYTICS: 'admin_analytics',
  BACKUPS: 'admin_backups'
};

// ========================================
// BLOG POST MANAGEMENT
// ========================================

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  date: string;
  publishedDate?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  views: number;
  likes: number;
  slug: string;
}

export function getAllBlogPosts(): BlogPost[] {
  return safeStorage.get(KEYS.BLOG_POSTS, []);
}

export function getBlogPost(id: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(p => p.id === id) || null;
}

export function saveBlogPost(post: BlogPost): boolean {
  const posts = getAllBlogPosts();
  const index = posts.findIndex(p => p.id === post.id);
  
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
  
  return safeStorage.set(KEYS.BLOG_POSTS, posts);
}

export function deleteBlogPost(id: string): boolean {
  const posts = getAllBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  return safeStorage.set(KEYS.BLOG_POSTS, filtered);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getAllBlogPosts();
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterBlogPosts(status: string): BlogPost[] {
  const posts = getAllBlogPosts();
  
  if (status === 'all') return posts;
  return posts.filter(post => post.status === status);
}

// ========================================
// THEME MANAGEMENT
// ========================================

export interface ThemeSettings {
  typography: {
    headingFont: string;
    bodyFont: string;
    headingWeight: number;
    bodyWeight: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  buttonStyle: {
    radius: number;
    padding: number;
    shadow: 'none' | 'small' | 'medium' | 'large';
  };
  darkMode: boolean;
  customCSS?: string;
}

export function getThemeSettings(): ThemeSettings {
  return safeStorage.get(KEYS.THEME_SETTINGS, {
    typography: {
      headingFont: 'Antonio',
      bodyFont: 'Raleway',
      headingWeight: 700,
      bodyWeight: 400
    },
    colors: {
      primary: '#1a1a1a',
      secondary: '#404040',
      accent: '#666666',
      background: '#ffffff'
    },
    buttonStyle: {
      radius: 10,
      padding: 12,
      shadow: 'medium'
    },
    darkMode: false
  });
}

export function saveThemeSettings(settings: ThemeSettings): boolean {
  return safeStorage.set(KEYS.THEME_SETTINGS, settings);
}

export function resetThemeSettings(): boolean {
  safeStorage.remove(KEYS.THEME_SETTINGS);
  return true;
}

// ========================================
// WEBSITE SETTINGS
// ========================================

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  businessHours: string;
  features: {
    comments: boolean;
    newsletter: boolean;
    chatbot: boolean;
    pwa: boolean;
  };
}

export function getWebsiteSettings(): WebsiteSettings {
  return safeStorage.get(KEYS.WEBSITE_SETTINGS, {
    siteName: 'InchToMilez',
    tagline: '360° Digital Marketing + IT + Media Solutions',
    contactEmail: 'info@inchtomilez.com',
    contactPhone: '+91-9009970709',
    address: 'Indore, Madhya Pradesh, India',
    socialMedia: {
      facebook: 'https://facebook.com/inchtomilez',
      twitter: 'https://twitter.com/inchtomilez',
      instagram: 'https://instagram.com/inchtomilez',
      linkedin: 'https://linkedin.com/company/inchtomilez'
    },
    businessHours: 'Mon-Sat, 9AM - 7PM IST',
    features: {
      comments: true,
      newsletter: true,
      chatbot: true,
      pwa: true
    }
  });
}

export function saveWebsiteSettings(settings: WebsiteSettings): boolean {
  return safeStorage.set(KEYS.WEBSITE_SETTINGS, settings);
}

// ========================================
// SEO SETTINGS
// ========================================

export interface SEOSettings {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  og: {
    image?: string;
    type: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
  };
  sitemap: {
    enabled: boolean;
    frequency: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
  };
}

export function getSEOSettings(): SEOSettings {
  return safeStorage.get(KEYS.SEO_SETTINGS, {
    meta: {
      title: 'InchToMilez - Digital Marketing Agency',
      description: '360° Digital Marketing, IT, and Media Solutions',
      keywords: 'digital marketing, SEO, social media, web development'
    },
    og: {
      type: 'website'
    },
    analytics: {},
    sitemap: {
      enabled: true,
      frequency: 'weekly'
    },
    robots: {
      index: true,
      follow: true
    }
  });
}

export function saveSEOSettings(settings: SEOSettings): boolean {
  return safeStorage.set(KEYS.SEO_SETTINGS, settings);
}

// ========================================
// USER MANAGEMENT
// ========================================

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export function getAllUsers(): User[] {
  return safeStorage.get(KEYS.USERS, [
    {
      id: '1',
      username: 'admin',
      email: 'admin@inchtomilez.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString()
    }
  ]);
}

export function saveUser(user: User): boolean {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === user.id);
  
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  
  return safeStorage.set(KEYS.USERS, users);
}

export function deleteUser(id: string): boolean {
  const users = getAllUsers();
  const filtered = users.filter(u => u.id !== id);
  return safeStorage.set(KEYS.USERS, filtered);
}

// ========================================
// ANALYTICS
// ========================================

export interface Analytics {
  pageViews: { [page: string]: number };
  visitors: { date: string; count: number }[];
  topPages: { page: string; views: number }[];
  referrers: { source: string; visits: number }[];
}

export function getAnalytics(): Analytics {
  return safeStorage.get(KEYS.ANALYTICS, {
    pageViews: {},
    visitors: [],
    topPages: [],
    referrers: []
  });
}

export function trackPageView(page: string): void {
  const analytics = getAnalytics();
  
  // Update page views
  analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;
  
  // Update top pages
  const topPages = Object.entries(analytics.pageViews)
    .map(([page, views]) => ({ page, views: views as number }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
  
  analytics.topPages = topPages;
  
  // Update visitors count for today
  const today = new Date().toISOString().split('T')[0];
  const todayVisitor = analytics.visitors.find(v => v.date === today);
  
  if (todayVisitor) {
    todayVisitor.count++;
  } else {
    analytics.visitors.push({ date: today, count: 1 });
  }
  
  // Keep only last 30 days
  analytics.visitors = analytics.visitors.slice(-30);
  
  safeStorage.set(KEYS.ANALYTICS, analytics);
}

// ========================================
// BACKUP & EXPORT
// ========================================

export interface Backup {
  id: string;
  name: string;
  date: string;
  size: number;
  data: {
    posts: BlogPost[];
    theme: ThemeSettings;
    website: WebsiteSettings;
    seo: SEOSettings;
    users: User[];
  };
}

export function createBackup(name?: string): Backup {
  const backup: Backup = {
    id: `backup-${Date.now()}`,
    name: name || `Backup ${new Date().toLocaleDateString()}`,
    date: new Date().toISOString(),
    size: 0,
    data: {
      posts: getAllBlogPosts(),
      theme: getThemeSettings(),
      website: getWebsiteSettings(),
      seo: getSEOSettings(),
      users: getAllUsers()
    }
  };
  
  // Calculate size
  const dataString = JSON.stringify(backup.data);
  backup.size = new Blob([dataString]).size;
  
  // Save backup
  const backups = getAllBackups();
  backups.push(backup);
  safeStorage.set(KEYS.BACKUPS, backups);
  
  return backup;
}

export function getAllBackups(): Backup[] {
  return safeStorage.get(KEYS.BACKUPS, []);
}

export function restoreBackup(backupId: string): boolean {
  const backups = getAllBackups();
  const backup = backups.find(b => b.id === backupId);
  
  if (!backup) return false;
  
  // Restore all data
  safeStorage.set(KEYS.BLOG_POSTS, backup.data.posts);
  safeStorage.set(KEYS.THEME_SETTINGS, backup.data.theme);
  safeStorage.set(KEYS.WEBSITE_SETTINGS, backup.data.website);
  safeStorage.set(KEYS.SEO_SETTINGS, backup.data.seo);
  safeStorage.set(KEYS.USERS, backup.data.users);
  
  return true;
}

export function deleteBackup(backupId: string): boolean {
  const backups = getAllBackups();
  const filtered = backups.filter(b => b.id !== backupId);
  return safeStorage.set(KEYS.BACKUPS, filtered);
}

export function exportBackup(backupId: string): void {
  const backups = getAllBackups();
  const backup = backups.find(b => b.id === backupId);
  
  if (!backup) return;
  
  // Create downloadable JSON file
  const dataStr = JSON.stringify(backup, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${backup.name}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importBackup(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target?.result as string);
        
        // Validate backup structure
        if (!backup.data || !backup.id) {
          reject(new Error('Invalid backup file'));
          return;
        }
        
        // Save backup
        const backups = getAllBackups();
        backups.push(backup);
        safeStorage.set(KEYS.BACKUPS, backups);
        
        resolve(true);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

export function exportAllData(): void {
  const data = {
    posts: getAllBlogPosts(),
    theme: getThemeSettings(),
    website: getWebsiteSettings(),
    seo: getSEOSettings(),
    users: getAllUsers(),
    analytics: getAnalytics(),
    exportedAt: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `inchtomilez-export-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function clearAllAdminData(): boolean {
  Object.values(KEYS).forEach(key => {
    safeStorage.remove(key);
  });
  return true;
}

export function getStorageSize(): string {
  let totalSize = 0;
  
  Object.values(KEYS).forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      totalSize += new Blob([data]).size;
    }
  });
  
  // Format bytes to human readable
  if (totalSize === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(totalSize) / Math.log(k));
  return Math.round(totalSize / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
