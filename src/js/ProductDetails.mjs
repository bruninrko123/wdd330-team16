import { getLocalStorage, setLocalStorage }  from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

     async init() {
        if (!this.productId) {
            document.querySelector('.product-detail').innerHTML = '<p> No product selected.</p>';
            return;
        }

        this.product = await this.dataSource.findProductById(this.productId);

        if (!this.product) {
            document.querySelector('.product-detail').innerHTML = '<p> Product not found.</p>';
            return;
        }

        this.renderProductDetails();
     }

     addProductToCart() {
        let cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
     }

     renderProductDetails() {
        const details = document.querySelector('.product-detail');

        details.innerHTML = `
            <h3>${this.product.Brand?.Name || ''}</h3>
            <h2 class= 'divider'>${this.product.NameWithoutBrand || ''}</h2>
            <img class= 'divider' src='${this.product.Image || ''}' alt='${this.product.Name || 'Product'}'/>
            <p class='product-card__price'>$${this.product.FinalPrice || ""}</p>
            <p class='product__color'>${this.product.Colors?.[0]?.ColorName || ""}</p>
            <p class='product__description'>${this.product.DescriptionHtmlSimple || ""}</p>
        `;
     }
}