// Blog Post Utilities

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt?: Date;
  views: number;
  readingTime?: number;
}

export interface TOCItem {
  id: string;
  level: number;
  text: string;
  link: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: Date;
  replies?: Comment[];
  upvotes: number;
}

// Calculate reading time (words per minute = 200)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

// Generate table of contents from markdown headings
export function generateTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;
  let index = 0;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length - 1; // Convert ## to level 1, ### to level 2
    const text = match[2].trim();
    const id = `heading-${index}`;
    const link = `#${id}`;

    headings.push({ id, level, text, link });
    index++;
  }

  return headings;
}

// Extract excerpt from content
export function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content.replace(/[#*_~`]/g, '').trim();
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength).trim() + '...';
}

// Get related posts based on tags and category
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      let score = 0;
      
      // Same category: +3 points
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // Shared tags: +1 point per tag
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length;
      
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

// Format date for display
export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Format relative time (e.g., "2 days ago")
export function formatRelativeTime(date: Date, locale: string = 'en'): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      return rtf.format(-count, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return 'just now';
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Search posts by title, content, tags
export function searchPosts(
  posts: BlogPost[],
  query: string
): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery);
    const excerptMatch = post.excerpt.toLowerCase().includes(lowerQuery);
    const tagsMatch = post.tags.some(tag => 
      tag.toLowerCase().includes(lowerQuery)
    );
    const categoryMatch = post.category.toLowerCase().includes(lowerQuery);
    
    return titleMatch || excerptMatch || tagsMatch || categoryMatch;
  });
}

// Filter posts by category
export function filterByCategory(
  posts: BlogPost[],
  category: string
): BlogPost[] {
  if (category === 'all') return posts;
  return posts.filter(post => post.category === category);
}

// Filter posts by tag
export function filterByTag(
  posts: BlogPost[],
  tag: string
): BlogPost[] {
  return posts.filter(post => post.tags.includes(tag));
}

// Get all unique categories
export function getAllCategories(posts: BlogPost[]): string[] {
  const categories = posts.map(post => post.category);
  return Array.from(new Set(categories)).sort();
}

// Get all unique tags
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

// Get popular tags (top 10 by frequency)
export function getPopularTags(posts: BlogPost[], limit: number = 10): Array<{ tag: string; count: number }> {
  const tagCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// Sort posts
export function sortPosts(
  posts: BlogPost[],
  sortBy: 'date' | 'views' | 'title' = 'date'
): BlogPost[] {
  const sorted = [...posts];
  
  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => 
        b.publishedAt.getTime() - a.publishedAt.getTime()
      );
    case 'views':
      return sorted.sort((a, b) => b.views - a.views);
    case 'title':
      return sorted.sort((a, b) => 
        a.title.localeCompare(b.title)
      );
    default:
      return sorted;
  }
}

// Paginate posts
export function paginatePosts(
  posts: BlogPost[],
  page: number = 1,
  perPage: number = 9
): { posts: BlogPost[]; totalPages: number; currentPage: number } {
  const totalPages = Math.ceil(posts.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    posts: posts.slice(start, end),
    totalPages,
    currentPage: page
  };
}

// Increment view count
export function incrementViews(postId: string): void {
  const key = `blog_views`;
  const views = JSON.parse(localStorage.getItem(key) || '{}');
  views[postId] = (views[postId] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(views));
}

// Get view count
export function getViewCount(postId: string): number {
  const key = `blog_views`;
  const views = JSON.parse(localStorage.getItem(key) || '{}');
  return views[postId] || 0;
}

// Check if post is bookmarked
export function isBookmarked(postId: string): boolean {
  const key = `blog_bookmarks`;
  const bookmarks = JSON.parse(localStorage.getItem(key) || '[]');
  return bookmarks.includes(postId);
}

// Toggle bookmark
export function toggleBookmark(postId: string): boolean {
  const key = `blog_bookmarks`;
  let bookmarks = JSON.parse(localStorage.getItem(key) || '[]');
  
  if (bookmarks.includes(postId)) {
    bookmarks = bookmarks.filter((id: string) => id !== postId);
    localStorage.setItem(key, JSON.stringify(bookmarks));
    return false;
  } else {
    bookmarks.push(postId);
    localStorage.setItem(key, JSON.stringify(bookmarks));
    return true;
  }
}

// Get all bookmarked posts
export function getBookmarkedPosts(allPosts: BlogPost[]): BlogPost[] {
  const key = `blog_bookmarks`;
  const bookmarks = JSON.parse(localStorage.getItem(key) || '[]');
  return allPosts.filter(post => bookmarks.includes(post.id));
}

// Save reading history
export function saveToHistory(postId: string): void {
  const key = `blog_history`;
  let history = JSON.parse(localStorage.getItem(key) || '[]');
  
  // Remove if already exists
  history = history.filter((id: string) => id !== postId);
  
  // Add to beginning
  history.unshift(postId);
  
  // Keep only last 50
  history = history.slice(0, 50);
  
  localStorage.setItem(key, JSON.stringify(history));
}

// Get reading history
export function getReadingHistory(allPosts: BlogPost[]): BlogPost[] {
  const key = `blog_history`;
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  
  return history
    .map((id: string) => allPosts.find(post => post.id === id))
    .filter(Boolean);
}