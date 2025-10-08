import { useState } from 'react';
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
  Globe
} from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { ScrollReveal } from '../ScrollReveal';
import { InnovativeCard } from '../InnovativeCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  date: string;
  views: number;
  category: string;
}

export function ContentManagement() {
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Top 10 Digital Marketing Trends for 2024',
      excerpt: 'Discover the latest trends shaping the industry...',
      status: 'published',
      author: 'Admin',
      date: '2024-01-15',
      views: 1250,
      category: 'Digital Marketing'
    },
    {
      id: '2',
      title: 'The Complete Guide to SEO',
      excerpt: 'Master SEO with our comprehensive guide...',
      status: 'published',
      author: 'Editor',
      date: '2024-01-10',
      views: 2340,
      category: 'SEO'
    },
    {
      id: '3',
      title: 'Social Media Best Practices',
      excerpt: 'Learn how to maximize your social media presence...',
      status: 'draft',
      author: 'Admin',
      date: '2024-01-20',
      views: 0,
      category: 'Social Media'
    }
  ]);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const statusColors = {
    published: 'green' as const,
    draft: 'yellow' as const,
    scheduled: 'blue' as const
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleSave = () => {
    // Save logic here
    setShowEditor(false);
    setEditingPost(null);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">Blog & Content Management</h1>
            <p className="body-lg text-gray-600">
              Create, manage, and optimize your content
            </p>
          </div>
          <Button 
            className="btn-award btn-lg-award"
            onClick={() => setShowEditor(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Button>
        </div>
      </ScrollReveal>

      {/* Filters & Search */}
      <ScrollReveal animation="fade">
        <InnovativeCard effect="glow-border" className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-12 pr-4 py-3 w-full body-md"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Published', value: 'published' },
                { label: 'Drafts', value: 'draft' },
                { label: 'Scheduled', value: 'scheduled' }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-4 py-2 rounded-lg transition-smooth body-md ${
                    filterStatus === filter.value
                      ? 'glass-strong'
                      : 'glass-subtle hover:glass-card'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </InnovativeCard>
      </ScrollReveal>

      {/* Posts List */}
      <ScrollReveal animation="stagger">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <InnovativeCard
              key={post.id}
              effect="expand"
              className="p-6 hover-lift-md"
            >
              <div className="flex items-start gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="heading-md mb-2">{post.title}</h3>
                      <p className="body-md text-gray-600 mb-3">{post.excerpt}</p>
                    </div>
                    <div className={`badge-glass`}>
                      <ColorfulIcon
                        icon={Calendar}
                        color={statusColors[post.status]}
                        size={14}
                        className="mr-1"
                      />
                      <span className="text-xs capitalize">{post.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 body-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views} views
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 glass-subtle hover:glass-card rounded-lg transition-smooth"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5 text-blue-600" />
                  </button>
                  <button
                    className="p-2 glass-subtle hover:glass-card rounded-lg transition-smooth"
                    title="Preview"
                  >
                    <Eye className="h-5 w-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 glass-subtle hover:glass-card rounded-lg transition-smooth"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
            </InnovativeCard>
          ))}
        </div>
      </ScrollReveal>

      {/* Post Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-premium">
          <DialogHeader>
            <DialogTitle className="heading-lg">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Title */}
            <div>
              <label className="block body-md mb-2">Title</label>
              <Input
                type="text"
                placeholder="Enter post title..."
                defaultValue={editingPost?.title}
                className="glass-input w-full py-3"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block body-md mb-2">Content</label>
              <Textarea
                placeholder="Write your content here..."
                defaultValue={editingPost?.excerpt}
                className="glass-input w-full min-h-[300px]"
              />
            </div>

            {/* Meta Fields Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block body-md mb-2">Category</label>
                <Input
                  type="text"
                  placeholder="e.g., Digital Marketing"
                  defaultValue={editingPost?.category}
                  className="glass-input w-full"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block body-md mb-2">Status</label>
                <select className="glass-input w-full py-2 px-3 rounded-lg">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              {/* SEO Title */}
              <div>
                <label className="block body-md mb-2">SEO Title</label>
                <Input
                  type="text"
                  placeholder="Optimized title for search engines"
                  className="glass-input w-full"
                />
              </div>

              {/* SEO Description */}
              <div>
                <label className="block body-md mb-2">SEO Description</label>
                <Input
                  type="text"
                  placeholder="Meta description..."
                  className="glass-input w-full"
                />
              </div>

              {/* Featured Image */}
              <div className="md:col-span-2">
                <label className="block body-md mb-2">Featured Image</label>
                <div className="glass-subtle p-8 rounded-xl border-2 border-dashed border-gray-300 text-center hover:border-gray-400 transition-smooth cursor-pointer">
                  <ColorfulIcon
                    icon={ImageIcon}
                    color="blue"
                    animation="float"
                    size={48}
                    className="mx-auto mb-4"
                  />
                  <p className="body-md mb-2">Click to upload or drag and drop</p>
                  <p className="body-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block body-md mb-2">Tags</label>
              <Input
                type="text"
                placeholder="Separate tags with commas..."
                className="glass-input w-full"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button
                className="btn-outline-award"
                onClick={() => setShowEditor(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                className="btn-award"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
