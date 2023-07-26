const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose
  .connect(
    "mongodb+srv://mern-chat-app:mern-chat-app@cluster0.sftyp6g.mongodb.net/",
    options
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
