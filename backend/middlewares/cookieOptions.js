const setCookieOptions = (req, res, next) => {
  res.cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    path: "/",
  };
  next();
};

module.exports = setCookieOptions;
