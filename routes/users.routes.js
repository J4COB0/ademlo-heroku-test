// Get express
const express = require("express");

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUserPatch,
} = require("../controllers/users.controller");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Save new user
router.post("/", createNewUser);

// Update user (patch)
router.patch("/:id", updateUserPatch);

// Delete users
router.delete("/:id", deleteUser);

// Exports
module.exports = { usersRouter: router };
