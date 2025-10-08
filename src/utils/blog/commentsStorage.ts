import { Comment } from './blogUtils';

const STORAGE_KEY = 'blog_comments';

// Get all comments for a post
export function getComments(postId: string): Comment[] {
  const allComments = getAllComments();
  return allComments.filter(comment => comment.postId === postId);
}

// Get all comments from localStorage
function getAllComments(): Comment[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored).map((c: any) => ({
      ...c,
      createdAt: new Date(c.createdAt)
    }));
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
}

// Save all comments to localStorage
function saveAllComments(comments: Comment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments:', error);
  }
}

// Add a new comment
export function addComment(
  postId: string,
  author: string,
  email: string,
  content: string,
  parentId?: string
): Comment {
  const newComment: Comment = {
    id: generateId(),
    postId,
    author,
    email,
    content,
    createdAt: new Date(),
    replies: [],
    upvotes: 0
  };

  const allComments = getAllComments();

  if (parentId) {
    // Add as reply
    addReplyToComment(allComments, parentId, newComment);
  } else {
    // Add as top-level comment
    allComments.push(newComment);
  }

  saveAllComments(allComments);
  return newComment;
}

// Recursively add reply to parent comment
function addReplyToComment(
  comments: Comment[],
  parentId: string,
  reply: Comment
): boolean {
  for (const comment of comments) {
    if (comment.id === parentId) {
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.push(reply);
      return true;
    }
    if (comment.replies && comment.replies.length > 0) {
      if (addReplyToComment(comment.replies, parentId, reply)) {
        return true;
      }
    }
  }
  return false;
}

// Delete a comment
export function deleteComment(commentId: string): boolean {
  const allComments = getAllComments();
  const updated = removeCommentById(allComments, commentId);
  saveAllComments(updated);
  return true;
}

// Recursively remove comment by ID
function removeCommentById(comments: Comment[], commentId: string): Comment[] {
  return comments.filter(comment => {
    if (comment.id === commentId) {
      return false;
    }
    if (comment.replies && comment.replies.length > 0) {
      comment.replies = removeCommentById(comment.replies, commentId);
    }
    return true;
  });
}

// Update comment
export function updateComment(commentId: string, content: string): boolean {
  const allComments = getAllComments();
  const updated = updateCommentContent(allComments, commentId, content);
  if (updated) {
    saveAllComments(allComments);
    return true;
  }
  return false;
}

// Recursively update comment content
function updateCommentContent(
  comments: Comment[],
  commentId: string,
  content: string
): boolean {
  for (const comment of comments) {
    if (comment.id === commentId) {
      comment.content = content;
      return true;
    }
    if (comment.replies && comment.replies.length > 0) {
      if (updateCommentContent(comment.replies, commentId, content)) {
        return true;
      }
    }
  }
  return false;
}

// Upvote comment
export function upvoteComment(commentId: string): boolean {
  const allComments = getAllComments();
  const updated = incrementUpvote(allComments, commentId);
  if (updated) {
    saveAllComments(allComments);
    return true;
  }
  return false;
}

// Recursively increment upvote
function incrementUpvote(comments: Comment[], commentId: string): boolean {
  for (const comment of comments) {
    if (comment.id === commentId) {
      comment.upvotes++;
      return true;
    }
    if (comment.replies && comment.replies.length > 0) {
      if (incrementUpvote(comment.replies, commentId)) {
        return true;
      }
    }
  }
  return false;
}

// Get comment count for a post
export function getCommentCount(postId: string): number {
  const comments = getComments(postId);
  return countAllComments(comments);
}

// Recursively count all comments including replies
function countAllComments(comments: Comment[]): number {
  let count = comments.length;
  for (const comment of comments) {
    if (comment.replies && comment.replies.length > 0) {
      count += countAllComments(comment.replies);
    }
  }
  return count;
}

// Generate unique ID
function generateId(): string {
  return `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get recent comments across all posts
export function getRecentComments(limit: number = 5): Comment[] {
  const allComments = getAllComments();
  return allComments
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

// Search comments by content
export function searchComments(query: string): Comment[] {
  const allComments = getAllComments();
  const lowerQuery = query.toLowerCase();
  return searchCommentsRecursive(allComments, lowerQuery);
}

// Recursively search comments
function searchCommentsRecursive(comments: Comment[], query: string): Comment[] {
  const results: Comment[] = [];
  
  for (const comment of comments) {
    if (
      comment.content.toLowerCase().includes(query) ||
      comment.author.toLowerCase().includes(query)
    ) {
      results.push(comment);
    }
    
    if (comment.replies && comment.replies.length > 0) {
      results.push(...searchCommentsRecursive(comment.replies, query));
    }
  }
  
  return results;
}

// Export all comments (for backup)
export function exportComments(): string {
  return localStorage.getItem(STORAGE_KEY) || '[]';
}

// Import comments (from backup)
export function importComments(data: string): boolean {
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing comments:', error);
    return false;
  }
}

// Clear all comments for a post
export function clearPostComments(postId: string): boolean {
  const allComments = getAllComments();
  const filtered = allComments.filter(comment => comment.postId !== postId);
  saveAllComments(filtered);
  return true;
}

// Get top commenters
export function getTopCommenters(limit: number = 5): Array<{ author: string; count: number }> {
  const allComments = getAllComments();
  const counts: Record<string, number> = {};
  
  function countAuthors(comments: Comment[]) {
    comments.forEach(comment => {
      counts[comment.author] = (counts[comment.author] || 0) + 1;
      if (comment.replies && comment.replies.length > 0) {
        countAuthors(comment.replies);
      }
    });
  }
  
  countAuthors(allComments);
  
  return Object.entries(counts)
    .map(([author, count]) => ({ author, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}