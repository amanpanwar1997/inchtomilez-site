import { ArrowRight, Clock, Eye } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import { calculateReadingTime } from '../../utils/blog/blogUtils';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  tags: string[];
  readingTime?: number;
  views?: number;
}

interface RelatedPostsProps {
  currentPostId: string;
  currentTags: string[];
  currentCategory: string;
  allPosts: Post[];
  maxPosts?: number;
}

export function RelatedPosts({
  currentPostId,
  currentTags,
  currentCategory,
  allPosts,
  maxPosts = 3
}: RelatedPostsProps) {
  const { t } = useLanguage();

  // Calculate relevance score for each post
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .map(post => {
      let score = 0;
      
      // Same category: +3 points
      if (post.category === currentCategory) score += 3;
      
      // Matching tags: +1 point per tag
      const matchingTags = post.tags.filter(tag => currentTags.includes(tag));
      score += matchingTags.length;
      
      return { ...post, relevanceScore: score };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="glass-card p-8 rounded-lg border border-white/20">
      <h2 className="heading-lg mb-6">{t('blog.relatedPosts')}</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <div
            key={post.id}
            className="glass-subtle rounded-lg overflow-hidden hover-lift-md transition-smooth cursor-pointer"
          >
            {/* Image */}
            {post.image && (
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            )}

            <div className="p-4">
              {/* Category Badge */}
              <div className="badge-glass mb-3">
                <span className="body-xs">{post.category}</span>
              </div>

              {/* Title */}
              <h3 className="heading-sm mb-2 line-clamp-2">{post.title}</h3>

              {/* Excerpt */}
              <p className="body-sm text-gray-600 mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 body-xs text-gray-500 mb-4">
                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime} {t('blog.readingTime')}</span>
                  </div>
                )}
                {post.views && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.views}</span>
                  </div>
                )}
              </div>

              {/* Read More Link */}
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 body-sm font-semibold transition-colors">
                <span>{t('blog.readMore')}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
