const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const userRoute = require("./user.route");
const cartRoute = require("./cart.route");
const productwishlistRoute = require("./product-wishlist.route");

const userMiddleware = require("../../middlewares/client/user.middleware");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports.index = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);

    app.use("/", homeRoute);
    
    app.use("/products", productRoute);

    app.use("/user", userRoute);

    app.use("/cart", cartRoute);

    app.use("/wishlist", userMiddleware.requireAuth , productwishlistRoute);
}