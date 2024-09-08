const homeRoute = require("./home.route");
// const productRoute = require("./product.route");
const userRoute = require("./user.route");

const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports.index = (app) => {
    app.use(userMiddleware.infoUser);

    app.use("/", homeRoute);
    
    // app.use("/products", productRoute);

    app.use("/user", userRoute);
}