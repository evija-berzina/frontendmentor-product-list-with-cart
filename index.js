fetch('/data.json')
    .then(res => res.json())
    .then(data => {


        const productCard = document.querySelector('.product-card-js');
        const cartButton = document.querySelector('.add-to-cart-btn-js');
        let productsHTML = '';
        //  '';
        data.forEach((product) => {
          // console.log(product.image.mobile)
          productsHTML = productCard.innerHTML + `
          <div>
            <div class="image-btn-container flex">
              <img class="image" src=${product.image.mobile} alt="">
              <button class="add-to-cart-btn flex add-to-cart-btn-js">
                <img src="assets/images/icon-add-to-cart.svg" alt="">
                <span>Add to Cart</span>
              </button>
            </div>
            <div class="product-text-container flex">
              <p class="text-pale-rose category-text-size">${product.category}</p>
              <p class="text-dark-rose fw-600">${product.name}</p>
              <p class="text-red fw-600"><span>&#36</span>${(product.price).toFixed(2)}</p>
            </div>
          </div>
          `;
          productCard.innerHTML = productsHTML
          // console.log(productsHTML);
        });
        
});