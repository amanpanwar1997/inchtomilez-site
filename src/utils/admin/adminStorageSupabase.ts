/**
 * Admin Panel Supabase Storage
 * Complete data persistence using Supabase backend
 */

import { blogAPI, themeAPI, websiteAPI, seoAPI, analyticsAPI, backupAPI } from '../supabase/client';

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
  createdAt?: string;
  updatedAt?: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await blogAPI.getAll();
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await blogAPI.getPublished();
    if (error) {
      console.error('Error fetching published posts:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Failed to fetch published posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await blogAPI.getById(id);
    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

export async function saveBlogPost(post: BlogPost): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  try {
    // Generate slug if not provided
    if (!post.slug) {
      post.slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    // Check if post exists (has ID and we're updating)
    if (post.id && post.id !== `post-${Date.now()}`) {
      const { data, error } = await blogAPI.update(post.id, post);
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } else {
      // Create new post
      const { data, error } = await blogAPI.create(post);
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    }
  } catch (error) {
    console.error('Failed to save blog post:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await blogAPI.delete(id);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await blogAPI.search(query);
    if (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Failed to search blog posts:', error);
    return [];
  }
}

export function filterBlogPosts(posts: BlogPost[], status: string): BlogPost[] {
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

export async function getThemeSettings(): Promise<ThemeSettings> {
  try {
    const { data, error } = await themeAPI.get();
    if (error) {
      console.error('Error fetching theme settings:', error);
      return getDefaultThemeSettings();
    }
    return data || getDefaultThemeSettings();
  } catch (error) {
    console.error('Failed to fetch theme settings:', error);
    return getDefaultThemeSettings();
  }
}

export async function saveThemeSettings(settings: ThemeSettings): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await themeAPI.update(settings);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to save theme settings:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function getDefaultThemeSettings(): ThemeSettings {
  return {
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
  };
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

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const { data, error } = await websiteAPI.get();
    if (error) {
      console.error('Error fetching website settings:', error);
      return getDefaultWebsiteSettings();
    }
    return data || getDefaultWebsiteSettings();
  } catch (error) {
    console.error('Failed to fetch website settings:', error);
    return getDefaultWebsiteSettings();
  }
}

export async function saveWebsiteSettings(settings: WebsiteSettings): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await websiteAPI.update(settings);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to save website settings:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function getDefaultWebsiteSettings(): WebsiteSettings {
  return {
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
  };
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

export async function getSEOSettings(): Promise<SEOSettings> {
  try {
    const { data, error } = await seoAPI.get();
    if (error) {
      console.error('Error fetching SEO settings:', error);
      return getDefaultSEOSettings();
    }
    return data || getDefaultSEOSettings();
  } catch (error) {
    console.error('Failed to fetch SEO settings:', error);
    return getDefaultSEOSettings();
  }
}

export async function saveSEOSettings(settings: SEOSettings): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await seoAPI.update(settings);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to save SEO settings:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function getDefaultSEOSettings(): SEOSettings {
  return {
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
  };
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

export async function getAnalytics(): Promise<Analytics> {
  try {
    const { data, error } = await analyticsAPI.get();
    if (error) {
      console.error('Error fetching analytics:', error);
      return getDefaultAnalytics();
    }
    return data || getDefaultAnalytics();
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return getDefaultAnalytics();
  }
}

export async function trackPageView(page: string): Promise<void> {
  try {
    await analyticsAPI.trackPageView(page);
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

function getDefaultAnalytics(): Analytics {
  return {
    pageViews: {},
    visitors: [],
    topPages: [],
    referrers: []
  };
}

// ========================================
// BACKUP & EXPORT
// ========================================

export interface Backup {
  id: string;
  name: string;
  date: string;
  data: {
    posts: BlogPost[];
    theme: ThemeSettings;
    website: WebsiteSettings;
    seo: SEOSettings;
  };
}

export async function getAllBackups(): Promise<Backup[]> {
  try {
    const { data, error } = await backupAPI.getAll();
    if (error) {
      console.error('Error fetching backups:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Failed to fetch backups:', error);
    return [];
  }
}

export async function createBackup(name?: string): Promise<{ success: boolean; data?: Backup; error?: string }> {
  try {
    const { data, error } = await backupAPI.create(name);
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Failed to create backup:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function restoreBackup(backupId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await backupAPI.restore(backupId);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to restore backup:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteBackup(backupId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await backupAPI.delete(backupId);
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to delete backup:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function exportAllData(): Promise<void> {
  try {
    const { data, error } = await backupAPI.export();
    if (error) {
      console.error('Error exporting data:', error);
      return;
    }
    
    // Create downloadable JSON file
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inchtomilez-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
}