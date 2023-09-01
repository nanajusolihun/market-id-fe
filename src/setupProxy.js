const{ createProxyMiddleware } =  require ("http-proxy-middleware");

const proxyBaseURL = {
    target: process.env.REACT_APP_API_BASE_URL || "",
    changeOrigin: true,
    pathRewrite: {
        "^/api" : "",
    },
}

const proxyWilayah = {
    target: process.env.REACT_APP_API_WILAYAH || "",
    changeOrigin: true,
    pathRewrite: {
        "^/api-wilayah" : "",
    },
}

module.exports = function (App) {
    App.use("/api", createProxyMiddleware(proxyBaseURL))
    App.use("/api-wilayah", createProxyMiddleware(proxyWilayah))
}