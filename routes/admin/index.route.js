const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const authRoute = require("./auth.route");
const roleRoute = require("./role.route");
const accountsRoute = require("./account.route");
const userRoute = require("./user.route");
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;

    app.use(`${path}/dashboard`, authMiddleware.requireAuth, dashboardRoute);

    app.use(`${path}/auth`, authRoute);

    app.use(`${path}/products`, authMiddleware.requireAuth, productRoute);

    app.use(`${path}/products-category`, authMiddleware.requireAuth, productCategoryRoute);

    app.use(`${path}/roles`, authMiddleware.requireAuth, roleRoute);
    
    app.use(
        `${path}/accounts`, 
        authMiddleware.requireAuth,
        accountsRoute
    );

    app.use(
        `${path}/users`, 
        authMiddleware.requireAuth,
        userRoute
    );
}