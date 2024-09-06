const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./product.route");
const authRoute = require("./auth.route");
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;

    app.use(
        `${path}/dashboard`,
        authMiddleware.requireAuth,
        dashboardRoute
    );
    
    app.use(
        `${path}/products`, 
        authMiddleware.requireAuth,
        productsRoute
    );

    app.use(`${path}/auth`, authRoute);
}