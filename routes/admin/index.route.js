const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const roleRoute = require("./role.route");
const accountsRoute = require("./account.route");
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;

    app.use(`${path}/auth`, authRoute);

    app.use(`${path}/products`, authMiddleware.requireAuth, productRoute);

    app.use(`${path}/roles`, authMiddleware.requireAuth, roleRoute);
    
    app.use(
        `${path}/accounts`, 
        authMiddleware.requireAuth,
        accountsRoute
    );
}