 class BlogManager {
  constructor() {
    this.posts = [];
  }

  // Validate the required fields and uniqueness of title
  validatePost(post, updating = false, originalTitle = null) {
    const requiredFields = [
      "title", "author", "content", "datePublished", "likes", "comments", "tags"
    ];

    for (const field of requiredFields) {
      if (!(field in post)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (typeof post.title !== "string" || !post.title.trim()) {
      throw new Error("Title must be a non-empty string.");
    }

    if (
      !updating ||
      (updating && post.title !== originalTitle)
    ) {
      if (this.posts.some(p => p.title === post.title)) {
        throw new Error("Title must be unique.");
      }
    }

    if (
      typeof post.author !== "object" ||
      typeof post.author.name !== "string" ||
      typeof post.author.email !== "string"
    ) {
      throw new Error("Author must be an object with name and email strings.");
    }

    if (typeof post.content !== "string") {
      throw new Error("Content must be a string.");
    }

    // Basic ISO date format check (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.datePublished)) {
      throw new Error("datePublished must be in ISO format YYYY-MM-DD.");
    }

    if (typeof post.likes !== "number" || post.likes < 0) {
      throw new Error("Likes must be a non-negative number.");
    }

    if (!Array.isArray(post.comments)) {
      throw new Error("Comments must be an array.");
    }

    if (!Array.isArray(post.tags)) {
      throw new Error("Tags must be an array.");
    }
  }

  addBlogPost(post) {
    this.validatePost(post);
    this.posts.push(post);
    return post;
  }

  readBlogPost(title) {
    const found = this.posts.find(p => p.title === title);
    return found || "Post not found";
  }

  updateBlogPost(title, updatedDetails) {
    const index = this.posts.findIndex(p => p.title === title);
    if (index === -1) return "Post not found";

    const originalPost = this.posts[index];
    const updatedPost = { ...originalPost, ...updatedDetails };

    // Validate updated post with updating flag and original title
    this.validatePost(updatedPost, true, originalPost.title);

    this.posts[index] = updatedPost;
    return updatedPost;
  }

  deleteBlogPost(title) {
    const index = this.posts.findIndex(p => p.title === title);
    if (index === -1) return "Post not found";

    return this.posts.splice(index, 1)[0];
  }

  // Helper: get all posts (useful for testing)
  listAllPosts() {
    return [...this.posts];
  }
}

module.exports = BlogManager;
