import {
  postNewProduct,
  getAllPoducts,
  deleteProductById,
} from "./products.js";
import { showConfirmationMessage } from "./utils.js";

const showCartProducts = async () => {
  const products = await getAllPoducts();

  const cart = JSON.parse(localStorage.getItem("cart"));

  let total = 0;
  if (cart) {
    cart.forEach((product) => {
      total =
        total +
        Number(product.price.replace(" Lei", "")) * product.noOfProducts;

      console.log(product.price);
    });

    const productCards = cart
      .map(
        (product) =>
          `            <div class="card rounded-3 mb-4">
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
                        value="2"
                        type="number"
                        class="form-control form-control-sm quantity"
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
                      <h5 class="mb-0">${product.price}</h5>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-danger"
                        ><i class="fas fa-trash fa-lg delete"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>`
      )
      .join("");

    let totalPriceCard = `<div>TOTAL: ${total}</div>`;
    document.querySelector(".productsInCart").innerHTML = productCards;
    document.querySelector(".totalPrice").innerHTML = totalPriceCard;

    let totalPrice = document.querySelectorAll(".quantity");
    totalPrice.forEach(function (input) {
      input.addEventListener("change", (event) => {
        console.log(input.value);
      });
    });
  }
};

window.addEventListener("DOMContentLoaded", showCartProducts);

// function updatePrice() {
//   let finalPrice = (document.getElementById("total-price").innerHTML =
//     productCards);
// }

// const updatedPrice = document.querySelector(".total-price");
// const quantityOfProducts = document.getElementById("#form1");

// function updatePriceOfTotalQuantity(event) {
//   total.innerHTML = input.value * product.price;
//   updatePriceOfTotalQuantity();
// }

// const newprice = quantityOfProducts.replace(
//   "${product.price}",
//   updatePriceOfTotalQuantity
// );

// let buyTable = () => {
//   let total = 0;
//   let items = 0;
//   if (cart) {
//     cart.forEach((item) => {
//       total += Number(item.price) * item.items;
//       items += item.items;
//     });
//   }
//   document.querySelector(
//     ".items"
//   ).innerHTML = `Items: <span class="greenText">${items}</span>`;
//   document.querySelector(
//     ".totalPrice"
//   ).innerHTML = `Total Price: <span class="greenText">$${total}</span>`;
// };
