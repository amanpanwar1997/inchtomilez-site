import { useRef } from 'react';
import { ArrowLeft, Clock, Calendar, User, Eye } from 'lucide-react';
import { ReadingProgress } from '../blog/ReadingProgress';
import { TableOfContents } from '../blog/TableOfContents';
import { SocialShare } from '../blog/SocialShare';
import { RelatedPosts } from '../blog/RelatedPosts';
import { CommentsSection } from '../blog/CommentsSection';
import { ColorfulIcon } from '../ColorfulIcon';
import { useLanguage } from '../../contexts/LanguageContext';

interface BlogPostPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPostPage({ onNavigate }: BlogPostPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Sample blog post data
  const post = {
    id: 'sample-post-1',
    title: '10 Essential SEO Strategies for 2024',
    slug: '10-essential-seo-strategies-2024',
    excerpt: 'Discover the top SEO strategies that will help your business rank higher in search results and drive more organic traffic.',
    category: 'SEO',
    tags: ['SEO', 'Digital Marketing', 'Content Strategy'],
    author: {
      name: 'InchToMilez Team',
      avatar: '',
      bio: 'Digital marketing experts'
    },
    publishedAt: new Date('2024-01-15'),
    readingTime: 8,
    views: 1247,
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=600&fit=crop'
  };

  // Sample related posts
  const allPosts = [
    {
      id: 'post-2',
      title: 'Complete Guide to Google Ads',
      excerpt: 'Learn how to create effective Google Ads campaigns',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      category: 'Digital Marketing',
      tags: ['Google Ads', 'PPC', 'Digital Marketing'],
      readingTime: 10,
      views: 892
    },
    {
      id: 'post-3',
      title: 'Social Media Marketing Best Practices',
      excerpt: 'Master social media marketing with these proven strategies',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      category: 'Social Media',
      tags: ['Social Media', 'Marketing', 'Content Strategy'],
      readingTime: 6,
      views: 1054
    },
    {
      id: 'post-4',
      title: 'Content Marketing That Converts',
      excerpt: 'Create content that drives real business results',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
      category: 'Content Marketing',
      tags: ['Content', 'SEO', 'Marketing'],
      readingTime: 7,
      views: 763
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="container-award">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('blogs')}
          className="btn-outline-award btn-sm-award mb-8 hover-lift-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')} to Blog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-8 shadow-dramatic">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Badge */}
            <div className="badge-glass mb-4">
              <span className="body-sm">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="heading-xl mb-6">{post.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 body-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ColorfulIcon icon={User} color="blue" size={18} />
                <span>{post.author.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <ColorfulIcon icon={Calendar} color="green" size={18} />
                <span>
                  {post.publishedAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ColorfulIcon icon={Clock} color="orange" size={18} />
                <span>{post.readingTime} {t('blog.readingTime')}</span>
              </div>

              <div className="flex items-center gap-2">
                <ColorfulIcon icon={Eye} color="purple" size={18} />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Content */}
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none"
            >
              <h2 id="introduction">Introduction</h2>
              <p className="body-lg">
                Search Engine Optimization (SEO) continues to evolve, and staying ahead of the curve is crucial for online success. In this comprehensive guide, we'll explore the top 10 SEO strategies that will help your business dominate search results in 2024.
              </p>

              <h2 id="keyword-research">1. Advanced Keyword Research</h2>
              <p className="body-md">
                The foundation of any successful SEO strategy starts with thorough keyword research. Gone are the days of simply targeting high-volume keywords. Today's SEO requires a deep understanding of search intent and user behavior.
              </p>

              <h3 id="long-tail-keywords">Focus on Long-Tail Keywords</h3>
              <p className="body-md">
                Long-tail keywords are more specific phrases that visitors are more likely to use when they're closer to making a purchase. These keywords typically have lower competition and higher conversion rates.
              </p>

              <h2 id="content-quality">2. Create High-Quality Content</h2>
              <p className="body-md">
                Content remains king in the SEO world. Google's algorithms are increasingly sophisticated at identifying and rewarding genuinely helpful, well-written content that serves the user's needs.
              </p>

              <h3 id="e-e-a-t">Demonstrate E-E-A-T</h3>
              <p className="body-md">
                Google evaluates content based on Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). Make sure your content demonstrates these qualities through:
              </p>
              <ul className="body-md">
                <li>Author credentials and expertise</li>
                <li>Citations and references to authoritative sources</li>
                <li>Regular content updates</li>
                <li>Transparent business information</li>
              </ul>

              <h2 id="technical-seo">3. Optimize Technical SEO</h2>
              <p className="body-md">
                Technical SEO ensures that search engines can crawl, index, and understand your website properly. Key technical factors include:
              </p>

              <h3 id="site-speed">Site Speed</h3>
              <p className="body-md">
                Page speed is a critical ranking factor. Optimize your website's loading time by:
              </p>
              <ul className="body-md">
                <li>Compressing images</li>
                <li>Minifying CSS and JavaScript</li>
                <li>Leveraging browser caching</li>
                <li>Using a Content Delivery Network (CDN)</li>
              </ul>

              <h2 id="mobile-optimization">4. Mobile-First Optimization</h2>
              <p className="body-md">
                With Google's mobile-first indexing, your website must be fully optimized for mobile devices. This includes:
              </p>
              <ul className="body-md">
                <li>Responsive design</li>
                <li>Fast mobile loading speeds</li>
                <li>Touch-friendly navigation</li>
                <li>Readable text without zooming</li>
              </ul>

              <h2 id="user-experience">5. Enhance User Experience</h2>
              <p className="body-md">
                User experience (UX) signals are becoming increasingly important ranking factors. Focus on:
              </p>
              <ul className="body-md">
                <li>Clear navigation structure</li>
                <li>Engaging visual design</li>
                <li>Fast-loading pages</li>
                <li>Easy-to-read content</li>
                <li>Secure browsing (HTTPS)</li>
              </ul>

              <h2 id="conclusion">Conclusion</h2>
              <p className="body-lg">
                Implementing these SEO strategies will help your website rank higher in search results and attract more organic traffic. Remember, SEO is a long-term game that requires patience, consistency, and continuous optimization.
              </p>

              <p className="body-md">
                At InchToMilez, we specialize in creating comprehensive SEO strategies tailored to your business goals. Contact us today to learn how we can help your business achieve online success.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge-glass body-xs hover-lift-sm cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Share */}
            <div className="mt-12">
              <SocialShare
                url={`/blog/${post.slug}`}
                title={post.title}
                description={post.excerpt}
              />
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <RelatedPosts
                currentPostId={post.id}
                currentTags={post.tags}
                currentCategory={post.category}
                allPosts={allPosts}
                maxPosts={3}
              />
            </div>

            {/* Comments */}
            <div className="mt-16">
              <CommentsSection postId={post.id} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <TableOfContents contentRef={contentRef} />

              {/* Author Bio */}
              <div className="glass-card p-6 rounded-lg border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-sm">{post.author.name}</h3>
                    <p className="body-xs text-gray-500">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="glass-card p-6 rounded-lg border border-white/20">
                <h3 className="heading-sm mb-3">Subscribe to Newsletter</h3>
                <p className="body-sm mb-4">
                  Get the latest digital marketing tips delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="glass-input w-full p-3 rounded-lg body-sm mb-3"
                />
                <button className="btn-award w-full btn-sm-award">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
