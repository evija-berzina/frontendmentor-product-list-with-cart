fetch('/data.json')
    .then(res => res.json())
    .then(data => {

      const productCard = document.querySelector('.products-js');
      let productsHTML = '';

      data.forEach((product) => {
        // const product = data[index];
        productsHTML += `
          <article class="product-card">
            <div class="product-card__img-container flex">
              <picture>
                <source srcset="${product.image.desktop}" media="(min-width: 45rem)" />
                <source srcset="${product.image.tablet}" media="(min-width: 35rem)" />
                <img class="product-card__image" src="${product.image.mobile}" width="654" height="424" alt="${product.name}">
              </picture>
              <button class="product-card__btn flex product-btn-js">
                <img src="assets/images/icon-add-to-cart.svg" alt="">
                <span>Add to Cart</span>
              </button>
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
          
});