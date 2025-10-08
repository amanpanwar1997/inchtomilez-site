/**
 * Supabase Client Configuration
 * Frontend client for making API calls to the server
 */

import { projectId, publicAnonKey } from './info';

// Server endpoint base URL
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf`;

/**
 * Make authenticated API request to Supabase server with timeout
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 15000 // 15 second timeout
): Promise<{ data: T | null; error: string | null }> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error [${endpoint}]:`, errorText);
        return {
          data: null,
          error: errorText || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Check if it was a timeout
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error(`Request timeout [${endpoint}] after ${timeoutMs}ms`);
        return {
          data: null,
          error: `Request timed out after ${timeoutMs / 1000} seconds. Please check your connection and try again.`,
        };
      }
      
      throw fetchError; // Re-throw other errors to outer catch
    }
  } catch (error) {
    console.error(`Network Error [${endpoint}]:`, error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

/**
 * API Methods for Blog Posts
 */
export const blogAPI = {
  // Get all blog posts
  getAll: async () => {
    return apiRequest('/api/blog/posts', {
      method: 'GET',
    });
  },

  // Get single blog post by ID
  getById: async (id: string) => {
    return apiRequest(`/api/blog/posts/${id}`, {
      method: 'GET',
    });
  },

  // Create new blog post
  create: async (post: any) => {
    return apiRequest('/api/blog/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  // Update blog post
  update: async (id: string, post: any) => {
    return apiRequest(`/api/blog/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  },

  // Delete blog post
  delete: async (id: string) => {
    return apiRequest(`/api/blog/posts/${id}`, {
      method: 'DELETE',
    });
  },

  // Search blog posts
  search: async (query: string) => {
    return apiRequest(`/api/blog/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
    });
  },

  // Get published posts only (for public display)
  getPublished: async () => {
    return apiRequest('/api/blog/published', {
      method: 'GET',
    });
  },
};

/**
 * API Methods for Theme Settings
 */
export const themeAPI = {
  get: async () => {
    return apiRequest('/api/theme', { method: 'GET' });
  },

  update: async (settings: any) => {
    return apiRequest('/api/theme', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

/**
 * API Methods for Website Settings
 */
export const websiteAPI = {
  get: async () => {
    return apiRequest('/api/website', { method: 'GET' });
  },

  update: async (settings: any) => {
    return apiRequest('/api/website', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

/**
 * API Methods for SEO Settings
 */
export const seoAPI = {
  get: async () => {
    return apiRequest('/api/seo', { method: 'GET' });
  },

  update: async (settings: any) => {
    return apiRequest('/api/seo', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

/**
 * API Methods for Analytics
 */
export const analyticsAPI = {
  get: async () => {
    return apiRequest('/api/analytics', { method: 'GET' });
  },

  trackPageView: async (page: string) => {
    return apiRequest('/api/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify({ page }),
    });
  },
};

/**
 * API Methods for Backups
 */
export const backupAPI = {
  getAll: async () => {
    return apiRequest('/api/backups', { method: 'GET' });
  },

  create: async (name?: string) => {
    return apiRequest('/api/backups', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  restore: async (backupId: string) => {
    return apiRequest(`/api/backups/${backupId}/restore`, {
      method: 'POST',
    });
  },

  delete: async (backupId: string) => {
    return apiRequest(`/api/backups/${backupId}`, {
      method: 'DELETE',
    });
  },

  export: async () => {
    return apiRequest('/api/backups/export', { method: 'GET' });
  },
};