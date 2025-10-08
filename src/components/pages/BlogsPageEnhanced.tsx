import { Calendar, Clock, User, ArrowRight, Search, TrendingUp, Sparkles, Zap, BookOpen, Target, Award, Lightbulb, Mail, MessageSquare, Share2 } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { AnimatedHeading } from '../AnimatedHeading';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BlogsPageEnhancedProps {
  onNavigate: (page: string) => void;
}

export function BlogsPageEnhanced({ onNavigate }: BlogsPageEnhancedProps) {
  const blogPosts = [
    {
      title: 'Top 10 Digital Marketing Trends for 2024',
      excerpt: 'Discover the latest digital marketing trends that will shape the industry in 2024 and how your business can leverage them.',
      date: 'Jan 15, 2024',
      readTime: '5 min read',
      category: 'Digital Marketing',
      author: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      icon: TrendingUp,
      color: 'blue' as const
    },
    {
      title: 'The Complete Guide to SEO in 2024',
      excerpt: 'Learn advanced SEO strategies to improve your search rankings and drive organic traffic to your website.',
      date: 'Jan 10, 2024',
      readTime: '8 min read',
      category: 'SEO',
      author: 'Rahul Verma',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800',
      icon: Target,
      color: 'green' as const
    },
    {
      title: 'Social Media Marketing: Best Practices',
      excerpt: 'Master social media marketing with proven strategies that increase engagement and convert followers into customers.',
      date: 'Jan 5, 2024',
      readTime: '6 min read',
      category: 'Social Media',
      author: 'Anjali Singh',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      icon: MessageSquare,
      color: 'purple' as const
    },
    {
      title: 'How to Create Effective Google Ads Campaigns',
      excerpt: 'Step-by-step guide to creating high-performing Google Ads campaigns that maximize ROI.',
      date: 'Dec 28, 2023',
      readTime: '7 min read',
      category: 'Google Ads',
      author: 'Amit Patel',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800',
      icon: Zap,
      color: 'yellow' as const
    },
    {
      title: 'Content Marketing Strategy for B2B Companies',
      excerpt: 'Develop a winning content marketing strategy that attracts and converts B2B customers.',
      date: 'Dec 20, 2023',
      readTime: '10 min read',
      category: 'Content Marketing',
      author: 'Neha Gupta',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      icon: BookOpen,
      color: 'orange' as const
    },
    {
      title: 'Email Marketing: Tips for Higher Open Rates',
      excerpt: 'Proven email marketing tactics to improve open rates, click-through rates, and conversions.',
      date: 'Dec 15, 2023',
      readTime: '5 min read',
      category: 'Email Marketing',
      author: 'Vishal Sharma',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800',
      icon: Mail,
      color: 'red' as const
    }
  ];

  const categories = [
    { name: 'All', icon: Sparkles, color: 'rainbow' as const },
    { name: 'Digital Marketing', icon: TrendingUp, color: 'blue' as const },
    { name: 'SEO', icon: Target, color: 'green' as const },
    { name: 'Social Media', icon: MessageSquare, color: 'purple' as const },
    { name: 'Google Ads', icon: Zap, color: 'yellow' as const },
    { name: 'Content Marketing', icon: BookOpen, color: 'orange' as const },
    { name: 'Email Marketing', icon: Mail, color: 'red' as const }
  ];

  const stats = [
    { icon: BookOpen, value: '250+', label: 'Blog Posts', color: 'blue' as const },
    { icon: User, value: '50K+', label: 'Monthly Readers', color: 'green' as const },
    { icon: Award, value: '15+', label: 'Industry Awards', color: 'purple' as const },
    { icon: Lightbulb, value: '100%', label: 'Actionable Insights', color: 'orange' as const }
  ];

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Animated Hero Header */}
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <div className="inline-flex items-center glass-premium px-6 py-3 rounded-full mb-6 hover-lift-md">
                <ColorfulIcon 
                  icon={Sparkles} 
                  color="rainbow" 
                  animation="pulse-glow" 
                  size={24}
                  className="mr-2"
                />
                <span className="body-md">Digital Marketing Insights & Trends</span>
              </div>

              <AnimatedHeading 
                as="h1" 
                animation="shimmer"
                className="heading-xl mb-6"
              >
                Knowledge That Drives Results
              </AnimatedHeading>

              <p className="body-lg max-w-3xl mx-auto mb-10 text-gray-600">
                Stay ahead of the curve with expert insights, proven strategies, and actionable tips 
                from India's leading digital marketing agency.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group glass-premium p-2 rounded-xl hover-lift-sm">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    type="text"
                    placeholder="Search for insights, strategies, tips..."
                    className="pl-14 pr-4 py-4 bg-transparent border-none focus:ring-0 body-md"
                  />
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-award">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Grid with Colorful Icons */}
          <ScrollReveal animation="stagger">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <InnovativeCard 
                  key={index}
                  effect="3d-tilt"
                  className="p-6 text-center hover-lift-md"
                >
                  <ColorfulIcon 
                    icon={stat.icon}
                    color={stat.color}
                    animation="pulse-glow"
                    size={48}
                    stagger={index + 1}
                    className="mb-4 mx-auto"
                  />
                  <div className="heading-lg mb-2">{stat.value}</div>
                  <div className="body-sm text-gray-600">{stat.label}</div>
                </InnovativeCard>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Category Filter with Animated Icons */}
      <section className="py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="glass-premium px-6 py-3 rounded-xl hover-lift-md transition-smooth flex items-center gap-3"
                >
                  <ColorfulIcon 
                    icon={category.icon}
                    color={category.color}
                    animation="float"
                    hoverAnimation="bounce"
                    size={20}
                  />
                  <span className="body-md">{category.name}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade">
            <AnimatedHeading 
              as="h2" 
              animation="gradient-sweep"
              className="heading-lg text-center mb-12"
            >
              Featured Article
            </AnimatedHeading>
          </ScrollReveal>

          <ScrollReveal animation="zoom">
            <InnovativeCard 
              effect="glow-border"
              className="overflow-hidden hover-lift-lg"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="badge-glass">
                      <ColorfulIcon 
                        icon={featuredPost.icon}
                        color={featuredPost.color}
                        size={16}
                        className="mr-2"
                      />
                      <span>{featuredPost.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <ColorfulIcon 
                    icon={featuredPost.icon}
                    color={featuredPost.color}
                    animation="pulse-glow"
                    size={48}
                    className="mb-6"
                  />
                  
                  <h3 className="heading-md mb-4">{featuredPost.title}</h3>
                  <p className="body-md text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center gap-6 mb-6 body-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>

                  <Button className="btn-award w-fit">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </InnovativeCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-left">
            <AnimatedHeading 
              as="h2" 
              animation="shimmer"
              className="heading-lg text-center mb-12"
            >
              Latest Insights
            </AnimatedHeading>
          </ScrollReveal>

          <ScrollReveal animation="stagger">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <InnovativeCard
                  key={index}
                  effect="expand"
                  className="overflow-hidden hover-lift-md group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="badge-glass">
                        <ColorfulIcon 
                          icon={post.icon}
                          color={post.color}
                          size={14}
                          className="mr-1"
                        />
                        <span className="text-xs">{post.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <ColorfulIcon 
                      icon={post.icon}
                      color={post.color}
                      animation="float"
                      hoverAnimation="bounce"
                      size={36}
                      className="mb-4"
                    />
                    
                    <h3 className="heading-sm mb-3 line-clamp-2">{post.title}</h3>
                    <p className="body-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4 body-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="body-xs">{post.author}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </InnovativeCard>
              ))}
            </div>
          </ScrollReveal>

          {/* Load More Button */}
          <ScrollReveal animation="fade">
            <div className="text-center mt-12">
              <Button className="btn-award btn-lg-award">
                Load More Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="zoom">
            <InnovativeCard 
              effect="particles"
              className="p-12 text-center hover-lift-md"
            >
              <ColorfulIcon 
                icon={Mail}
                color="rainbow"
                animation="heartbeat"
                size={64}
                className="mb-6 mx-auto"
              />
              
              <AnimatedHeading 
                as="h2" 
                animation="shimmer"
                className="heading-lg mb-4"
              >
                Never Miss an Update
              </AnimatedHeading>
              
              <p className="body-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Get the latest digital marketing insights, strategies, and trends delivered straight to your inbox every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input 
                  type="email"
                  placeholder="Enter your email address"
                  className="glass-input flex-1 px-6 py-4 body-md"
                />
                <Button className="btn-award">
                  Subscribe Now
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="body-xs text-gray-500 mt-4">
                Join 50,000+ marketers already subscribed. Unsubscribe anytime.
              </p>
            </InnovativeCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade">
            <AnimatedHeading 
              as="h2" 
              animation="gradient-sweep"
              className="heading-lg text-center mb-12"
            >
              Explore Topics
            </AnimatedHeading>
          </ScrollReveal>

          <ScrollReveal animation="stagger">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category, index) => (
                <InnovativeCard
                  key={index}
                  effect="magnetic"
                  className="p-6 text-center hover-lift-md cursor-pointer"
                >
                  <ColorfulIcon 
                    icon={category.icon}
                    color={category.color}
                    animation="swing"
                    hoverAnimation="jump"
                    size={40}
                    containerGradient
                    stagger={index + 1}
                    className="mb-4 mx-auto"
                  />
                  <h3 className="heading-sm">{category.name}</h3>
                  <p className="body-xs text-gray-600 mt-2">
                    {Math.floor(Math.random() * 30 + 10)} Articles
                  </p>
                </InnovativeCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade">
            <ColorfulIcon 
              icon={Lightbulb}
              color="yellow"
              animation="glow-pulse"
              size={72}
              className="mb-6 mx-auto"
            />
            
            <AnimatedHeading 
              as="h2" 
              animation="shimmer"
              className="heading-xl mb-6"
            >
              Ready to Transform Your Marketing?
            </AnimatedHeading>
            
            <p className="body-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Get expert guidance from our team of digital marketing specialists and start seeing results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-award btn-lg-award"
                onClick={() => onNavigate('contact')}
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                className="btn-outline-award btn-lg-award"
                onClick={() => onNavigate('services')}
              >
                View Our Services
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
