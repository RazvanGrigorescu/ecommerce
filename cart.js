

const showCartProducts = async () => {


  const cart = JSON.parse(localStorage.getItem("cart"));

  let total = 0;
  if (cart) {
    cart.forEach((product) => {
      total =
        total +
        Number(
          product.price.replace(" Lei", "").replace(" ", "").replace(",", ".")
        ) *
          product.noOfProducts;
    });

    const productCards = cart
      .map(
        (product) =>
          `<div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                  <div
                    class="row d-flex justify-content-between align-items-center"
                  >
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="${product.imgURL}"
                        class="img-fluid rounded-3"
                        alt=""
                      />
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <p class="lead fw-normal mb-2">${product.name}</p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button
                        class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown();
                        this.parentNode.querySelector('input').dispatchEvent(new Event('change'))"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
  
                      <input
                        id="form1"
                        min="0"
                        name="quantity"
                        value="1"
                        type="number"
                        class="form-control form-control-sm quantity"
                        data-unitPrice="${product.price
                          .replace(" Lei", "")
                          .replace(" ", "")
                          .replace(",", ".")}"
                        data-id="${product.id}"
                      />
  
                      <button
                        class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp();
                        this.parentNode.querySelector('input').dispatchEvent(new Event('change'))"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 id="totalPrice${
                        product.id
                      }" class="mb-0 total-price">${product.price}</h5>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button  class="text-danger deleteEvent"><i class="fas fa-trash fa-lg delete"></i>
                      </button>                      
                    </div>
                  </div>
                </div>
              </div>`
      )
      .join("");

    let totalPriceCard = `<div class="total">TOTAL: ${total} Lei</div>`;
    document.querySelector(".productsInCart").innerHTML = productCards;
    document.querySelector(".totalPrice").innerHTML = totalPriceCard;

    var deleteButtons = document.querySelectorAll(".deleteEvent");

    deleteButtons.forEach(function (deleteBtn) {
      console.log(deleteBtn);
      deleteBtn.addEventListener("click", function (e) {
        console.log("delete");
        let tableBody = document.querySelectorAll(".productsInCart")[0];
        let rowToDelete = e.currentTarget.parentElement.parentElement;
        console.log(rowToDelete);
        rowToDelete.parentElement.removeChild(rowToDelete);
        console.log("test");

        let storedCart = localStorage.getItem("cart");
        let cart = JSON.parse(storedCart);
        console.log("test");

        //  sterg rand
        // splice ia 2 valori: 1) indexul elementului de la indexul obtinut din tabel; 2) nr de elemente de sters
        let rowDeletedIndex = rowToDelete.rowIndex - 1;

        cart.splice(rowDeletedIndex, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        showCartProducts();
      });
    });

    let totalPrice = document.querySelectorAll(".quantity");
    totalPrice.forEach(function (input) {
      input.addEventListener("change", (event) => {
        var productid = input.getAttribute("data-id");
        var newPrice = input.getAttribute("data-unitPrice") * input.value;
        var priceDocument = document.getElementById("totalPrice" + productid);
        priceDocument.innerHTML = newPrice + " Lei";
        var totalPrices = document.querySelectorAll(".total");
        cart.forEach((product) => {
          total =
            total +
            Number(
              product.price
                .replace(" Lei", "")
                .replace(" ", "")
                .replace(",", ".")
            ) *
              product.noOfProducts;
        });
        totalPrices[0].innerHTML = "TOTAL: " + total + " Lei";
      });
    });

    const updatedPrice = document.querySelector(".total-price");
    function renderTotalPrice() {
      let updatedPrice = 0;

      cart.forEach((item) => {
        updatedPrice += totalPrice * item.updatedPrice;
        updatedPrice += item.updatedPrice;
      });
      updatedPrice.innerHTML = `<h5 class="mb-0 total-price">${updatedPrice.item}</h5>`;
    }
  }
};

window.addEventListener("DOMContentLoaded", showCartProducts);

// Show message after finishing order
document.getElementById("message").addEventListener("click", show);

function show() {
  document.getElementById("message").innerHTML =
    "Sorry! This is not a real website";
  document.getElementById("message").disabled = true;

  setTimeout(function () {
    document.getElementById("message").innerHTML = "Proceed to Pay";
    document.getElementById("message").disabled = false;
  }, 5000);
}
