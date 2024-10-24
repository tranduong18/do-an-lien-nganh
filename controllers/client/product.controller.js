const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /products/
module.exports.index = async (req, res) => {
    const find = {
        status: "active",
        deleted: false
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

    if(req.query.size){
        const sizeFilter = req.query.size;
        allProducts = allProducts.filter(product => {
            return product.size.includes(sizeFilter);
        });
    }

    // Phân trang
    const pagination = await paginationHelper.productClient(req, allProducts);

    const paginatedProducts = allProducts.slice(pagination.skip, pagination.skip + pagination.limitItems);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: paginatedProducts,
        pagination: pagination
    });
};

// [GET] /products/:slugCategory
module.exports.category = async(req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    });

    let parentCategorySlug = "";
    let parentCategoryTitle = "";

    if(category.parent_id != ""){
        const parentCategory = await ProductCategory.findOne({
            _id: category.parent_id,
            status: "active",
            deleted: false
        });
        
        parentCategorySlug = parentCategory.slug;
        parentCategoryTitle = parentCategory.title;
    }    

    const allSubCategory = [];

    const getSubCategory = async(currentId) => {
        const subCategory = await ProductCategory.find({
            parent_id: currentId,
            status: "active",
            deleted: false
        });

        for(const sub of subCategory){
            allSubCategory.push(sub.id);
            await getSubCategory(sub.id);
        }
    }

    await getSubCategory(category.id);

    let products = await Product.find({
        product_category_id: {
            $in: [
                category.id,
                ...allSubCategory
            ]
        },
        status: "active", 
        deleted: false
    }).sort({ position: "desc" });

    for(const item of products){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    // Lọc sản phẩm theo giá
    if (req.query.priceStart && req.query.priceEnd) {
        const priceStart = Number(req.query.priceStart);
        const priceEnd = Number(req.query.priceEnd);

        products = products.filter(product => {
            return product.priceNew >= priceStart && product.priceNew <= priceEnd;
        });
    }

    const pagination = await paginationHelper.productClient(req, products);

    const paginatedProducts = products.slice(pagination.skip, pagination.skip + pagination.limitItems);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: products,
        pagination: pagination,
        slug: slugCategory,
        title: category.title,
        parentCategoryTitle: parentCategoryTitle,
        parentCategorySlug: parentCategorySlug
    });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({
       slug: slug,
       deleted: false,
       status: "active" 
    });

    product.priceNew = ((1 - product.discountPercentage/100) * product.price).toFixed(0);

    const similarProduct = await Product.find({
        _id: {$ne: product.id},
        product_category_id: product.product_category_id,
        status: "active",
        deleted: false
    });

    if(product){
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product,
            similarProduct: similarProduct
        });
    }
    else{
        res.redirect("/");
    }
}