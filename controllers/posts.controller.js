// Models
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");

// Utils
const { filterObj } = require("../utils/filterObj");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

/* const posts = [
    { id: 1, title: 'Post_1', content: 'Some content 1', author: 'author 1'},
    { id: 2, title: 'Post_2', content: 'Some content 2', author: 'author 2'},
    { id: 3, title: 'Post_3', content: 'Some content 3', author: 'author 3'}
]; */

// Get all posts
// exports const getAllPosts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  // SELECT * FROM posts
  const postsDb = await Post.findAll({
    where: { status: "active" },
    include: [{ model: User }],
  });

  res.status(200).json({
    status: "success",
    data: {
      posts: postsDb,
    },
  });
});

// Get post by ID
exports.getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // SELECT * FROM post WHERE id = 1;
  const post = await Post.findOne({
    where: {
      id: id,
      status: "active",
    },
  });

  if (!post) {
    return next(new AppError(404, "No post found with the given id"));
  }
  res.status(200).json({
    status: "success",
    data: {
      post: post,
    },
  });
});

// Save post to database
exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (
    !title ||
    !content ||
    !userId ||
    title.length === 0 ||
    content.length === 0
  ) {
    return next(
      new AppError(400, "Insure to include name and age for this request")
    );
  }

  // INSERT INTO posts () VALUES ('A new post', 'Save in Db', 'Jacobo')
  const newPost = await Post.create({
    title: title, // DbColumn:
    content: content,
    userId: userId,
  });

  res.status(201).json({
    status: "success",
    data: { newPost },
  });
});

// Update post (put)
exports.updatePostPut = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Extact title, content and author from req.body
    const { title, content, author } = req.body;

    // Validate the data has some value
    if (
      !title ||
      !content ||
      !author ||
      title.length === 0 ||
      content.length === 0 ||
      author.length === 0
    ) {
      res.status(400).json({
        staus: "Error",
        message: "Must provide a title, content and the author for thi request",
      });
      return;
    }

    // Find post by id, and get the index
    const post = await Post.findOne({
      where: {
        id: id,
        status: "active",
      },
    });

    if (!post) {
      res.status(404).json({
        status: "Error",
        messege: "Can update post, invalid ID",
      });
      return;
    }

    await post.update({
      title: title,
      content: content,
      author: author,
    });

    res.status(204).json({ staus: "success" }); //Es necesario poner el JSON
  } catch (error) {
    console.log(error);
  }
};

// Update post (patch)
exports.updatePostPatch = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = filterObj(req.body, "title", "content", "author");
    const post = await Post.findOne({
      where: {
        id: id,
        status: "active",
      },
    });

    if (!post) {
      res.status(404).json({
        status: "Error",
        message: "Cant update post, invalid ID",
      });
      return;
    }

    await post.update({ ...data });

    res.status(204).json({ status: "Success" });
  } catch (error) {}
};

// Delete posts
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id: id,
        status: "active",
      },
    });

    if (!post) {
      res.status(404).json({
        status: "Error",
        message: "Cant delete",
      });
    }

    //DELETE FROM post WHERE id
    // await post.destroy();

    //soft delete
    await post.update({ status: "deleted" });

    res.status(204).json({ status: "Success" });
  } catch (error) {
    console.log(error);
  }
};
