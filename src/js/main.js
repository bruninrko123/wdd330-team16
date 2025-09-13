import ProductData from './public/json/Tents.json'
import ProductList from './ProductList.mjs'

const dataSource = new ProductData("tents");

const element = document.querySelector('.product-list');

const productList = new ProductList("tents", dataSource, element);


productList.Init();

