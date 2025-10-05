import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      removeItem(name);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors?.[0]?.ColorName}</p>
  <p class='cart-card__quantity'> Qt: ${item.quantity}</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <button class="remove-item" data-name="${item.Name}">X</button>
</li>`;

  return newItem;
}

function removeItem(name) {
  let cartItems = getLocalStorage('so-cart');
  cartItems = cartItems.filter(item => item.Name !== name);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

// loadHeaderFooter();
renderCartContents();
