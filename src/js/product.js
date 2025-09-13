import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

// gets product id from URL
const productId = getParam('product');

// create data source for tents.json
const dataSource = new ProductData('tents');

// create and initialize product details
const product = new ProductDetails(productId, dataSource);
  product.init();