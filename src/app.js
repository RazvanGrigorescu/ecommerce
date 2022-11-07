// Mobile responsive NavButtons

const toggleButton = document.getElementById("toggle-button");
const naviList = document.getElementById("navi-list");

toggleButton.addEventListener("click", () => {
  naviList.classList.toggle("active");
});

const createCardFromProduct = (product) => {
  return `<div class='card' style="width: 16rem;">
          <img class="card-img-top" src="${product.imgURL}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price}</p>
          <a href="details.html?id=${product.id}" class="btn btn-primary">Details</a>
        </div>
      </div>`;
};

// products filter
const createFilsterItemsArray = (minPrice, maxPrice) => {
  const filterInterval = (maxPrice - minPrice) / 5;

  const filterItems = [
    { start: minPrice, end: minPrice + filterInterval - 1 },
    { start: minPrice + filterInterval, end: minPrice + 2 * filterInterval },
    {
      start: minPrice + 2 * filterInterval,
      end: minPrice + 3 * filterInterval - 1,
    },
    {
      start: minPrice + 3 * filterInterval,
      end: minPrice + 4 * filterInterval - 1,
    },
    {
      start: minPrice + 4 * filterInterval,
      end: maxPrice,
    },
  ];
  return filterItems;
};

const createInnerHTMLforPriceFilter = (minPrice, maxPrice) => {
  const filterItemsIntervals = createFilsterItemsArray(minPrice, maxPrice);

  const innerHTMLFilsterCheckBox = filterItemsIntervals
    .map(
      (interval) =>
        `
      <div>
        <label>${interval.start} - ${interval.end} </label>
        <input type="checkbox">
      </div>
    `
    )
    .join("");
  console.log(document);
  document.getElementById("price-filter").innerHTML = innerHTMLFilsterCheckBox;
};

createInnerHTMLforPriceFilter(0, 300);

//Products on load
const getProductOnIndexPage = () => {
  fetch("https://632570b54cd1a2834c3e145e.mockapi.io/Product/")
    .then((result) => result.json())
    .then((products) => {
      const productCards = products.map((product) =>
        createCardFromProduct(product)
      );
      const innerHTMLProducts = productCards.join("");
      document.querySelector(".productList").innerHTML = innerHTMLProducts;
    });
};

window.addEventListener("DOMContentLoaded", getProductOnIndexPage);

const filterByPrice = (event) => {
  const startPrice =
    event.target.previousElementSibling.textContent.split(" - ")[0];
  const endPrice =
    event.target.previousElementSibling.textContent.split(" - ")[1];

  fetch("https://632570b54cd1a2834c3e145e.mockapi.io/Product/")
    .then((result) => result.json())
    .then((products) => {
      const filterByPriceProducts = products.filter(
        (product) =>
          product.price >= Number(startPrice) &&
          product.price <= Number(endPrice)
      );

      const productCards = filterByPriceProducts.map((product) =>
        createCardFromProduct(product)
      );
      const innerHTMLProducts = productCards.join("");
      document.querySelector(".productList").innerHTML = innerHTMLProducts;
    });
};

document
  .getElementById("price-filter")
  .addEventListener("click", filterByPrice);


