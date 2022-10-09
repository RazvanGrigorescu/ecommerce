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
          <a href="details.html?id=${productInfo.id}" class="btn btn-primary"> <i class="fa-sharp fa-solid fa-cart-shopping"></i> Adauga in cos</a>
        </div>
      </div> `;

  document.querySelector(".product-details").innerHTML = productCardDetail;
};

window.addEventListener("DOMContentLoaded", showProductDetails);
