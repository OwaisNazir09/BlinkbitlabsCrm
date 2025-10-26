// routes/index.js
const authRoutes = require("./auth");
const enquiryRoutes = require("./enquiry");
const BlinkbitlabsRoutes = require("./contactRoutes")

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/enquiries", enquiryRoutes);



  //these are the routes used externaally
  app.use("/api",BlinkbitlabsRoutes)

  app.get("/", (req, res) => {
    res.json({
      message: "cahlan hai chuh ",
    });
    console.log("Root route accessed");
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });
};
