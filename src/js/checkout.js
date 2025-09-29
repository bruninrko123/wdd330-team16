import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();


const order = new CheckoutProcess('so-cart');

order.init();

document.querySelector('#zip').addEventListener('blur', order.calculateTotal.bind(order));

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    order.checkout();
})


// build test