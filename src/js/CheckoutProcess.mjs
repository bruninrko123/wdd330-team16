import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formatDataToJSON(formElement) {
  const formData = new FormData(formElement);

  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
    
}

function packageItems(items) {
    
    const simplifiedItems = items.map((item) => ({
      
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity,
      
    }));
    return simplifiedItems;
}


export default class CheckoutProcess {

  constructor(key) {
    this.key = key;
    this.subtotal = 0;
    this.total = 0;
    this.shipping = 8;
    this.numberofitems = 0;
    this.list = getLocalStorage(key);
  }

  init() {
    this.calculateSubtotal()
    
  }
  calculateSubtotal() {
    
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


  async checkout() {
    
    const formElement = document.forms['checkout'];

    const order = formatDataToJSON(formElement);

    const [year, month] = order.expiration.split('-');
    
    order.expiration = `${month}/${year.slice(-2)}`;

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.total.toString();
    order.tax = (this.subtotal * 0.06).toFixed(2).toString();
    order.shipping = this.shippingtotal;
    order.items = packageItems(this.list);

    console.log(order);

    try {
      const response = await services.checkout(order);
      console.log('check response: ', response);
      localStorage.removeItem(this.key);

      window.location.href = 'success.html';
    } catch (err) {
      console.log(err);
      throw {name: 'Error posting', message: err}
    }

  }
  
   
  
}



  // packageItems() {
  //   const cartItems = getLocalStorage(this.key);
  //   const productsArray = [];
  //   const form = document.querySelector('form');
      
  //     form.addEventListener('submit', () => {

  //       cartItems.map((item) => {
  //         let product = {
  //           id: item.Id,
  //           name: item.Brand.Name,
  //           price: item.FinalPrice,
  //           quantity: item.quantity,
  //         };

  //         productsArray.push(product);
  //       })

     
  //       let order = {
  //         orderDate: '2021-01-27T18:18:26.095Z',
  //         fname: form.get('fname'),
  //         lname: form.get('lname'),
  //         street: form.get('street'),
  //         city: form.get('city'),
  //         state: form.get('state'),
  //         zip: form.get('zip'),
  //         cardNumber: form.get('cardNumber'),
  //         expiration: form.get('expiration'),
  //         code: form.get('code'),
  //         items: productsArray,
  //         orderTotal: this.total,
  //         shipping: this.shipping,
  //         tax: this.subtotal * 0.06.toFixed(2)
  //       };
  //     });
    
    
      
   
  // 
