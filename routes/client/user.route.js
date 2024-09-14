const express = require("express");
const multer = require('multer');
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const userMiddleware = require("../../middlewares/client/user.middleware");
const validate = require("../../validates/client/user.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

//register
router.get("/register", controller.register);

router.post("/register", validate.register, controller.registerPost);
//End register

// Auth
router.get("/login", controller.login);

router.post("/login", validate.login, controller.loginPost);

router.get("/logout", controller.logout);
// End Auth


// Profile
router.get("/profile", userMiddleware.requireAuth, controller.profile);

router.get("/profile/edit", userMiddleware.requireAuth, controller.editProfile);

router.patch(
    "/profile/edit", 
    userMiddleware.requireAuth, 
    upload.single('avatar'), 
    uploadCloud.uploadSingle,
    controller.editPatch
);

// router.get("/profile/changePassword", userMiddleware.requireAuth, controller.changePassword);

// router.patch("/profile/changePassword", userMiddleware.requireAuth, validate.changePass, controller.changePassPatch);
// End Profile

module.exports = router;