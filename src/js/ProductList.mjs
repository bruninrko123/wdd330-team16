import { renderListWithTemplate }  from './utils.mjs';
const baseURL = import.meta.env.VITE_SERVER_URL;

function productCardTemplate(product) {
        
        return `
        <li class='product-card'>
            <a href='/product_pages/?product=${product.Id}'>
              <img
                src='${product.Images.PrimaryMedium}'  
                alt='${product.NameWithoutBrand}}'
              />
              <h3 class='card__brand'>${product.NameWithoutBrand}</h3>
              <h2 class='card__name'>${product.Name}</h2>
              <p class='product-card__price'>${product.FinalPrice}</p>
            </a>
          </li>
        `;


    }

export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category; 
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

   
    async init() {
        const listOfProducts = await this.dataSource.getData(this.category);

        this.renderList(listOfProducts)
        
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    
}