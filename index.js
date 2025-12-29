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

          cartHTML += `
            <article>
              <h2 class="cart__title text-red js-cart-title">Your Cart (${totalQuantity(products)})</h2>
                <img class="cart__img" src="assets/images/illustration-empty-cart.svg" alt="">
                <div class="product-cart-info"></div>
                <p class="cart__text">Your added items will appear here</p>
                <p>Order total: $${totalOrderSum(products)}</p>
            </article>
          `;

          cart.innerHTML = cartHTML;
          
        }
        
        function totalQuantity(products) {
          let sum = 0;
            products.forEach(product => {
              sum += product.quantity;
            });
          return sum;
        }

        function totalOrderSum(products) {
          let sum = 0;
            products.forEach(product => {
              sum += (product.quantity * product.price);
            });
          return sum;
        }

        function productCartInfo(products) {
          const cartProducts = document.querySelector('.product-cart-info');
          let cartProductsHTML = '';
          products.forEach(product => {
            if (product.quantity > 0) {
              cartProductsHTML += `
                <p>${product.name}</p>
                <p>${product.quantity}</p>
                <p>${product.price}</p>
                <p>${product.quantity * product.price}</p>
              `;
            } 
          });

            cartProducts.innerHTML = cartProductsHTML;
        }
      
});