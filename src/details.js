const showProductDetails = async () => {
  const searchParamString = window.location.search;

  const urlSearchParams = new URLSearchParams(
    searchParamString.substring(1, searchParamString.length)
  );
  const productId = urlSearchParams.get("id");

  const productURL =
    "https://632570b54cd1a2834c3e145e.mockapi.io/Product/" + productId;
  const result = await fetch(productURL);
  const productInfo = await result.json();

  const productCardDetail = `<div class='card' style="width: 60rem;">
          <img class="card-img-top" src="${productInfo.imgURL}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${productInfo.description}</h5>
          <p class="card-text">Pret: ${productInfo.price}</p>
          <button id=${productInfo.id}" class="btn btn-primary add-to-cart"> <i class="fa-sharp fa-solid fa-cart-shopping"></i> Adauga in cos</button>
        </div>
      </div> `;

  document.querySelector(".product-details").innerHTML = productCardDetail;
};

window.addEventListener("DOMContentLoaded", showProductDetails);

document.querySelector(".product-details").addEventListener("click", addToCart);

async function addToCart(event) {
  if (event.target.classList.contains("add-to-cart")) {
    const searchParamString = window.location.search;

    const urlSearchParams = new URLSearchParams(
      searchParamString.substring(1, searchParamString.length)
    );

    const productId = urlSearchParams.get("id");
    


    const productURL =
      "https://632570b54cd1a2834c3e145e.mockapi.io/Product/" + productId;
    const result = await fetch(productURL);
    const productInfo = await result.json();

    let cart = [];
    if (localStorage.getItem("cart") == null) {
      cart.push({ ...productInfo, noOfProducts: 1 });
      console.log("cart =", cart[0].noOfProducts);
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
      const productInCart = cart.find(
        (productFromCart) => productFromCart.id == productId
      );
      if (productInCart != undefined) {
        productInCart.noOfProducts++;
      } else {
        const productToBeAddedInCart = { ...productInfo, noOfProducts: 1 };
        cart.push(productToBeAddedInCart);
      }
   
    }
    if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
   



    document.querySelector(".add-to-cart").style.display = "block"
    alert("Produsul a fost adaugat in cos.")
    setTimeout(function() {window.close()}, 1000)

  

  }
  
}



 