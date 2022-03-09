// Models
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comments.model");

// Utils
const { filterObj } = require("../utils/filterObj");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  //Nested includes
  const user = await User.findAll({
    where: { status: "active" },
    include: [
      {
        model: Post,
        include: [{ model: Comment, include: [{ model: User }] }],
      },
      { model: Comment, include: [{ model: Post }] },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      users: user,
    },
  });
});

// Get user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id: id } });

  if (!user) {
    /* res.status(404).json({
      status: "Error",
      message: "No found user by ID given",
    });
    return; */
    return next(new AppError(404, 'user not found'));
  }

  res.status(200).json({
    status: "Success",
    data: {
      user: user,
    },
  });
});

// Create a new user
exports.createNewUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0
  ) {
    return next(new AppError(400, "Insure to include name and age for this request"));
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

// Update user using patch
exports.updateUserPatch = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = filterObj(req.body, "name", "email", "password");
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      res.status(404).json({
        status: "Error",
        message: "Can update user, invalid ID",
      });
      return;
    }

    await user.update({ ...data });

    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = User.findOne({ where: { id: id } });

    if (!user) {
      res.status(204).json({
        status: "Error",
        message: "Cannot found the user with the ID given",
      });
      return;
    }

    await user.destroy();

    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
