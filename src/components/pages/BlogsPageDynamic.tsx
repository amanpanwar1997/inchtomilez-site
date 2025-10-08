import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GradientHeading } from '../GradientHeading';
import { getPublishedBlogPosts, searchBlogPosts, type BlogPost } from '../../utils/admin/adminStorageSupabase';
import { LoadingScreen } from '../LoadingScreen';
import { toast } from 'sonner@2.0.3';
import { Search, Calendar, Clock, User, Tag, TrendingUp } from 'lucide-react';

interface BlogsPageProps {
  onNavigate: (page: string) => void;
}

export function BlogsPageDynamic({ onNavigate }: BlogsPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load blog posts from Supabase
  useEffect(() => {
    let isMounted = true;
    
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedPosts = await getPublishedBlogPosts();
        
        if (!isMounted) return; // Prevent state update if component unmounted
        
        setPosts(fetchedPosts || []);
        setFilteredPosts(fetchedPosts || []);
        
        if (fetchedPosts && fetchedPosts.length === 0) {
          toast.info('No blog posts yet. Create your first post in the admin panel!');
        } else if (fetchedPosts) {
          console.log(`✅ Loaded ${fetchedPosts.length} published posts from Supabase`);
        }
      } catch (error) {
        console.error('Failed to load blog posts:', error);
        if (isMounted) {
          setError('Failed to load blog posts. Please try again.');
          toast.error('Failed to load blog posts. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    loadPosts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle search
  useEffect(() => {
    if (!posts || posts.length === 0) {
      setFilteredPosts([]);
      return;
    }

    let filtered = [...posts];

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      filtered = filtered.filter(
        post =>
          (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (post.tags && Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  // Get unique categories
  const categories = posts && posts.length > 0 
    ? ['All', ...Array.from(new Set(posts.map(post => post.category).filter(Boolean)))]
    : ['All'];

  // Featured post (most recent)
  const featuredPost = filteredPosts && filteredPosts.length > 0 ? filteredPosts[0] : null;

  if (loading) {
    return <LoadingScreen message="Loading blog posts..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="heading-lg mb-4 text-red-600">Error Loading Blogs</h2>
          <p className="body-md text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="btn-award">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-8 gap-6 rotate-12 scale-150">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-20 h-20 border border-black rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container-award relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <GradientHeading className="heading-xl mb-6">
              Insights & Resources
            </GradientHeading>
            <p className="body-lg mb-8 max-w-2xl mx-auto">
              Discover the latest trends, strategies, and insights in digital marketing, technology, and business growth.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 w-full glass-input border-0 focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-y border-gray-200">
        <div className="container-award">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container-award">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 lg:p-12 rounded-lg overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="badge-glass mb-4">
                    <TrendingUp className="w-4 h-4" />
                    <span>Featured</span>
                  </div>
                  <h2 className="heading-lg mb-4">{featuredPost.title}</h2>
                  <p className="body-lg mb-6">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-4 mb-6 body-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      {featuredPost.category}
                    </span>
                  </div>
                  <Button 
                    onClick={() => onNavigate('blog-post')} 
                    className="btn-award"
                  >
                    Read Article
                  </Button>
                </div>
                {featuredPost.featuredImage && (
                  <div className="rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-award">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="heading-md mb-4">No posts found</h3>
              <p className="body-md text-gray-600">
                {searchQuery || selectedCategory !== 'All'
                  ? 'Try adjusting your filters or search query.'
                  : 'No blog posts available yet.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card h-full flex flex-col overflow-hidden hover-lift-md">
                    {post.featuredImage && (
                      <div className="w-full h-48 overflow-hidden">
                        <ImageWithFallback
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="badge-glass mb-3 w-fit">
                        {post.category}
                      </div>
                      <h3 className="heading-sm mb-3">{post.title}</h3>
                      <p className="body-md mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-3 mb-4 body-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="badge-glass body-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <Button
                        onClick={() => onNavigate('blog-post')}
                        className="btn-award w-full"
                      >
                        Read More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-award text-center">
          <h2 className="heading-lg mb-4">Stay Updated</h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="glass-input"
            />
            <Button className="btn-award whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}