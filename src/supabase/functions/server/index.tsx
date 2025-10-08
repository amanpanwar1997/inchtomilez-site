import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-25651dcf/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// BLOG POSTS API
// ========================================

// Get all blog posts
app.get("/make-server-25651dcf/api/blog/posts", async (c) => {
  try {
    const posts = await kv.getByPrefix("blog_post_");
    console.log(`📚 Retrieved ${posts.length} blog posts`);
    return c.json({ success: true, data: posts });
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get published blog posts only (for public)
app.get("/make-server-25651dcf/api/blog/published", async (c) => {
  try {
    const allPosts = await kv.getByPrefix("blog_post_");
    const published = allPosts.filter((post: any) => post.status === "published");
    console.log(`📰 Retrieved ${published.length} published posts`);
    return c.json({ success: true, data: published });
  } catch (error) {
    console.error("❌ Error fetching published posts:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get single blog post
app.get("/make-server-25651dcf/api/blog/posts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const post = await kv.get(`blog_post_${id}`);
    
    if (!post) {
      return c.json({ success: false, error: "Post not found" }, 404);
    }
    
    console.log(`📄 Retrieved blog post: ${id}`);
    return c.json({ success: true, data: post });
  } catch (error) {
    console.error("❌ Error fetching blog post:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create blog post
app.post("/make-server-25651dcf/api/blog/posts", async (c) => {
  try {
    const post = await c.req.json();
    
    // Generate ID if not provided
    if (!post.id) {
      post.id = `post-${Date.now()}`;
    }
    
    // Add timestamps
    post.createdAt = new Date().toISOString();
    post.updatedAt = new Date().toISOString();
    
    await kv.set(`blog_post_${post.id}`, post);
    
    console.log(`✅ Created blog post: ${post.id} - ${post.title}`);
    return c.json({ success: true, data: post });
  } catch (error) {
    console.error("❌ Error creating blog post:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update blog post
app.put("/make-server-25651dcf/api/blog/posts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const existing = await kv.get(`blog_post_${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Post not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...updates,
      id, // Preserve ID
      createdAt: existing.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`blog_post_${id}`, updated);
    
    console.log(`✅ Updated blog post: ${id} - ${updated.title}`);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("❌ Error updating blog post:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete blog post
app.delete("/make-server-25651dcf/api/blog/posts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const existing = await kv.get(`blog_post_${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Post not found" }, 404);
    }
    
    await kv.del(`blog_post_${id}`);
    
    console.log(`🗑️  Deleted blog post: ${id}`);
    return c.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting blog post:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Search blog posts
app.get("/make-server-25651dcf/api/blog/search", async (c) => {
  try {
    const query = c.req.query("q")?.toLowerCase() || "";
    const allPosts = await kv.getByPrefix("blog_post_");
    
    const results = allPosts.filter((post: any) => {
      return (
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    });
    
    console.log(`🔍 Search "${query}" found ${results.length} results`);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error("❌ Error searching blog posts:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// THEME SETTINGS API
// ========================================

app.get("/make-server-25651dcf/api/theme", async (c) => {
  try {
    const settings = await kv.get("theme_settings") || getDefaultThemeSettings();
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error fetching theme settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.put("/make-server-25651dcf/api/theme", async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set("theme_settings", settings);
    console.log("✅ Updated theme settings");
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error updating theme settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// WEBSITE SETTINGS API
// ========================================

app.get("/make-server-25651dcf/api/website", async (c) => {
  try {
    const settings = await kv.get("website_settings") || getDefaultWebsiteSettings();
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error fetching website settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.put("/make-server-25651dcf/api/website", async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set("website_settings", settings);
    console.log("✅ Updated website settings");
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error updating website settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// SEO SETTINGS API
// ========================================

app.get("/make-server-25651dcf/api/seo", async (c) => {
  try {
    const settings = await kv.get("seo_settings") || getDefaultSEOSettings();
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error fetching SEO settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.put("/make-server-25651dcf/api/seo", async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set("seo_settings", settings);
    console.log("✅ Updated SEO settings");
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error updating SEO settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// ANALYTICS API
// ========================================

app.get("/make-server-25651dcf/api/analytics", async (c) => {
  try {
    const analytics = await kv.get("analytics") || getDefaultAnalytics();
    return c.json({ success: true, data: analytics });
  } catch (error) {
    console.error("❌ Error fetching analytics:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post("/make-server-25651dcf/api/analytics/pageview", async (c) => {
  try {
    const { page } = await c.req.json();
    const analytics = await kv.get("analytics") || getDefaultAnalytics();
    
    // Update page views
    analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;
    
    // Update visitors for today
    const today = new Date().toISOString().split('T')[0];
    const todayVisitor = analytics.visitors.find((v: any) => v.date === today);
    
    if (todayVisitor) {
      todayVisitor.count++;
    } else {
      analytics.visitors.push({ date: today, count: 1 });
    }
    
    // Keep only last 30 days
    analytics.visitors = analytics.visitors.slice(-30);
    
    // Update top pages
    analytics.topPages = Object.entries(analytics.pageViews)
      .map(([page, views]) => ({ page, views: views as number }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
    
    await kv.set("analytics", analytics);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error tracking page view:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// BACKUP API
// ========================================

app.get("/make-server-25651dcf/api/backups", async (c) => {
  try {
    const backups = await kv.getByPrefix("backup_");
    console.log(`📦 Retrieved ${backups.length} backups`);
    return c.json({ success: true, data: backups });
  } catch (error) {
    console.error("❌ Error fetching backups:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post("/make-server-25651dcf/api/backups", async (c) => {
  try {
    const { name } = await c.req.json();
    
    // Get all data
    const posts = await kv.getByPrefix("blog_post_");
    const theme = await kv.get("theme_settings");
    const website = await kv.get("website_settings");
    const seo = await kv.get("seo_settings");
    
    const backup = {
      id: `backup-${Date.now()}`,
      name: name || `Backup ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString(),
      data: {
        posts,
        theme,
        website,
        seo,
      },
    };
    
    await kv.set(`backup_${backup.id}`, backup);
    
    console.log(`✅ Created backup: ${backup.id}`);
    return c.json({ success: true, data: backup });
  } catch (error) {
    console.error("❌ Error creating backup:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post("/make-server-25651dcf/api/backups/:id/restore", async (c) => {
  try {
    const id = c.req.param("id");
    const backup = await kv.get(`backup_${id}`);
    
    if (!backup) {
      return c.json({ success: false, error: "Backup not found" }, 404);
    }
    
    // Delete all existing blog posts
    const existingPosts = await kv.getByPrefix("blog_post_");
    for (const post of existingPosts) {
      await kv.del(`blog_post_${post.id}`);
    }
    
    // Restore blog posts
    for (const post of backup.data.posts) {
      await kv.set(`blog_post_${post.id}`, post);
    }
    
    // Restore settings
    if (backup.data.theme) await kv.set("theme_settings", backup.data.theme);
    if (backup.data.website) await kv.set("website_settings", backup.data.website);
    if (backup.data.seo) await kv.set("seo_settings", backup.data.seo);
    
    console.log(`✅ Restored backup: ${id}`);
    return c.json({ success: true, message: "Backup restored successfully" });
  } catch (error) {
    console.error("❌ Error restoring backup:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.delete("/make-server-25651dcf/api/backups/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`backup_${id}`);
    console.log(`🗑️  Deleted backup: ${id}`);
    return c.json({ success: true, message: "Backup deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting backup:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.get("/make-server-25651dcf/api/backups/export", async (c) => {
  try {
    const posts = await kv.getByPrefix("blog_post_");
    const theme = await kv.get("theme_settings");
    const website = await kv.get("website_settings");
    const seo = await kv.get("seo_settings");
    const analytics = await kv.get("analytics");
    
    const exportData = {
      posts,
      theme,
      website,
      seo,
      analytics,
      exportedAt: new Date().toISOString(),
    };
    
    console.log("📤 Exported all data");
    return c.json({ success: true, data: exportData });
  } catch (error) {
    console.error("❌ Error exporting data:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// DEFAULT SETTINGS HELPERS
// ========================================

function getDefaultThemeSettings() {
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

function getDefaultWebsiteSettings() {
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

function getDefaultAnalytics() {
  return {
    pageViews: {},
    visitors: [],
    topPages: [],
    referrers: []
  };
}

// Sync chat history endpoint
app.post("/make-server-25651dcf/sync-chat", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, messages } = body;

    if (!userId) {
      return c.json({ success: false, error: "User ID is required" }, 400);
    }

    const chatKey = `chat_${userId}`;
    
    await kv.set(chatKey, {
      userId,
      messages,
      lastUpdated: new Date().toISOString(),
    });

    console.log(`✅ Chat synced for user: ${userId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error syncing chat:", error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, 500);
  }
});

// Get chat history endpoint
app.get("/make-server-25651dcf/get-chat/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const chatKey = `chat_${userId}`;
    
    const chatData = await kv.get(chatKey);

    if (!chatData) {
      return c.json({ success: true, messages: [] });
    }

    return c.json({ success: true, messages: chatData.messages });
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, 500);
  }
});

// Submit lead endpoint - Stores in DB and sends email
app.post("/make-server-25651dcf/submit-lead", async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, businessName, selectedService, query, email, industry, budget, source, isComplete, timestamp } = body;

    // Validate required fields
    if (!phone) {
      return c.json({ success: false, error: "Phone number is required" }, 400);
    }

    // Generate unique lead ID
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Prepare lead data
    const leadData = {
      id: leadId,
      name: name || null,
      phone,
      businessName: businessName || null,
      selectedService: selectedService || null,
      query: query || null,
      email: email || null,
      industry: industry || null,
      budget: budget || null,
      source: source || 'Inchy Chatbot',
      isComplete: isComplete || false,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Store in Supabase KV Store
    await kv.set(leadId, leadData);
    
    console.log(`✅ Lead stored in database: ${leadId}`);

    // Send email notification using Web3Forms
    const emailResponse = await sendEmailNotification(leadData);
    
    if (emailResponse.success) {
      console.log(`✅ Email notification sent successfully for lead: ${leadId}`);
    } else {
      console.error(`⚠️ Email notification failed for lead: ${leadId}`, emailResponse.error);
    }

    return c.json({ 
      success: true, 
      leadId,
      emailSent: emailResponse.success,
      message: "Lead submitted successfully" 
    });

  } catch (error) {
    console.error("❌ Error submitting lead:", error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, 500);
  }
});

// Get all leads endpoint
app.get("/make-server-25651dcf/leads", async (c) => {
  try {
    const leads = await kv.getByPrefix('lead_');
    
    // Sort by timestamp (newest first)
    const sortedLeads = leads.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return c.json({ 
      success: true, 
      leads: sortedLeads,
      count: sortedLeads.length 
    });
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, 500);
  }
});

// Get single lead by ID
app.get("/make-server-25651dcf/leads/:id", async (c) => {
  try {
    const leadId = c.req.param('id');
    const lead = await kv.get(leadId);

    if (!lead) {
      return c.json({ success: false, error: "Lead not found" }, 404);
    }

    return c.json({ success: true, lead });
  } catch (error) {
    console.error("❌ Error fetching lead:", error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, 500);
  }
});

// Update lead status
app.put("/make-server-25651dcf/leads/:id", async (c) => {
  try {
    const leadId = c.req.param('id');
    const body = await c.req.json();
    
    const existingLead = await kv.get(leadId);
    if (!existingLead) {
      return c.json({ success: false, error: "Lead not found" }, 404);
    }

    const updatedLead = {
      ...existingLead,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(leadId, updatedLead);

    return c.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("❌ Error updating lead:", error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, 500);
  }
});

// Email sending function
async function sendEmailNotification(leadData: any) {
  try {
    // Create plain text version for fallback
    const plainTextContent = `
🎯 NEW LEAD FROM INCHY CHATBOT

📱 LEAD INFORMATION:
${leadData.name ? `👤 Name: ${leadData.name}` : ''}
📱 Phone: ${leadData.phone}
${leadData.businessName ? `🏢 Business: ${leadData.businessName}` : ''}
${leadData.selectedService ? `🎯 Service Interested: ${leadData.selectedService}` : ''}
${leadData.query ? `💬 Query: ${leadData.query}` : ''}
${leadData.email ? `✉️ Email: ${leadData.email}` : ''}
${leadData.industry ? `🏭 Industry: ${leadData.industry}` : ''}
${leadData.budget ? `💰 Budget: ${leadData.budget}` : ''}

📅 TIME: ${new Date(leadData.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}
🔖 SOURCE: ${leadData.source}
🆔 LEAD ID: ${leadData.id}

${leadData.isComplete ? '✅ COMPLETE LEAD - Ready for Follow-up!' : '⏳ Partial Lead - User still in conversation'}

🚀 QUICK ACTIONS:
Call: ${leadData.phone}
WhatsApp: https://wa.me/${leadData.phone.replace(/\D/g, '')}

---
Sent from InchToMilez Website | Powered by Inchy AI Chatbot
    `.trim();

    // Using Web3Forms API - Updated format
    const formData = {
      access_key: Deno.env.get('WEB3FORMS_ACCESS_KEY') || 'YOUR_WEB3FORMS_ACCESS_KEY',
      subject: `🚀 New Lead${leadData.name ? ': ' + leadData.name : ''} ${leadData.selectedService ? '- ' + leadData.selectedService : ''} ${leadData.isComplete ? '(COMPLETE ✅)' : '(IN PROGRESS ⏳)'}`,
      from_name: 'Inchy AI Chatbot',
      from_email: 'noreply@inchtomilez.com',
      to_email: 'Inchtomilez@gmail.com',
      message: plainTextContent,
      replyto: 'noreply@inchtomilez.com',
      // Add custom data for the email
      'Lead Name': leadData.name || 'Not provided',
      'Lead Phone': leadData.phone,
      'Business Name': leadData.businessName || 'Not provided',
      'Service Interested': leadData.selectedService || 'Not provided',
      'Query': leadData.query || 'Not provided',
      'Industry': leadData.industry || 'Not provided',
      'Budget': leadData.budget || 'Not provided',
      'Status': leadData.isComplete ? 'Complete' : 'Partial',
      'Lead ID': leadData.id,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.message || 'Unknown error' };
    }
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ========================================
// SEO MANAGEMENT API
// ========================================

// Get SEO settings
app.get("/make-server-25651dcf/api/seo/settings", async (c) => {
  try {
    const settings = await kv.get("seo_settings") || getDefaultSEOSettings();
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error fetching SEO settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update SEO settings
app.put("/make-server-25651dcf/api/seo/settings", async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set("seo_settings", settings);
    console.log("✅ Updated SEO settings");
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error("❌ Error updating SEO settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get redirects
app.get("/make-server-25651dcf/api/seo/redirects", async (c) => {
  try {
    const redirects = await kv.getByPrefix("redirect_");
    console.log(`📍 Retrieved ${redirects.length} redirects`);
    return c.json({ success: true, data: redirects });
  } catch (error) {
    console.error("❌ Error fetching redirects:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create redirect
app.post("/make-server-25651dcf/api/seo/redirects", async (c) => {
  try {
    const { source, destination, type } = await c.req.json();
    
    const redirect = {
      id: `redirect-${Date.now()}`,
      source,
      destination,
      type: type || '301',
      hits: 0,
      lastAccessed: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`redirect_${redirect.id}`, redirect);
    
    console.log(`✅ Created redirect: ${source} → ${destination}`);
    return c.json({ success: true, data: redirect });
  } catch (error) {
    console.error("❌ Error creating redirect:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete redirect
app.delete("/make-server-25651dcf/api/seo/redirects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`redirect_${id}`);
    console.log(`🗑️  Deleted redirect: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting redirect:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get 404 logs
app.get("/make-server-25651dcf/api/seo/404-logs", async (c) => {
  try {
    const logs = await kv.getByPrefix("404_");
    console.log(`📋 Retrieved ${logs.length} 404 logs`);
    return c.json({ success: true, data: logs });
  } catch (error) {
    console.error("❌ Error fetching 404 logs:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Log 404 error
app.post("/make-server-25651dcf/api/seo/log-404", async (c) => {
  try {
    const { url, referrer } = await c.req.json();
    
    const logKey = `404_${url.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const existing = await kv.get(logKey);
    
    if (existing) {
      existing.count++;
      existing.lastSeen = new Date().toISOString();
      await kv.set(logKey, existing);
    } else {
      await kv.set(logKey, {
        url,
        count: 1,
        lastSeen: new Date().toISOString(),
        referrer: referrer || 'Direct'
      });
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error logging 404:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Generate sitemap
app.post("/make-server-25651dcf/api/seo/generate-sitemap", async (c) => {
  try {
    const options = await c.req.json();
    
    const pages = [
      { url: '/', priority: '1.0', changefreq: options.frequency || 'weekly' },
      { url: '/about', priority: '0.8', changefreq: options.frequency || 'weekly' },
      { url: '/services', priority: '0.9', changefreq: options.frequency || 'weekly' },
      { url: '/portfolio', priority: '0.8', changefreq: options.frequency || 'weekly' },
      { url: '/blogs', priority: '0.7', changefreq: 'daily' },
      { url: '/contact', priority: '0.8', changefreq: options.frequency || 'weekly' }
    ];
    
    // Add blog posts if requested
    if (options.includePosts) {
      const posts = await kv.getByPrefix("blog_post_");
      const publishedPosts = posts.filter((p: any) => p.status === 'published');
      
      publishedPosts.forEach((post: any) => {
        pages.push({
          url: `/blog/${post.slug}`,
          priority: '0.6',
          changefreq: 'weekly'
        });
      });
    }
    
    // Generate XML sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    pages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://inchtomilez.com${page.url}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    console.log(`✅ Generated sitemap with ${pages.length} URLs`);
    return c.json({ success: true, sitemap });
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

function getDefaultSEOSettings() {
  return {
    siteName: 'InchToMilez',
    alternateName: 'I2M',
    siteUrl: 'https://inchtomilez.com',
    defaultTitle: '%page% | InchToMilez - Digital Marketing Agency',
    defaultDescription: '360° Digital Marketing, IT, and Media Solutions',
    defaultImage: '',
    favicon: '',
    googleVerification: '',
    bingVerification: '',
    pinterestVerification: '',
    yandexVerification: '',
    allowIndexing: true,
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: https://inchtomilez.com/sitemap.xml',
    sitemapEnabled: true,
    sitemapIncludePages: true,
    sitemapIncludePosts: true,
    sitemapIncludeImages: true,
    sitemapFrequency: 'weekly',
    organizationType: 'Organization',
    organizationName: 'InchToMilez',
    organizationLogo: '',
    businessName: 'InchToMilez',
    businessType: 'MarketingAgency',
    address: '',
    city: 'Indore',
    state: 'Madhya Pradesh',
    zip: '',
    country: 'India',
    phone: '+91-9009970709',
    email: 'info@inchtomilez.com',
    latitude: '',
    longitude: '',
    openingHours: []
  };
}

// ========================================
// WEBSITE BACKUP & EXPORT API
// ========================================

// Export complete database
app.post("/make-server-25651dcf/api/backup/export-database", async (c) => {
  try {
    console.log('📦 Starting database export...');
    
    // Export all data from KV store
    const allKeys = [
      'blog_post_',
      'seo_settings',
      'redirect_',
      '404_',
      'theme_settings',
      'lead_',
      'comment_'
    ];
    
    const exportData: Record<string, any> = {};
    
    for (const prefix of allKeys) {
      try {
        const data = await kv.getByPrefix(prefix);
        exportData[prefix] = data;
        console.log(`✅ Exported ${data.length} items with prefix: ${prefix}`);
      } catch (error) {
        console.warn(`⚠️ Failed to export prefix ${prefix}:`, error);
        exportData[prefix] = [];
      }
    }
    
    // Generate database schema
    const schema = `-- InchToMilez Database Schema
-- Generated: ${new Date().toISOString()}

-- Key-Value Store Table
CREATE TABLE IF NOT EXISTS kv_store_25651dcf (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE kv_store_25651dcf ENABLE ROW LEVEL SECURITY;

-- Create Policy (Allow all for service role)
CREATE POLICY "Allow all for service role"
ON kv_store_25651dcf
FOR ALL
USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix 
ON kv_store_25651dcf USING btree (key text_pattern_ops);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_kv_store_updated_at 
BEFORE UPDATE ON kv_store_25651dcf 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
`;
    
    console.log('✅ Database export complete');
    
    return c.json({
      success: true,
      data: exportData,
      schema: schema,
      exportedAt: new Date().toISOString(),
      totalItems: Object.values(exportData).reduce((acc: number, arr: any) => acc + (arr.length || 0), 0)
    });
    
  } catch (error) {
    console.error('❌ Database export error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Export configuration and settings
app.get("/make-server-25651dcf/api/backup/export-config", async (c) => {
  try {
    const config = {
      seoSettings: await kv.get('seo_settings') || {},
      themeSettings: await kv.get('theme_settings') || {},
      exportedAt: new Date().toISOString()
    };
    
    return c.json({ success: true, data: config });
  } catch (error) {
    console.error('❌ Config export error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

Deno.serve(app.fetch);
