const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.static("./public/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tasks", require("./routes/tasks"));

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(err);
  }
};

start();
