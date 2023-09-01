const{ createProxyMiddleware } =  require ("http-proxy-middleware");

const proxyWilayah = {
    target: process.env.REACT_APP_API_WILAYAH || "",
    changeOrigin: true,
    pathRewrite: {
        "^/api-wilayah" : "",
    },
}

module.exports = function (App) {
    App.use("/api-wilayah", createProxyMiddleware(proxyWilayah))
}