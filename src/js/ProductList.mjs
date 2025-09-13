export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }


    async Init() {
        const list = await this.dataSource.getData();
    }
    
    renderList(list) {
        this.listElement.innerHTML = '';
        list.forEach(product => {
            this.listElement.innerHTML += productCardTemplate(product);
        }); 
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=">
    <img src="" alt="Image of ">
    <h2 class="card_brand"></h2>
    <h3 class="card_name"></h3>
    <p class="product-card_price">$</p>
    </a>
    <li>`
}