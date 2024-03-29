const config = require("./common/config/env.config.js");
const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require("express");
const app = express();

const AuthorizationRouter = require("./routes/authorization/routes.config");
const UsersRouter = require("./routes/users/routes.config");
const FileRouter = require("./routes/file/routes.config");
const CategoryRouter = require("./routes/category/routes.config");
const OrganizationRouter = require("./routes/organization/routes.config");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3600',
    changeOrigin: true,
  })
);


app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
FileRouter.routesConfig(app);
CategoryRouter.routesConfig(app);
OrganizationRouter.routesConfig(app);

app.listen(config.port, function () {
  console.log("app listening at port %s", config.port);
});



