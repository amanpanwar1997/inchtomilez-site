import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, Filter, ExternalLink, Award, TrendingUp, Users,
  Smartphone, Globe, ShoppingCart, Heart, Utensils, Dumbbell
} from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData } from '../StructuredData';
import { TiltCard3D } from '../TiltCard3D';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: Briefcase },
    { id: 'web', label: 'Web Development', icon: Globe },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
    { id: 'branding', label: 'Branding', icon: Award }
  ];

  const projects = [
    {
      id: 1,
      title: 'Luxury Fashion E-Commerce Platform',
      category: 'ecommerce',
      client: 'StyleHub Boutique',
      industry: 'Fashion & Retail',
      description: 'Complete digital transformation including website redesign, SEO optimization, and social media strategy.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      tags: ['Website', 'SEO', 'Branding'],
      results: [
        { metric: '250%', label: 'Increase in Online Sales' },
        { metric: '180%', label: 'Growth in Traffic' },
        { metric: '4.8', label: 'Customer Rating' }
      ],
      icon: ShoppingCart
    },
    {
      id: 2,
      title: 'Healthcare Mobile Application',
      category: 'mobile',
      client: 'MediCare Plus',
      industry: 'Healthcare',
      description: 'iOS and Android app development for appointment scheduling, telemedicine, and patient records management.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
      tags: ['Mobile App', 'UI/UX', 'Development'],
      results: [
        { metric: '50K+', label: 'Active Users' },
        { metric: '4.9', label: 'App Store Rating' },
        { metric: '90%', label: 'User Retention' }
      ],
      icon: Heart
    },
    {
      id: 3,
      title: 'Restaurant Chain Digital Presence',
      category: 'web',
      client: 'Spice Garden Restaurants',
      industry: 'Food & Beverage',
      description: 'Multi-location website with online ordering, table reservation system, and loyalty program integration.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      tags: ['Website', 'Online Ordering', 'Marketing'],
      results: [
        { metric: '300%', label: 'Online Orders' },
        { metric: '15K+', label: 'Loyalty Members' },
        { metric: '85%', label: 'Customer Satisfaction' }
      ],
      icon: Utensils
    },
    {
      id: 4,
      title: 'Fitness Brand Identity & Marketing',
      category: 'branding',
      client: 'PowerFit Gyms',
      industry: 'Health & Fitness',
      description: 'Complete rebranding including logo design, brand guidelines, marketing collateral, and social media campaigns.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
      tags: ['Branding', 'Design', 'Social Media'],
      results: [
        { metric: '200%', label: 'Brand Awareness' },
        { metric: '500%', label: 'Social Engagement' },
        { metric: '40%', label: 'Membership Growth' }
      ],
      icon: Dumbbell
    },
    {
      id: 5,
      title: 'Real Estate Portal Development',
      category: 'web',
      client: 'PropVision Realty',
      industry: 'Real Estate',
      description: 'Property listing portal with advanced search, virtual tours, mortgage calculator, and CRM integration.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      tags: ['Web Portal', 'Development', 'SEO'],
      results: [
        { metric: '1M+', label: 'Monthly Visitors' },
        { metric: '2500+', label: 'Property Listings' },
        { metric: '65%', label: 'Lead Conversion' }
      ],
      icon: Globe
    },
    {
      id: 6,
      title: 'Education Platform Mobile App',
      category: 'mobile',
      client: 'LearnHub Academy',
      industry: 'Education',
      description: 'Interactive learning app with video courses, quizzes, progress tracking, and community features.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
      tags: ['Mobile App', 'EdTech', 'UI/UX'],
      results: [
        { metric: '100K+', label: 'Student Users' },
        { metric: '500+', label: 'Courses Available' },
        { metric: '92%', label: 'Completion Rate' }
      ],
      icon: Smartphone
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Portfolio - Award-Winning Projects | InchToMilez Indore"
        description="Explore our portfolio of successful digital marketing, web development, and branding projects. See how we've helped businesses in Indore achieve remarkable growth."
        keywords="portfolio, case studies, client work, digital marketing projects indore, website development portfolio"
        canonical="https://inchtomilez.com/portfolio"
      />

      <StructuredData
        schema={{
          type: 'breadcrumb',
          items: [
            { name: 'Home', url: 'https://inchtomilez.com' },
            { name: 'Portfolio', url: 'https://inchtomilez.com/portfolio' }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
        <div className="container-award">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge-glass mb-4 inline-flex">
              <Briefcase className="w-4 h-4 text-black" strokeWidth={2} />
              <span className="subheading text-xs">OUR WORK</span>
            </div>
            <h1 className="heading-xl mb-4">
              PROJECTS THAT DRIVE REAL RESULTS
            </h1>
            <p className="body-lg text-muted max-w-2xl mx-auto">
              Explore our portfolio of successful projects across industries. From startups to established enterprises, 
              we've helped businesses in Indore and beyond achieve their digital goals.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '300+', label: 'Happy Clients' },
              { value: '50+', label: 'Awards Won' },
              { value: '98%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="glass-card card-compact-md text-center">
                <div className="heading-lg">{stat.value}</div>
                <div className="body-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-compact-md">
        <div className="container-award">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[10px] transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-[#baff00] to-[#a3e600] text-black shadow-award-md'
                    : 'glass-card hover:glass-strong'
                }`}
              >
                <cat.icon className="w-4 h-4" strokeWidth={2} />
                <span className="body-sm">{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard3D>
                  <div className="glass-card overflow-hidden h-full flex flex-col group cursor-pointer">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-[10px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Icon Overlay */}
                      <div className="absolute top-4 right-4">
                        <div className="icon-container-glass w-10 h-10 p-2">
                          <project.icon className="w-full h-full text-black" strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="badge-glass">
                            <span className="text-xs">{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Title & Description */}
                      <h3 className="heading-sm text-lg mb-2">{project.title}</h3>
                      <p className="body-sm text-muted mb-1">{project.client} • {project.industry}</p>
                      <p className="body-sm mb-4 flex-grow">{project.description}</p>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="text-center">
                            <div className="heading-sm text-sm text-[#baff00]">{result.metric}</div>
                            <div className="body-xs text-muted">{result.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button className="btn-outline-award w-full group-hover:bg-[#baff00] group-hover:border-[#baff00]">
                        <span>View Case Study</span>
                        <ExternalLink className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-compact-md bg-gradient-to-b from-white to-gray-50">
        <div className="container-award">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card card-compact-lg text-center max-w-3xl mx-auto"
          >
            <div className="icon-container-glass w-16 h-16 p-4 mx-auto mb-6">
              <Award className="w-full h-full text-black icon-animated" strokeWidth={2} />
            </div>
            <h2 className="heading-lg mb-4">
              Ready to See Your Project Here?
            </h2>
            <p className="body-md text-muted max-w-xl mx-auto mb-6">
              Let's create something amazing together. Our team is ready to transform your vision into reality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="btn-award"
                onClick={() => onNavigate('contact')}
              >
                Start Your Project
              </button>
              <button 
                className="btn-outline-award"
                onClick={() => onNavigate('services')}
              >
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}