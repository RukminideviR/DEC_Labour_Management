const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://103.252.144.86",
      changeOrigin: true,
      secure: false,
    })
  );
};
