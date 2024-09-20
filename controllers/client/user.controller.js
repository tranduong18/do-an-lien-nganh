const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");

const generateHelper = require("../../helpers/generate.helper");
const sendEmailHelper = require("../../helpers/sendEmail.helper");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản",
    });
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(existUser){
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }


    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    };

    const user = new User(userData);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    req.flash("success", "Đăng ký tài khoản thành công!");
    
    res.redirect("/");
}

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    });
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) != user.password){
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if(user.status != "active"){
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    req.flash("success", "Đăng nhập thành công!");
    res.redirect("/");
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    req.flash("success", "Đăng xuất thành công");
    res.redirect("/user/login");
}

// [GET] /user/profile
module.exports.profile = async (req, res) => {
    res.render("client/pages/user/profile", {
        pageTitle: "Thông tin cá nhân",
    });
}

// [GET] /user/profile/edit
module.exports.editProfile = async (req, res) => {
    res.render("client/pages/user/editProfile", {
        pageTitle: "Sửa thông tin cá nhân",
    });
}

// [PATCH] /user/profile/edit
module.exports.editPatch = async (req, res) => {
    await User.updateOne({
        _id: res.locals.user.id
    }, req.body);

    req.flash("success", "Cập nhật thành công!");

    res.redirect("back");
}

// [GET] /user/profile/changePassword
module.exports.changePassword = async (req, res) => {
    res.render("client/pages/user/change-password", {
        pageTitle: "Đổi mật khẩu"
    });
}

// [PATCH] /user/profile/changePassword
module.exports.changePassPatch = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser,
    }, {
        password: md5(password)
    });

    req.flash("success", "Đổi mật khẩu thành công!");

    res.redirect("/user/profile");
}