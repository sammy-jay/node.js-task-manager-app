const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tasks", require("./routes/tasks"));

const port = 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
