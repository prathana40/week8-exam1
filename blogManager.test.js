
const {
  addOne,
  getAll,
  getByTitle,
  update,
  deleteByTitle,
  resetState,
} = require("./BlogManager");

beforeEach(() => {
  resetState();
});

const examplePost = {
  title: "Understanding JavaScript Closures",
  author: {
    name: "Jane Doe",
    email: "jane@example.com",
  },
  content: "A closure is...",
  datePublished: "2024-10-09",
  likes: 120,
  comments: [
    {
      user: "John Doe",
      message: "Great post!",
      date: "2024-10-10",
    },
  ],
  tags: ["JavaScript", "Closures", "Functions"],
};

describe("Add Operation: addOne()", () => {
  test("should add a valid post", () => {
    const post = addOne(examplePost);
    expect(post).toEqual(examplePost);
    expect(getAll()).toHaveLength(1);
  });

  test("should reject duplicate title", () => {
    addOne(examplePost);
    expect(addOne(examplePost)).toBe(false);
  });

  test("should reject invalid post (missing fields)", () => {
    const invalidPost = { ...examplePost };
    delete invalidPost.title;
    expect(addOne(invalidPost)).toBe(false);
  });
});

describe("Read Operations: getAll() and getByTitle()", () => {
  test("getAll() returns all posts", () => {
    addOne(examplePost);
    expect(getAll()).toHaveLength(1);
  });

  test("getByTitle() returns the correct post", () => {
    addOne(examplePost);
    expect(getByTitle(examplePost.title)).toEqual(examplePost);
  });

  test("getByTitle() returns null if not found", () => {
    expect(getByTitle("Nonexistent")).toBeNull();
  });
});

describe("Update Operation: update()", () => {
  test("should update post fields", () => {
    addOne(examplePost);
    const updated = update(examplePost.title, {
      content: "Updated content",
      likes: 200,
    });
    expect(updated.content).toBe("Updated content");
    expect(updated.likes).toBe(200);
  });

  test("should prevent duplicate title on update", () => {
    addOne(examplePost);
    addOne({
      ...examplePost,
      title: "Another Post",
    });
    expect(update("Another Post", { title: examplePost.title })).toBe(false);
  });

  test("should return false for non-existent title", () => {
    expect(update("NoPost", { content: "Test" })).toBe(false);
  });
});

describe("Delete Operation: deleteByTitle()", () => {
  test("should delete and return deleted post", () => {
    addOne(examplePost);
    const deleted = deleteByTitle(examplePost.title);
    expect(deleted).toEqual(examplePost);
    expect(getAll()).toHaveLength(0);
  });

  test("should return false if post not found", () => {
    expect(deleteByTitle("NoPost")).toBe(false);
  });
});
