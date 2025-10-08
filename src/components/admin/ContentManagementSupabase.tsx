import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Save,
  X,
  Image as ImageIcon,
  Tag,
  Globe,
  Loader2
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { 
  getAllBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  searchBlogPosts,
  type BlogPost 
} from '../../utils/admin/adminStorageSupabase';
import { toast } from 'sonner@2.0.3';

export function ContentManagementSupabase() {
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft' as 'published' | 'draft' | 'scheduled'
  });

  // Load posts from Supabase
  useEffect(() => {
    let isMounted = true;
    
    const loadPostsWithTimeout = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedPosts = await getAllBlogPosts();
        
        if (!isMounted) return;
        
        setPosts(fetchedPosts || []);
        console.log(`✅ Loaded ${fetchedPosts?.length || 0} posts from Supabase`);
      } catch (error) {
        console.error('Failed to load posts:', error);
        if (isMounted) {
          setPosts([]); // Set empty array on error
          setError(error instanceof Error ? error.message : 'Failed to load blog posts');
          toast.error('Failed to load blog posts. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadPostsWithTimeout();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedPosts = await getAllBlogPosts();
      
      setPosts(fetchedPosts || []);
      console.log(`✅ Loaded ${fetchedPosts?.length || 0} posts from Supabase`);
      
      if (fetchedPosts && fetchedPosts.length > 0) {
        toast.success(`Loaded ${fetchedPosts.length} blog posts`);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
      setPosts([]); // Set empty array on error
      setError(error instanceof Error ? error.message : 'Failed to load blog posts');
      toast.error('Failed to load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featuredImage: '',
      status: 'draft'
    });
    setShowEditor(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || '',
      category: post.category,
      tags: post.tags.join(', '),
      featuredImage: post.featuredImage || '',
      status: post.status
    });
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.excerpt) {
      toast.error('Please fill in title and excerpt');
      return;
    }

    try {
      setSaving(true);

      const postData: BlogPost = {
        id: editingPost?.id || `post-${Date.now()}`,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        status: formData.status,
        author: 'Admin',
        date: editingPost?.date || new Date().toISOString(),
        category: formData.category || 'Uncategorized',
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        featuredImage: formData.featuredImage,
        views: editingPost?.views || 0,
        likes: editingPost?.likes || 0,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      };

      const result = await saveBlogPost(postData);

      if (result.success) {
        toast.success(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
        await loadPosts(); // Reload posts
        setShowEditor(false);
        setEditingPost(null);
      } else {
        toast.error(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const result = await deleteBlogPost(id);
      
      if (result.success) {
        toast.success('Post deleted successfully!');
        await loadPosts(); // Reload posts
      } else {
        toast.error(`Failed to delete: ${result.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('An error occurred while deleting');
    }
  };

  const statusColors = {
    published: 'green' as const,
    draft: 'yellow' as const,
    scheduled: 'blue' as const
  };

  // Defensive filtering with null safety
  const filteredPosts = (posts && Array.isArray(posts) ? posts : []).filter(post => {
    if (!post) return false;
    
    const matchesSearch = 
      (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          <p className="body-md text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state with retry button
  if (error && posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="glass-premium p-8 rounded-lg max-w-md text-center">
          <div className="mb-4">
            <ColorfulIcon icon={Globe} color="red" size={48} />
          </div>
          <h2 className="heading-lg mb-2">Failed to Load Posts</h2>
          <p className="body-md text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={loadPosts} className="btn-award">
              <Loader2 className="h-5 w-5 mr-2" />
              Retry
            </Button>
            <Button onClick={handleNewPost} className="btn-outline-award">
              <Plus className="h-5 w-5 mr-2" />
              Create New Post
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">Content Management</h1>
            <p className="body-lg text-gray-600">
              Create and manage your blog posts
            </p>
          </div>
          <Button onClick={handleNewPost} className="btn-award">
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Button>
        </div>
      </ScrollReveal>

      {/* Search & Filter */}
      <ScrollReveal animation="fade" delay={100}>
        <div className="glass-card p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-input"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'published', 'draft', 'scheduled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all ${
                    filterStatus === status
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="body-lg text-gray-600">
              {searchQuery || filterStatus !== 'all' 
                ? 'No posts found matching your criteria'
                : 'No blog posts yet. Create your first post!'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <ScrollReveal key={post.id} animation="fade" delay={index * 50}>
              <InnovativeCard className="h-full flex flex-col">
                {post.featuredImage && (
                  <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-glass">
                      <ColorfulIcon 
                        icon={Tag} 
                        color={statusColors[post.status]} 
                        size={14} 
                      />
                      <span className="capitalize">{post.status}</span>
                    </span>
                    <span className="badge-glass body-xs">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="heading-sm mb-2">{post.title}</h3>
                  <p className="body-md mb-4 flex-1">{post.excerpt}</p>

                  <div className="flex items-center gap-3 mb-4 body-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views} views
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(post)}
                      className="btn-outline-award flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      className="btn-outline-award"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </InnovativeCard>
            </ScrollReveal>
          ))
        )}
      </div>

      {/* Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-premium">
          <DialogHeader>
            <DialogTitle className="heading-lg">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title..."
                className="glass-input"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block mb-2 font-semibold">Excerpt *</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description..."
                rows={3}
                className="glass-input"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-2 font-semibold">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full post content (supports HTML)..."
                rows={10}
                className="glass-input font-mono"
              />
            </div>

            {/* Category & Tags */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., SEO, Marketing..."
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Tags</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3..."
                  className="glass-input"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block mb-2 font-semibold">Featured Image URL</label>
              <Input
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="https://..."
                className="glass-input"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 font-semibold">Status</label>
              <div className="flex gap-3">
                {(['draft', 'published', 'scheduled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFormData({ ...formData, status })}
                    className={`px-6 py-3 rounded-lg capitalize transition-all ${
                      formData.status === status
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="btn-award flex-1"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Post
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowEditor(false)}
                className="btn-outline-award"
                disabled={saving}
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}