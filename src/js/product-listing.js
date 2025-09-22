import ProductData from './ProductData.mjs'
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const span = document.querySelector('.title_highlight');



const category = getParam('category')

span.textContent = category;

const dataSource = new ProductData();

const listElement = document.querySelector('.product-list');

const productlist = new ProductList(category, dataSource, listElement)

productlist.init();