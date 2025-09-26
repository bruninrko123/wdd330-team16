import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
    subtotal = 0;
    total = 0;
    shipping = 8;
    numberofitems = 0;
  calcualteSubtotal() {
    
    const cartItems = getLocalStorage("so-cart");
    cartItems.forEach((item) => {
        this.subtotal += item.FinalPrice * item.quantity;
        this.numberofitems++;

        
    });
    
    document.querySelector('.subtotal').innerHTML =
    `Subtotal: $${this.subtotal.toFixed(2)}`;
}

    calculateTotal() {
    

    this.shippingtotal = this.numberofitems * 2 + this.shipping;

    this.total = (this.subtotal * 1.06) + this.shippingtotal;

        document.querySelector('.order-total').innerHTML = `Order total: $${this.total.toFixed(2)}`;
        
        document.querySelector('.shipping-estimate').innerHTML = `Shipping estimate: $${this.shippingtotal.toFixed(2)}`;

        document.querySelector('.tax').innerHTML = `Tax: $${(this.subtotal * 0.06).toFixed(2)}`;
  }
}