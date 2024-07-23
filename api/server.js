require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const express = require("express");

const route = require("./router");

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_BACKOFFICE],
  })
);

app.use(express.json());
const swaggerDocument = YAML.load("./swagger.yml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", route);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}/api`,
    `Swagger Api listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}/api-docs`
  );
});
