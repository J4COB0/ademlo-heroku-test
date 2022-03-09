// Express
const express = require("express");

// Controllers
const { globalErrorHandle } = require("./controllers/error.controller");

// Routers
const { postsRouter } = require("./routes/posts.routes");
const { usersRouter } = require("./routes/users.routes");
const { commentsRouter } = require("./routes/comments.routes");

// Utils
const { AppError } = require("./utils/appError");

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// HTTP STATUS CODE EXAMPLES:
// 2** -> success
// 3** -> misc
// 4** -> client errors
// 5** -> server errors

// Endpoints
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/comments", commentsRouter);

app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler
app.use( globalErrorHandle );

module.exports = { app };
