const express = require("express");
const { chats } = require("./Data");
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require("morgan");
const NotFound = require("./Middleware/NotFound");
const ErrorHandler = require("./Middleware/ErrorHandler");
require("dotenv").config();
require("./Config/Db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(morgan("tiny"));
app.use(express.json());
// app.use(NotFound);
// app.use(ErrorHandler);

app.use("/api/user", require("./Routes/UserRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
