// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    let time = showAlert.getAttribute("show-alert") || 3000;
    time = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, time);
}
// End show-alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        console.log(file);
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End Upload Image

// Cập nhật số lượng sản phẩm trong giỏ hàng
const listInputQuantity = document.querySelectorAll("[cart] input[name='quantity']");
if(listInputQuantity){
    listInputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("product-id");
            const quantity = parseInt(input.value);
            const sizeName = input.getAttribute("data-size-name");
            
            if(productId && quantity > 0){
                window.location.href = `/cart/update/${productId}/${quantity}/${sizeName}`;
            }
        });
    });
}
// Hết Cập nhật số lượng sản phẩm trong giỏ hàng

// Cập nhật size sản phẩm trong giỏ hàng
const selectSize = document.querySelectorAll("[cart] select[name='size']");
if(selectSize){
    selectSize.forEach(option => {
        option.addEventListener("change", () => {
            const productId = option.getAttribute("product-id");
            const sizeName = option.getAttribute("data-size-name");
            const sizeChange = option.value;

            if(productId && sizeName && sizeChange){
                window.location.href = `/cart/update/${productId}/size/${sizeName}/${sizeChange}`;
            }
        });
    });
}
// Hết Cập nhật size sản phẩm trong giỏ hàng

// Toggle Password
const passInput = document.querySelector("#passwordInput");
if(passInput){
    const buttonTogglePass = document.querySelector("#togglePassword");
    const eyeIcon = buttonTogglePass.querySelector("[icon]");

    if (buttonTogglePass) {
        buttonTogglePass.addEventListener("click", () => {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }
}
// End Toggle Password

// Icon add to Cart 
const listIconAddtoCart = document.querySelectorAll("[add-to-cart]");
if (listIconAddtoCart.length > 0) {
    listIconAddtoCart.forEach(icon => {
        icon.addEventListener("click", () => {
            const link = icon.getAttribute("link");
            fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Icon add to Cart 

// Add to Wishlist 
const listIconAddtoWishlist = document.querySelectorAll("[add-to-wishlist]");
if (listIconAddtoWishlist.length > 0) {
    listIconAddtoWishlist.forEach(icon => {
        icon.addEventListener("click", () => {
            const link = icon.getAttribute("link");
            fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Add to Wishlist

// Delete to Wishlist 
const listIconDeletetoWishlist = document.querySelectorAll("[delete-to-wishlist]");
if (listIconDeletetoWishlist.length > 0) {
    listIconDeletetoWishlist.forEach(icon => {
        icon.addEventListener("click", () => {
            const link = icon.getAttribute("link");
            fetch(link, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Delete to Wishlist

// Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
    let url = new URL(window.location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
// End Pagination

// Navbar
const listButtonNavbar = document.querySelectorAll("[navbar]");
if (listButtonNavbar) {
    const url = new URL(window.location.href);
    const currentPath = url.pathname;

    listButtonNavbar.forEach(button => {
        if(button.getAttribute('href') === currentPath) {
            button.classList.add('active');
        }

        button.addEventListener('click', function() {
            listButtonNavbar.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');
        });
    });
}

// End Navbar

// Lọc sản phẩm theo giá
const listFilterByPrice = document.querySelectorAll("[filter-price]");
if (listFilterByPrice.length > 0) {
    let url = new URL(window.location.href);
    listFilterByPrice.forEach(price => {
        price.addEventListener("click", () => {
            const [priceStart, priceEnd] = price.getAttribute("filter-price").split('-');
            if (priceStart && priceEnd) {
                listFilterByPrice.forEach(item => item.classList.remove("active"));
                price.classList.add("active");
                url.searchParams.set("priceStart", priceStart);
                url.searchParams.set("priceEnd", priceEnd);
                window.location.href = url.href;
            }
        });
    });

    const currentPriceStart = url.searchParams.get("priceStart");
    const currentPriceEnd = url.searchParams.get("priceEnd");

    listFilterByPrice.forEach(price => {
        const [priceStart, priceEnd] = price.getAttribute("filter-price").split('-');
        if (currentPriceStart === priceStart && currentPriceEnd === priceEnd) {
            price.classList.add("active");
        }
    });
}
// Hết Lọc sản phẩm theo giá

// Lọc sản phẩm theo size
const listFilterBySize = document.querySelectorAll("[filter-size]");
if (listFilterBySize.length > 0) {
    let url = new URL(window.location.href);
    listFilterBySize.forEach(Size => {
        Size.addEventListener("click", () => {
            const size = Size.getAttribute("filter-size");
            if(size) {
                listFilterBySize.forEach(item => item.classList.remove("active"));
                Size.classList.add("active");
                url.searchParams.set("size", size);
                window.location.href = url.href;
            }
        });
    });

    const currentSize = url.searchParams.get("size");

    listFilterBySize.forEach(Size => {
        const size = Size.getAttribute("filter-size");
        if (currentSize === size) {
            Size.classList.add("active");
        }
    });
}
// Hết Lọc sản phẩm theo size

// Xử lý size của sản phẩm
const sizeRadios = document.querySelectorAll('input[name="size-radio"]');
if(sizeRadios.length > 0){
    const hiddenSizeInput = document.querySelector('#hidden-size');

    sizeRadios.forEach(size => {
        size.addEventListener('change', function() {
            hiddenSizeInput.value = this.value;
        });
    });
}
// Hết Xử lý size của sản phẩm

// detail-product-images
const productImages = document.querySelector(".product-detail-images");
if(productImages){
    const swiper = new Swiper(".product-detail-images", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
    });
}
// End detail-product-images