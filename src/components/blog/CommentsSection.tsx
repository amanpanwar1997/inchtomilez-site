import { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Reply, Trash2, User } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getComments, 
  addComment, 
  deleteComment, 
  likeComment,
  Comment 
} from '../../utils/blog/commentsStorageSimple';
import { validateComment } from '../../utils/validation';
import { useToast, ToastContainer } from '../ui/Toast';

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [errors, setErrors] = useState<{ userName?: string; text?: string }>({});
  const { t } = useLanguage();
  const { toasts, success, error: showError, remove } = useToast();

  useEffect(() => {
    loadComments();
    
    // Load saved username
    const saved = localStorage.getItem('inchtomilez-username');
    if (saved) setUserName(saved);
  }, [postId]);

  const loadComments = () => {
    const loaded = getComments(postId);
    setComments(loaded);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate comment
    const validationErrors = validateComment({
      userName,
      text: newComment
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError('Please fix the errors in your comment');
      return;
    }

    setErrors({});

    // Save username for future
    localStorage.setItem('inchtomilez-username', userName);

    addComment(postId, {
      userName,
      text: newComment,
      parentId: null
    });

    success('Comment posted successfully!');
    setNewComment('');
    loadComments();
  };

  const handleSubmitReply = (parentId: string) => {
    // Validate reply
    const validationErrors = validateComment({
      userName,
      text: replyText
    });

    if (Object.keys(validationErrors).length > 0) {
      showError('Please fix the errors in your reply');
      return;
    }

    addComment(postId, {
      userName,
      text: replyText,
      parentId
    });

    success('Reply posted successfully!');
    setReplyText('');
    setReplyingTo(null);
    loadComments();
  };

  const handleLike = (commentId: string) => {
    likeComment(postId, commentId);
    loadComments();
  };

  const handleDelete = (commentId: string) => {
    if (confirm('Delete this comment?')) {
      deleteComment(postId, commentId);
      loadComments();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Filter top-level comments and their replies
  const topLevelComments = comments.filter(c => !c.parentId);
  
  const getReplies = (commentId: string) => 
    comments.filter(c => c.parentId === commentId);

  const CommentCard = ({ comment }: { comment: Comment }) => {
    const replies = getReplies(comment.id);
    
    return (
      <div className="space-y-4">
        <div className="glass-subtle p-4 rounded-lg">
          {/* Comment Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="heading-sm text-sm">{comment.userName}</p>
                <p className="body-xs text-gray-500">{formatTimestamp(comment.timestamp)}</p>
              </div>
            </div>
            
            <button
              onClick={() => handleDelete(comment.id)}
              className="p-2 hover:bg-white rounded-lg transition-smooth"
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>

          {/* Comment Text */}
          <p className="body-md mb-4">{comment.text}</p>

          {/* Comment Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-2 body-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes || 0}</span>
            </button>
            
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="flex items-center gap-2 body-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </button>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4 glass-card p-4 rounded-lg">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="glass-input w-full p-3 rounded-lg body-md resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  className="btn-award btn-sm-award"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="btn-outline-award btn-sm-award"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="ml-12 space-y-4">
            {replies.map(reply => (
              <div key={reply.id} className="glass-subtle p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="heading-sm text-sm">{reply.userName}</p>
                      <p className="body-xs text-gray-500">{formatTimestamp(reply.timestamp)}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(reply.id)}
                    className="p-2 hover:bg-white rounded-lg transition-smooth"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>

                <p className="body-md mb-3">{reply.text}</p>

                <button
                  onClick={() => handleLike(reply.id)}
                  className="flex items-center gap-2 body-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{reply.likes || 0}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={remove} />
      
      <div className="glass-card p-8 rounded-lg border border-white/20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ColorfulIcon icon={MessageSquare} color="blue" animation="pulse-glow" size={28} />
          <h2 className="heading-lg">
            {t('blog.comments')} ({comments.length})
        </h2>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="glass-strong p-6 rounded-lg mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (errors.userName) setErrors(prev => ({ ...prev, userName: undefined }));
            }}
            placeholder="Your name"
            className={`glass-input w-full p-3 rounded-lg body-md ${errors.userName ? 'border-red-500' : ''}`}
            required
          />
          {errors.userName && (
            <p className="text-red-600 text-sm mt-1">{errors.userName}</p>
          )}
        </div>
        
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              if (errors.text) setErrors(prev => ({ ...prev, text: undefined }));
            }}
            placeholder="Write a comment..."
            className={`glass-input w-full p-4 rounded-lg body-md resize-none ${errors.text ? 'border-red-500' : ''}`}
            rows={4}
            required
          />
          {errors.text && (
            <p className="text-red-600 text-sm mt-1">{errors.text}</p>
          )}
        </div>
        
        <button type="submit" className="btn-award">
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {topLevelComments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="body-lg text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          topLevelComments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
      </div>
    </>
  );
}
