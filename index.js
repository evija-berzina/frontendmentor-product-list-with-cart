let products = [];

fetch('/data.json')
    .then(res => res.json())
    .then(data => {
      products = data;

      products.forEach((product, index) => {
        product.id = index + 1;
        product.quantity = 0;
      })

      const productCard = document.querySelector('.products-js');
      const cart = document.querySelector('.cart-js');

      renderProducts(products);
      renderCart(products);

      function renderProducts(products) {
        let productsHTML = '';

        products.forEach((product) => {
          // const product = data[index];
          productsHTML += `
            <article class="product-card" data-id="${product.id}">
              <div class="product-card__img-container flex">
                <picture>
                  <source srcset="${product.image.desktop}" media="(min-width: 45rem)" />
                  <source srcset="${product.image.tablet}" media="(min-width: 35rem)" />
                  ${ product.quantity === 0
                  ? `<img class="product-card__image" src="${product.image.mobile}" width="654" height="424" alt="${product.name}">`
                  : `<img class="product-card__image product-card__image--border" src="${product.image.mobile}" width="654" height="424" alt="${product.name}">`
                  }
                </picture>
                ${ product.quantity === 0
                  ? `<button class="product-card__btn flex product-btn-js">
                      <img src="assets/images/icon-add-to-cart.svg" alt="">
                      <span>Add to Cart</span>
                    </button>`
                  : `<div class="quantity-controls flex">
                      <button class="decrease-btn flex">
                        <svg class="icon" viewBox="0 0 10 2">
                          <path d="M0 .375h10v1.25H0V.375Z" />
                        </svg>
                      </button>
                        <span>${product.quantity}</span>
                      <button class="increase-btn flex">
                        <svg class="icon" viewBox="0 0 10 10">
                          <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                        </svg>
                      </button>
                    </div>`
                }
              </div>
              <div class="product-card__content flex">
                <p class="product-card__category">${product.category}</p>
                <p class="product-card__name">${product.name}</p>
                <p class="product-card__price">
                  <span>&#36</span>${(product.price).toFixed(2)}
                </p>
              </div>
            </article>
          `;
        });

        productCard.innerHTML = productsHTML;

      }

      productCard.addEventListener('click', (event) => {
        const card = event.target.closest('.product-card');
        if (!card) return;

        const productId = Number(card.dataset.id);
        const product = products.find(p => p.id === productId);

        if (event.target.closest('.product-btn-js')) {
          product.quantity = 1;
        }

        if (event.target.closest('.increase-btn')) {
          product.quantity += 1;
        }

        if (event.target.closest('.decrease-btn')) {
          product.quantity -= 1;
          if (product.quantity < 0) product.quantity = 0;
        }

        renderProducts(products);
        renderCart(products);
        productCartInfo(products);
    });

        function renderCart(products) {
          let cartHTML = '';
          const product = totalQuantity(products);

          cartHTML += `
            ${ product.totalQuantity === 0
              ? `<article class="product-cart-container flex">
                <h2 class="cart__title text-red js-cart-title">Your Cart (${product.totalQuantity})</h2>
                  <img class="cart__img" src="assets/images/illustration-empty-cart.svg" alt="">
                  <div class="product-cart-info"></div>
                  <p class="cart__text">Your added items will appear here</p>
                </article>`
              : `<article class="product-cart-container flex">
              <h2 class="cart__title text-red js-cart-title">Your Cart (${product.totalQuantity})</h2>
                  <div class="product-cart-info flex"></div>
                  <div class="cart-total flex">
                    <p class="cart-total__text">Order total:</p>
                    <p class="cart-total__sum">$${product.totalOrderSum}</p>
                  </div>
                  <div class="cart__carbon-info flex">
                    <svg class="carbon-icon" width="21" height="20" viewBox="0 0 21 20">
                      <path d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z" />
                      <path d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/>
                    </svg>
                    <p class="carbon-info">This is a <span>carbon-neutral</span> delivery</p>
                  </div>
                  <button class="cart__confirm-btn flex">
                  Confirm Order
                  </button>
              </article>`
            }`
          cart.innerHTML = cartHTML;
        }

        function totalQuantity(products) {
          let totalQuantity = 0;
          let totalOrderSum = 0;
            products.forEach(product => {
              totalQuantity += product.quantity;
              totalOrderSum += (product.quantity * product.price);
            });
          return {totalQuantity, totalOrderSum};
        }

        function productCartInfo(products) {
          const cartProducts = document.querySelector('.product-cart-info');
          let cartProductsHTML = '';
          products.forEach(product => {
            if (product.quantity > 0) {
              cartProductsHTML += `
              <article class="cart-product-container flex" data-id="${product.id}">
                <div class="cart-text-container flex">
                  <p class ="cart-product__name">${product.name}</p>
                  <div class="cart-item-info flex">
                    <p class="cart-product__quantity">${product.quantity}x</p>
                    <p class="cart-product__price">@ $${product.price}</p>
                    <p class="cart-product__total">$${product.quantity * product.price}</p>
                  </div>
                </div>
                <button class="cart-remove-btn flex">
                  <svg class="remove-icon" width="10" height="10"s viewBox="0 0 10 10">
                    <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                  </svg>
                </button>
              </article>
              `;
            } 
          });

            cartProducts.innerHTML = cartProductsHTML;
        }
      
        const cartProduct = document.querySelector('.cart-js');

        cartProduct.addEventListener('click', (event) => {
          // console.log('hei');
          const card = event.target.closest('.cart-product-container');

          if (!card) return;

          const productId = Number(card.dataset.id);
          const product = products.find(p => p.id === productId);

          if (event.target.closest('.cart-remove-btn')) {
            product.quantity = 0;
          }

          renderProducts(products);
          renderCart(products);
          productCartInfo(products);
    });
});