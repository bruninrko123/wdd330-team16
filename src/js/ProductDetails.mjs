import {setLocalStorage, getLocalStorage} from './utils.mjs'

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // the product details are needed before rendering the HTML
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    
    this.product = await this.dataSource.findProductById(this.productId);
    
    this.renderProductDetails();
      
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }
    

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];  
    cartItems.push(this.product); 
    setLocalStorage('so-cart', cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product)
  }
  

  
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage2');
  productImage.alt = product.NameWithoutBrand;
  productImage.src = product.Image;

  document.querySelector('.discount').textContent = `${Math.round((1 - (product.FinalPrice / product.SuggestedRetailPrice)) * 100)}% off`;
  document.querySelector('.product-card__price').innerHTML =
    `<span style ='text-decoration: line-through;'>$${product.SuggestedRetailPrice}</span> Now only $${product.FinalPrice} `;
  document.querySelector('.product__color').textContent = product.Colors.ColorName;
  document.querySelector('.product__description').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;

  

}