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
      const order = document.querySelector('.order-js')

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
          if (event.target.closest('.cart__confirm-btn')) {
            renderConfirmedOrders(products);
          }

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

        function renderConfirmedOrders(products) {
          let orderHTML = '';
          const total = totalQuantity(products);
          document.body.classList.add("no-scroll");

          const product = products.filter(p => p.quantity > 0);
            orderHTML += `
            <div class="overlay"></div>
            <div class="order flex">
              <svg class="order-icon" width="40" height="40" viewBox="0 0 48 48">
                <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"/>
                <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"/>
              </svg>
              <h1 class="order-title">Order<br/>Confirmed</h1>
              <p>We hope you enjoy your food!</p>
              <div class="order-total-products">
              ${ product.map(p => `
                <div class="order-products flex">
                  <img class="product-card__image" src="${p.image.thumbnail}" width="50" height="50" alt="${p.name}">
                  <div class="order-product-info flex">
                    <div class="cart-text-container flex">
                      <p class ="cart-product__name">${p.name}</p>
                    </div>
                    <div class="cart-item-info flex">
                      <p class="cart-product__quantity">${p.quantity}x</p>
                      <p class="cart-product__price">@ $${p.price}</p>
                    </div>
                  </div>
                  <p class="cart-product__total">$${p.quantity * p.price}</p>
                </div>
                `).join("")
              }   
                <div class="cart-total flex">
                  <p class="cart-total__text">Order total:</p>
                  <p class="cart-total__sum">$${total.totalOrderSum}</p>
                </div>
              </div>
              <button class="new-order-btn">
                Start New Order
              </button>
            </div>`
            order.innerHTML = orderHTML;
        }

        order.addEventListener('click', (event) => {
          if (event.target.closest('.new-order-btn')) {
            //console.log('hei')
            document.body.classList.remove("no-scroll");
            products.forEach(p => p.quantity = 0);
            renderProducts(products);
            renderCart(products);
          }
          order.innerHTML = "";
        });
});