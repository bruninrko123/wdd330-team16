import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {

  constructor(key) {
    this.key = key;
    this.subtotal = 0;
    this.total = 0;
    this.shipping = 8;
    this.numberofitems = 0;
  }

  init() {
    this.calcualteSubtotal()
    this.calculateTotal();
  }
  calcualteSubtotal() {
    
    const cartItems = getLocalStorage(this.key);
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