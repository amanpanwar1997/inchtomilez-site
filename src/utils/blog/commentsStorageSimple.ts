/**
 * Simple localStorage-based comments system
 * Compatible with CommentsSection component
 */

export interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: number;
  likes: number;
  parentId: string | null;
}

const STORAGE_PREFIX = 'inchtomilez-comments-';

/**
 * Get all comments for a post
 */
export function getComments(postId: string): Comment[] {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + postId);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
}

/**
 * Save comments for a post
 */
function saveComments(postId: string, comments: Comment[]): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + postId, JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments:', error);
  }
}

/**
 * Add a new comment
 */
export function addComment(
  postId: string,
  data: {
    userName: string;
    text: string;
    parentId: string | null;
  }
): Comment {
  const comments = getComments(postId);
  
  const newComment: Comment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userName: data.userName,
    text: data.text,
    timestamp: Date.now(),
    likes: 0,
    parentId: data.parentId
  };

  comments.push(newComment);
  saveComments(postId, comments);
  
  return newComment;
}

/**
 * Delete a comment
 */
export function deleteComment(postId: string, commentId: string): boolean {
  const comments = getComments(postId);
  const filtered = comments.filter(c => c.id !== commentId && c.parentId !== commentId);
  saveComments(postId, filtered);
  return true;
}

/**
 * Like a comment
 */
export function likeComment(postId: string, commentId: string): boolean {
  const comments = getComments(postId);
  const comment = comments.find(c => c.id === commentId);
  
  if (comment) {
    comment.likes = (comment.likes || 0) + 1;
    saveComments(postId, comments);
    return true;
  }
  
  return false;
}

/**
 * Get comment count for a post
 */
export function getCommentCount(postId: string): number {
  return getComments(postId).length;
}

/**
 * Clear all comments for a post
 */
export function clearPostComments(postId: string): void {
  localStorage.removeItem(STORAGE_PREFIX + postId);
}
