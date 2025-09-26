import { getLocalStorage} from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');


//   if (cartItems) {
//     let total = 0;
//     cartItems.map((item) => { 
//       total += item.FinalPrice * item.quantity;
//       const p = document.querySelector('.total');
//       p.classList.remove('hide');
//       p.innerHTML = `Total: $${total.toFixed(2)}`;
//     })
//   }
// }


  if (cartItems) {
    let total = 0;
    const p = document.querySelector('.total');
    cartItems.forEach(item => {
      total += item.FinalPrice * item.quantity;   
    });
    p.innerHTML = `Total: $${total.toFixed(2)}`;
   
  }
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
</li>`;

  return newItem;
}
// loadHeaderFooter();
renderCartContents();
