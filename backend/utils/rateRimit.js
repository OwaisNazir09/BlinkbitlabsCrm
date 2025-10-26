const ratelimit = require("express-rate-limit");

const limiter = ratelimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Request limit exceeded. Please try again later.",
});

module.exports = limiter;
