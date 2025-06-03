 // blogManager.js

let blogPosts = [];
let idCounter = 1; // Optional, but using title as unique id here

function resetState() {
  blogPosts = [];
  idCounter = 1;
}

// Helper: Validate blog post structure (basic)
function validatePost(post) {
  if (
    !post.title ||
    typeof post.title !== "string" ||
    !post.author ||
    typeof post.author.name !== "string" ||
    typeof post.author.email !== "string" ||
    !post.content ||
    typeof post.content !== "string" ||
    !post.datePublished ||
    typeof post.datePublished !== "string" ||
    typeof post.likes !== "number" ||
    !Array.isArray(post.comments) ||
    !Array.isArray(post.tags)
  ) {
    return false;
  }
  // Additional checks can be added
  return true;
}

// --- Create/Add ---
function addOne(post) {
  // Validate input
  if (!validatePost(post)) return false;

  // Ensure title is unique
  if (blogPosts.find((p) => p.title === post.title)) return false;

  // Add post
  blogPosts.push(post);
  return post;
}

// --- Read ---
function getAll() {
  return blogPosts;
}

function getByTitle(title) {
  return blogPosts.find((p) => p.title === title) || null;
}

// --- Update ---
function update(title, updates) {
  const post = blogPosts.find((p) => p.title === title);
  if (!post) return false;

  // Prevent changing title to a duplicate title
  if (
    updates.title &&
    updates.title !== title &&
    blogPosts.find((p) => p.title === updates.title)
  ) {
    return false;
  }

  // Update fields
  Object.assign(post, updates);
  return post;
}

// --- Delete ---
function deleteByTitle(title) {
  const index = blogPosts.findIndex((p) => p.title === title);
  if (index === -1) return false;

  const [deleted] = blogPosts.splice(index, 1);
  return deleted;
}

module.exports = {
  addOne,
  getAll,
  getByTitle,
  update,
  deleteByTitle,
  resetState,
};
