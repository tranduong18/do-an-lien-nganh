const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /search
module.exports.index = async(req, res) => {
    const keyword = req.query.keyword;

    let paginatedProductsSearch = [];
    let pagination = [];

    if(keyword){
        const regex = new RegExp(keyword, "i");

        const find = {
            status: "active",
            deleted: false,
            title: regex
        };
    
        let allProducts = await Product.find(find).sort({ position: "desc" });
    
        // Lọc theo giá
        if (req.query.priceStart && req.query.priceEnd) {
            const priceStart = Number(req.query.priceStart);
            const priceEnd = Number(req.query.priceEnd);
    
            allProducts = allProducts.filter(product => {
                return product.priceNew >= priceStart && product.priceNew <= priceEnd;
            });
        }
    
        // Phân trang
        pagination = await paginationHelper.productClient(req, allProducts);
    
        paginatedProductsSearch = allProducts.slice(pagination.skip, pagination.skip + pagination.limitItems);
    }

    res.render("client/pages/search/index", {
        pageTitle: "Tìm kiếm",
        keyword: keyword,
        products: paginatedProductsSearch,
        pagination: pagination
    });
}