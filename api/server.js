require("dotenv").config();

const cors = require("cors");
const express = require("express");

const route = require("./router");

const app = express();
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://mysite.com",
      "http://another-domain.com",
    ],
  })
);

app.use(express.json());

app.use("/api", route);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}/api`
  );
});
