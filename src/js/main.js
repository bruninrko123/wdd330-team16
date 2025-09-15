import ProductData from './ProductData.mjs'
import ProductList from './ProductList.mjs';


const dataSource = new ProductData('tents');

const listElement = document.querySelector('.product-list');

const productlist = new ProductList('Tents', dataSource, listElement)

productlist.init();

