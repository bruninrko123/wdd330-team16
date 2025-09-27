import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();


const result = new CheckoutProcess('so-cart');

result.init();



// build test