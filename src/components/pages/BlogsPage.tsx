import { Calendar, Clock, User, ArrowRight, Search, TrendingUp, Sparkles, Zap, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GradientHeading } from '../GradientHeading';

interface BlogsPageProps {
  onNavigate: (page: string) => void;
}

export function BlogsPage({ onNavigate }: BlogsPageProps) {
  const blogPosts = [
    {
      title: 'Top 10 Digital Marketing Trends for 2024',
      excerpt: 'Discover the latest digital marketing trends that will shape the industry in 2024 and how your business can leverage them.',
      date: 'Jan 15, 2024',
      readTime: '5 min read',
      category: 'Digital Marketing',
      author: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      title: 'The Complete Guide to SEO in 2024',
      excerpt: 'Learn advanced SEO strategies to improve your search rankings and drive organic traffic to your website.',
      date: 'Jan 10, 2024',
      readTime: '8 min read',
      category: 'SEO',
      author: 'Rahul Verma',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800'
    },
    {
      title: 'Social Media Marketing: Best Practices',
      excerpt: 'Master social media marketing with proven strategies that increase engagement and convert followers into customers.',
      date: 'Jan 5, 2024',
      readTime: '6 min read',
      category: 'Social Media',
      author: 'Anjali Singh',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800'
    },
    {
      title: 'How to Create Effective Google Ads Campaigns',
      excerpt: 'Step-by-step guide to creating high-performing Google Ads campaigns that maximize ROI.',
      date: 'Dec 28, 2023',
      readTime: '7 min read',
      category: 'Google Ads',
      author: 'Amit Patel',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800'
    },
    {
      title: 'Content Marketing Strategy for B2B Companies',
      excerpt: 'Develop a winning content marketing strategy that attracts and converts B2B customers.',
      date: 'Dec 20, 2023',
      readTime: '10 min read',
      category: 'Content Marketing',
      author: 'Neha Gupta',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
    },
    {
      title: 'Email Marketing: Tips for Higher Open Rates',
      excerpt: 'Proven email marketing tactics to improve open rates, click-through rates, and conversions.',
      date: 'Dec 15, 2023',
      readTime: '5 min read',
      category: 'Email Marketing',
      author: 'Vishal Sharma',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800'
    }
  ];

  const categories = [
    'All',
    'Digital Marketing',
    'SEO',
    'Social Media',
    'Google Ads',
    'Content Marketing',
    'Email Marketing'
  ];

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen text-black bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-8 gap-6 rotate-12 scale-150">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-20 h-20 border border-black rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 glass rounded-full mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-[#baff00] mr-2 animate-icon-pulse" />
              <span className="text-black">Digital Marketing Insights & Trends</span>
            </motion.div>

            <GradientHeading 
              text="Knowledge That Drives Results"
              className="mb-6"
            />

            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Stay ahead of the curve with expert insights, proven strategies, and actionable tips 
              from India's leading digital marketing agency.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#baff00] transition-colors" />
                <Input
                  type="text"
                  placeholder="Search for game-changing insights..."
                  className="pl-12 py-6 border-2 border-gray-200 focus:border-[#baff00] rounded-full shadow-lg hover:shadow-xl transition-all"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <TrendingUp className="h-6 w-6 text-black mr-3" />
              </motion.div>
              <h2 className="text-3xl text-black">
                Featured Article
              </h2>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden glass-card border-2 border-gray-200 hover:border-[#baff00] hover:shadow-dramatic transition-all">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute top-4 left-4">
                      <motion.div
                        className="px-4 py-2 bg-black text-white rounded-full text-xs flex items-center gap-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <Zap className="h-3 w-3 text-[#baff00]" />
                        {featuredPost.category}
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl lg:text-4xl text-black mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-base text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-[#baff00]" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-[#baff00]" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-[#baff00]" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-black text-white hover:bg-[#baff00] hover:text-black w-fit px-8 py-6 rounded-full shadow-lg btn-hover-shimmer">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-6 py-3 rounded-full border-2 text-sm transition-all ${
                  index === 0
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-[#baff00] hover:bg-[#baff00] hover:text-black'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="h-8 w-8 text-[#baff00]" />
              </motion.div>
              <GradientHeading 
                text="Latest Insights"
                className="mb-0"
              />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert insights and actionable strategies to accelerate your digital growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden glass-card border-2 border-gray-200 hover:border-[#baff00] hover:shadow-dramatic transition-all h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 bg-black text-white rounded-full text-xs">
                          {post.category}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl text-black mb-3">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-t border-gray-200 pt-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-black text-black hover:bg-[#baff00] hover:border-[#baff00] hover:text-black"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-black rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <Zap className="h-12 w-12 text-[#baff00]" />
            </motion.div>

            <h2 className="text-4xl lg:text-6xl mb-6 text-white">
              Ready to Dominate Your Market?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Transform your digital presence with strategies that actually work. 
              Let's create marketing magic together.
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#baff00] text-black hover:bg-white px-10 py-6 text-lg rounded-full shadow-lg btn-hover-shimmer"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('services')}
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg rounded-full shadow-lg"
                >
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}