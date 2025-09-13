import ProductData from '.ProductData.mjs';
import ProductList from '.ProductList.mjs';

const ProductData = new ProductData('./tents.json');

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();