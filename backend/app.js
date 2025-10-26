const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongooseConnection = require("./config/mongooseConfig");
const setupRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");
const setCookieOptions = require("./middlewares/cookieOptions");
const limiter = require("./utils/rateRimit");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(cookieParser());

mongooseConnection();
app.use(morgan("dev"));
setupRoutes(app);
app.use(setCookieOptions);

const PORT = process.env.PORT || 5000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
