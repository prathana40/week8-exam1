 const BlogManager = require('./BlogManager');

const validPost = {
  title: "Understanding JavaScript Closures",
  author: { name: "Jane Doe", email: "jane@example.com" },
  content: "A closure is...",
  datePublished: "2024-10-09",
  likes: 120,
  comments: [
    { user: "John Doe", message: "Great post!", date: "2024-10-10" }
  ],
  tags: ["JavaScript", "Closures", "Functions"]
};

describe('BlogManager', () => {
  let manager;

  beforeEach(() => {
    manager = new BlogManager();
  });

  // ADD
  test('adds a valid blog post', () => {
    expect(manager.addBlogPost(validPost)).toEqual(validPost);
    expect(manager.listAllPosts().length).toBe(1);
  });

  test('throws error if missing required field', () => {
    const invalidPost = { ...validPost };
    delete invalidPost.title;
    expect(() => manager.addBlogPost(invalidPost)).toThrow(/Missing required field: title/);
  });

  test('throws error if duplicate title', () => {
    manager.addBlogPost(validPost);
    expect(() => manager.addBlogPost(validPost)).toThrow(/Title must be unique/);
  });

  // READ
  test('reads an existing blog post by title', () => {
    manager.addBlogPost(validPost);
    expect(manager.readBlogPost(validPost.title)).toEqual(validPost);
  });

  test('returns "Post not found" for missing title', () => {
    expect(manager.readBlogPost("No such title")).toBe("Post not found");
  });

  // UPDATE
  test('updates existing blog post fields', () => {
    manager.addBlogPost(validPost);
    const updated = manager.updateBlogPost(validPost.title, { likes: 500 });
    expect(updated.likes).toBe(500);
    expect(updated.title).toBe(validPost.title);
  });

  test('returns "Post not found" when updating non-existent post', () => {
    expect(manager.updateBlogPost("Missing", { likes: 100 })).toBe("Post not found");
  });

  test('throws error when updating title to a duplicate', () => {
    const post2 = { ...validPost, title: "Second Post" };
    manager.addBlogPost(validPost);
    manager.addBlogPost(post2);
    expect(() => manager.updateBlogPost(post2.title, { title: validPost.title })).toThrow(/Title must be unique/);
  });

  test('throws error if updated post misses required field', () => {
    manager.addBlogPost(validPost);
    expect(() => manager.updateBlogPost(validPost.title, { title: "" })).toThrow(/Title must be a non-empty string/);
  });

  // DELETE
  test('deletes an existing blog post', () => {
    manager.addBlogPost(validPost);
    const deleted = manager.deleteBlogPost(validPost.title);
    expect(deleted.title).toBe(validPost.title);
    expect(manager.listAllPosts().length).toBe(0);
  });

  test('returns "Post not found" when deleting non-existent post', () => {
    expect(manager.deleteBlogPost("Nope")).toBe("Post not found");
  });
});
