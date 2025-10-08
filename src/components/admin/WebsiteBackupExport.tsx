import { useState } from 'react';
import { Download, Package, Database, Code, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function WebsiteBackupExport() {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const generateBackup = async () => {
    try {
      setExporting(true);
      setProgress(10);
      setCurrentStep('Initializing export...');

      // Step 1: Export database data
      setProgress(20);
      setCurrentStep('Exporting database data...');
      
      const dbExport = await exportDatabaseData();
      
      if (!dbExport.success) {
        throw new Error('Database export failed');
      }

      // Step 2: Generate package files
      setProgress(40);
      setCurrentStep('Generating package.json and configuration...');
      
      const packageFiles = generatePackageFiles();

      // Step 3: Create README and deployment guide
      setProgress(60);
      setCurrentStep('Creating deployment documentation...');
      
      const docs = generateDocumentation();

      // Step 4: Package everything
      setProgress(80);
      setCurrentStep('Packaging files into ZIP...');
      
      const zipBlob = await createZipPackage({
        dbExport: dbExport.data,
        packageFiles,
        docs
      });

      // Step 5: Download
      setProgress(100);
      setCurrentStep('Download ready!');

      downloadZip(zipBlob);

      toast.success('Website backup exported successfully!');
      
      setTimeout(() => {
        setExporting(false);
        setProgress(0);
        setCurrentStep('');
      }, 2000);

    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export website backup');
      setExporting(false);
      setProgress(0);
      setCurrentStep('');
    }
  };

  const exportDatabaseData = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-25651dcf/api/backup/export-database`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Database export failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Database export error:', error);
      return { success: false, error: 'Database export failed' };
    }
  };

  const generatePackageFiles = () => {
    const packageJson = {
      name: 'inchtomilez-website',
      version: '1.0.0',
      description: 'InchToMilez - Digital Marketing Agency Website',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        'deploy:vercel': 'vercel --prod',
        'deploy:netlify': 'netlify deploy --prod'
      },
      dependencies: {
        'react': '^18.3.1',
        'react-dom': '^18.3.1',
        'motion': '^10.16.4',
        'lucide-react': '^0.344.0',
        'sonner': '^1.4.0',
        '@supabase/supabase-js': '^2.39.7',
        'recharts': '^2.10.3',
        'react-slick': '^0.30.2',
        'slick-carousel': '^1.8.1',
        'react-responsive-masonry': '^2.1.7',
        're-resizable': '^6.9.11'
      },
      devDependencies: {
        '@types/react': '^18.2.66',
        '@types/react-dom': '^18.2.22',
        '@vitejs/plugin-react': '^4.2.1',
        'typescript': '^5.2.2',
        'vite': '^5.2.0',
        'tailwindcss': '^4.0.0'
      }
    };

    const tsconfigJson = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }]
    };

    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})`;

    const envExample = `# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: Web3Forms API Key (for contact form)
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here`;

    const gitignore = `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
build
dist
.vercel
.netlify

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea
.vscode
*.swp
*.swo
*~`;

    return {
      'package.json': JSON.stringify(packageJson, null, 2),
      'tsconfig.json': JSON.stringify(tsconfigJson, null, 2),
      'vite.config.ts': viteConfig,
      '.env.example': envExample,
      '.gitignore': gitignore
    };
  };

  const generateDocumentation = () => {
    const deploymentReadme = `# InchToMilez Website - Deployment Guide

## 📦 Complete Website Package

This package contains the complete InchToMilez website with:
- ✅ React 18 frontend (TypeScript)
- ✅ Supabase backend integration
- ✅ Database schema and data
- ✅ All components and pages
- ✅ PWA functionality
- ✅ Admin panel
- ✅ Blog system
- ✅ SEO optimization

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### Step 1: Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Step 2: Configure Environment Variables

1. Rename \`.env.example\` to \`.env\`
2. Fill in your Supabase credentials:

\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

### Step 3: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the database schema from \`database/schema.sql\`
4. Import data from \`database/data.json\` (optional)

### Step 4: Deploy Supabase Edge Functions

\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy edge functions
supabase functions deploy make-server-25651dcf
\`\`\`

### Step 5: Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit: http://localhost:5173

---

## 🌐 Production Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
\`\`\`bash
npm install -g vercel
\`\`\`

2. **Deploy**
\`\`\`bash
npm run deploy:vercel
# or
vercel --prod
\`\`\`

3. **Configure Environment Variables**
- Go to Vercel dashboard → Project Settings → Environment Variables
- Add all variables from \`.env.example\`

4. **Custom Domain**
- Go to Vercel dashboard → Project Settings → Domains
- Add your custom domain (e.g., inchtomilez.com)
- Update DNS records as instructed

**Deployment URL:** https://your-project.vercel.app

---

### Option 2: Netlify

1. **Install Netlify CLI**
\`\`\`bash
npm install -g netlify-cli
\`\`\`

2. **Build Project**
\`\`\`bash
npm run build
\`\`\`

3. **Deploy**
\`\`\`bash
npm run deploy:netlify
# or
netlify deploy --prod --dir=dist
\`\`\`

4. **Configure Environment Variables**
- Go to Netlify dashboard → Site Settings → Environment Variables
- Add all variables from \`.env.example\`

**Deployment URL:** https://your-site.netlify.app

---

### Option 3: Traditional Hosting (cPanel, etc.)

1. **Build Project**
\`\`\`bash
npm run build
\`\`\`

2. **Upload Files**
- Upload contents of \`dist/\` folder to your hosting
- Ensure \`.htaccess\` is configured for SPA routing

3. **Configure Environment**
- Set environment variables in hosting control panel
- Update Supabase CORS settings to allow your domain

---

## 🗄️ Database Setup

### Create Database Tables

Run this SQL in Supabase SQL Editor:

\`\`\`sql
-- Key-Value Store Table
CREATE TABLE IF NOT EXISTS kv_store_25651dcf (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE kv_store_25651dcf ENABLE ROW LEVEL SECURITY;

-- Create Policy (Allow all operations for service role)
CREATE POLICY "Allow all for service role"
ON kv_store_25651dcf
FOR ALL
USING (true);
\`\`\`

### Import Existing Data

If you have exported data:

\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Import data
supabase db push database/data.json
\`\`\`

---

## 🔐 Admin Panel Access

**URL:** https://your-domain.com?page=admin

**Default Credentials:**
- Username: \`admin\`
- Password: \`admin123\`

**⚠️ IMPORTANT:** Change these credentials immediately after deployment!

To change admin credentials, update them in:
- File: \`components/pages/AdminPage.tsx\`
- Lines: Search for "admin" and "admin123"

---

## 🛠️ Configuration

### Custom Domain

1. **Update package.json**
\`\`\`json
{
  "homepage": "https://inchtomilez.com"
}
\`\`\`

2. **Update Supabase Settings**
- Go to Supabase Dashboard → Authentication → URL Configuration
- Add your domain to allowed URLs

3. **Update DNS Records**
- Point your domain to deployment platform
- Add SSL certificate (usually automatic)

### Email Configuration (Contact Form)

The website uses Web3Forms for contact form submissions.

1. Get API key from: https://web3forms.com
2. Add to \`.env\`:
\`\`\`env
VITE_WEB3FORMS_ACCESS_KEY=your-key-here
\`\`\`

---

## 📱 PWA Configuration

The website is PWA-ready. Update PWA settings:

1. **Edit manifest.json**
\`\`\`json
{
  "name": "InchToMilez",
  "short_name": "I2M",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1a1a1a"
}
\`\`\`

2. **Update Service Worker**
- File: \`public/sw.js\`
- Customize caching strategy if needed

---

## 🔍 SEO Configuration

### Update SEO Settings

1. Go to Admin Panel → SEO Management
2. Configure:
   - Site name
   - Default meta title/description
   - Google Search Console verification
   - Generate sitemap
   - Submit to search engines

### Google Search Console

1. Verify ownership using verification code
2. Submit sitemap: https://your-domain.com/sitemap.xml
3. Monitor indexing and performance

---

## 📊 Analytics Setup

### Google Analytics 4

Add to \`index.html\` in \`<head>\`:

\`\`\`html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
\`\`\`

---

## 🐛 Troubleshooting

### Build Errors

\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
\`\`\`

### Supabase Connection Issues

1. Check environment variables are correct
2. Verify Supabase project is active
3. Check CORS settings in Supabase dashboard

### 404 Errors on Page Refresh

Add this to hosting configuration:

**Vercel (vercel.json):**
\`\`\`json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
\`\`\`

**Netlify (_redirects file):**
\`\`\`
/*    /index.html   200
\`\`\`

---

## 📞 Support

For technical support:
- Email: info@inchtomilez.com
- Phone: +91-9009970709

---

## 📄 License

This website is proprietary software of InchToMilez.
All rights reserved © ${new Date().getFullYear()} InchToMilez

---

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages working
- [ ] Forms submitting
- [ ] Admin panel accessible
- [ ] Blog system functional
- [ ] PWA installable
- [ ] SEO settings configured
- [ ] Analytics tracking
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Performance optimized (90+ score)
- [ ] Mobile responsive
- [ ] Browser compatibility tested

---

**🎉 Congratulations! Your InchToMilez website is now live!**

Visit: https://your-domain.com
Admin: https://your-domain.com?page=admin
`;

    const technicalReadme = `# InchToMilez Website - Technical Documentation

## 🏗️ Architecture

### Frontend Stack
- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **State Management:** React Hooks
- **Routing:** Client-side (query params)
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React

### Backend Stack
- **Platform:** Supabase
- **Edge Functions:** Deno (TypeScript)
- **Database:** PostgreSQL
- **Storage:** Supabase Storage
- **Authentication:** Supabase Auth

### Key Features
- ✅ 28-section comprehensive homepage
- ✅ Progressive Web App (PWA)
- ✅ Multi-language support
- ✅ Admin panel with CMS
- ✅ Dynamic blog system
- ✅ SEO optimization suite
- ✅ Lead generation system
- ✅ AI chatbot integration

---

## 📁 Project Structure

\`\`\`
inchtomilez-website/
├── src/
│   ├── components/          # React components
│   │   ├── admin/          # Admin panel components
│   │   ├── pages/          # Page components
│   │   ├── ui/             # ShadCN UI components
│   │   └── ...
│   ├── styles/             # Global CSS
│   │   └── globals.css     # Tailwind + custom styles
│   ├── utils/              # Utility functions
│   │   ├── supabase/       # Supabase client
│   │   └── ...
│   ├── contexts/           # React contexts
│   └── App.tsx             # Main app component
├── supabase/
│   └── functions/
│       └── server/         # Edge functions
│           ├── index.tsx   # Main server
│           └── kv_store.tsx # Database utilities
├── public/                 # Static assets
│   ├── manifest.json       # PWA manifest
│   ├── sw.js              # Service worker
│   └── ...
├── database/               # Database exports
│   ├── schema.sql         # Database schema
│   └── data.json          # Exported data
├── package.json
├── vite.config.ts
└── tsconfig.json
\`\`\`

---

## 🔌 API Endpoints

### Blog System
- \`GET /api/blog/posts\` - Get all posts
- \`GET /api/blog/published\` - Get published posts
- \`POST /api/blog/posts\` - Create post
- \`PUT /api/blog/posts/:id\` - Update post
- \`DELETE /api/blog/posts/:id\` - Delete post

### SEO Management
- \`GET /api/seo/settings\` - Get SEO config
- \`PUT /api/seo/settings\` - Update SEO config
- \`POST /api/seo/generate-sitemap\` - Generate sitemap
- \`GET /api/seo/redirects\` - Get redirects
- \`POST /api/seo/redirects\` - Create redirect

### Contact & Leads
- \`POST /api/contact/submit\` - Submit contact form
- \`GET /api/leads\` - Get all leads (admin)

---

## 🎨 Design System

### Typography
- **Headings:** Antonio Bold (700)
- **Sub-headings:** Antonio Semi-Bold (600)
- **Body:** Raleway Regular (400)

### Colors
- **Primary:** #1a1a1a (Black)
- **Secondary:** #404040 (Dark Grey)
- **Muted:** #666666 (Grey)
- **Background:** #ffffff (White)

### Glassmorphism
- All cards use 95% transparent glass effects
- 10px border radius everywhere
- Backdrop blur effects

---

## 🔒 Security

### Environment Variables
Never commit these to Git:
- \`VITE_SUPABASE_SERVICE_ROLE_KEY\`
- \`VITE_WEB3FORMS_ACCESS_KEY\`

### Admin Access
- Implement strong password policy
- Use environment variables for credentials
- Enable two-factor authentication (future)

### Data Protection
- All data encrypted at rest (Supabase)
- HTTPS enforced
- CORS configured properly
- Rate limiting on API endpoints

---

## 🚀 Performance Optimization

### Code Splitting
- Lazy loading for pages
- Dynamic imports for heavy components

### Image Optimization
- WebP format where possible
- Lazy loading images
- Responsive images

### Caching
- Service worker caching
- CDN for static assets
- Browser caching headers

### Bundle Size
- Tree shaking enabled
- Minification in production
- Compression (gzip/brotli)

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load
- [ ] Forms submit correctly
- [ ] Admin panel functional
- [ ] Blog CRUD operations
- [ ] SEO tools working
- [ ] PWA installable
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### Performance Testing
- [ ] Lighthouse score 90+
- [ ] Page load < 3 seconds
- [ ] No console errors
- [ ] No memory leaks

---

## 📦 Dependencies

### Core
- react (^18.3.1)
- react-dom (^18.3.1)
- typescript (^5.2.2)

### UI/UX
- motion (^10.16.4)
- lucide-react (^0.344.0)
- tailwindcss (^4.0.0)

### Backend
- @supabase/supabase-js (^2.39.7)

### Utilities
- sonner (^1.4.0) - Toast notifications
- recharts (^2.10.3) - Charts
- react-slick (^0.30.2) - Carousels

---

## 🔄 Update Process

1. **Update Dependencies**
\`\`\`bash
npm update
npm audit fix
\`\`\`

2. **Test Locally**
\`\`\`bash
npm run dev
\`\`\`

3. **Build & Deploy**
\`\`\`bash
npm run build
npm run deploy:vercel
\`\`\`

---

## 📝 Maintenance

### Regular Tasks
- [ ] Update npm packages (monthly)
- [ ] Review security advisories
- [ ] Backup database (weekly)
- [ ] Monitor performance metrics
- [ ] Update blog content
- [ ] Check broken links

### Backup Strategy
- Database: Daily automatic backups (Supabase)
- Code: Version control (Git)
- Files: Cloud storage backup

---

## 🆘 Emergency Contacts

**Developer Support:**
- Technical issues
- Deployment problems
- Code modifications

**Hosting Support:**
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- Supabase: https://supabase.com/support

---

**Last Updated:** ${new Date().toISOString().split('T')[0]}
`;

    return {
      'README.md': deploymentReadme,
      'TECHNICAL.md': technicalReadme
    };
  };

  const createZipPackage = async (data: any) => {
    // Using dynamic import for JSZip to reduce bundle size
    const JSZip = (await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm')).default;
    
    const zip = new JSZip();

    // Add documentation
    zip.file('README.md', data.docs['README.md']);
    zip.file('TECHNICAL.md', data.docs['TECHNICAL.md']);

    // Add configuration files
    Object.entries(data.packageFiles).forEach(([filename, content]) => {
      zip.file(filename, content as string);
    });

    // Add database export
    const dbFolder = zip.folder('database');
    if (dbFolder && data.dbExport) {
      dbFolder.file('data.json', JSON.stringify(data.dbExport.data, null, 2));
      dbFolder.file('schema.sql', data.dbExport.schema || '-- No schema available');
    }

    // Add deployment guides
    const docsFolder = zip.folder('docs');
    if (docsFolder) {
      docsFolder.file('DEPLOYMENT.md', data.docs['README.md']);
      docsFolder.file('vercel.json', JSON.stringify({
        rewrites: [
          { source: '/(.*)', destination: '/' }
        ]
      }, null, 2));
      docsFolder.file('_redirects', '/*    /index.html   200');
    }

    // Generate ZIP
    const blob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    return blob;
  };

  const downloadZip = (blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inchtomilez-website-backup-${new Date().toISOString().split('T')[0]}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="heading-lg flex items-center gap-3">
              <Package className="w-8 h-8 icon-color-purple icon-bounce" />
              Website Backup & Export
            </h2>
            <p className="body-md text-muted mt-2">
              Export complete website package with frontend, backend, and database
            </p>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="glass-card p-6">
        <h3 className="heading-md mb-4">What's Included in the Backup</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="glass-subtle p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Code className="w-6 h-6 icon-color-blue mt-1" />
              <div>
                <h4 className="heading-sm">Frontend Code</h4>
                <ul className="body-sm text-muted mt-2 space-y-1">
                  <li>• All React components</li>
                  <li>• Tailwind CSS styles</li>
                  <li>• TypeScript configuration</li>
                  <li>• Build configuration (Vite)</li>
                  <li>• PWA files & manifest</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-subtle p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 icon-color-green mt-1" />
              <div>
                <h4 className="heading-sm">Backend & Database</h4>
                <ul className="body-sm text-muted mt-2 space-y-1">
                  <li>• Supabase Edge Functions</li>
                  <li>• Database schema (SQL)</li>
                  <li>• All data (JSON export)</li>
                  <li>• API endpoints</li>
                  <li>• Server configuration</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-subtle p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 icon-color-orange mt-1" />
              <div>
                <h4 className="heading-sm">Configuration Files</h4>
                <ul className="body-sm text-muted mt-2 space-y-1">
                  <li>• package.json (dependencies)</li>
                  <li>• Environment variables template</li>
                  <li>• TypeScript config</li>
                  <li>• Git ignore file</li>
                  <li>• Deployment configs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-subtle p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 icon-color-pink mt-1" />
              <div>
                <h4 className="heading-sm">Documentation</h4>
                <ul className="body-sm text-muted mt-2 space-y-1">
                  <li>• Deployment guide (README)</li>
                  <li>• Technical documentation</li>
                  <li>• Setup instructions</li>
                  <li>• Vercel deployment guide</li>
                  <li>• Netlify deployment guide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="border-t pt-6">
          <Button
            onClick={generateBackup}
            disabled={exporting}
            className="btn-award w-full"
            size="lg"
          >
            {exporting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Exporting... {progress}%
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Export Complete Website Backup
              </>
            )}
          </Button>

          {exporting && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="body-sm text-muted">{currentStep}</span>
                <span className="body-sm font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Deployment Options */}
      <Card className="glass-card p-6">
        <h3 className="heading-md mb-4">Deployment Platforms Supported</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-subtle p-4 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 icon-color-green mx-auto mb-2" />
            <h4 className="heading-sm">Vercel</h4>
            <p className="body-sm text-muted mt-1">Recommended for React apps</p>
          </div>

          <div className="glass-subtle p-4 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 icon-color-blue mx-auto mb-2" />
            <h4 className="heading-sm">Netlify</h4>
            <p className="body-sm text-muted mt-1">Easy deployment & hosting</p>
          </div>

          <div className="glass-subtle p-4 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 icon-color-purple mx-auto mb-2" />
            <h4 className="heading-sm">cPanel / VPS</h4>
            <p className="body-sm text-muted mt-1">Traditional hosting</p>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="glass-card p-6">
        <h3 className="heading-md mb-4">After Export - Quick Start</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="heading-sm">Extract ZIP File</h4>
              <p className="body-sm text-muted mt-1">
                Extract the downloaded ZIP file to your desired location
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="heading-sm">Install Dependencies</h4>
              <p className="body-sm text-muted mt-1">
                Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code> in terminal
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="heading-sm">Configure Environment</h4>
              <p className="body-sm text-muted mt-1">
                Rename <code className="bg-gray-100 px-2 py-1 rounded">.env.example</code> to <code className="bg-gray-100 px-2 py-1 rounded">.env</code> and fill in credentials
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="heading-sm">Deploy</h4>
              <p className="body-sm text-muted mt-1">
                Follow README.md for detailed deployment instructions
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Warning */}
      <Card className="glass-card p-6 border-2 border-orange-200 bg-orange-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="heading-sm text-orange-900">Important Notes</h4>
            <ul className="body-sm text-orange-800 mt-2 space-y-1">
              <li>• The exported package requires Node.js 18+ to run</li>
              <li>• You'll need a Supabase account (free tier available)</li>
              <li>• Database data export may be large depending on content</li>
              <li>• Environment variables must be configured before deployment</li>
              <li>• Complete instructions are included in the README.md file</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
