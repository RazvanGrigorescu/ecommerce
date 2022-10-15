import {
  postNewProduct,
  getAllPoducts,
  deleteProductById,
} from "./products.js";
import { showConfirmationMessage } from "./utils.js";

const imageInputElement = document.querySelector(".add-product-form #image");
const nameInputElement = document.querySelector(".add-product-form #name");
const descriptionInputElement = document.querySelector(
  ".add-product-form #description"
);
const priceInputElement = document.querySelector(".add-product-form #price");

const populateProductsTable = async () => {
  const products = await getAllPoducts();

  const tableContent = products
    .map(
      (product, index) =>
        `<tr>
       <th scope="row">${index + 1}</th>
       <td><img src=${product.image} width="50" height="50"></td>
       <td>${product.name}</td>
       <td>${product.price}</td>
       <td>
        <button id="${product.id}" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-warning">
           <i class="fa-solid fa-pen"></i>
        </button>
       </td>
      </tr>`
    )
    .join("");

  document.getElementById("products-table-body").innerHTML = tableContent;
};

window.addEventListener("DOMContentLoaded", populateProductsTable);

const addProduct = async () => {
  const product = {
    name: nameInputElement.value,
    image: imageInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
  };

  const response = await postNewProduct(product);
  showConfirmationMessage(
    "add-product-message",
    response,
    "Produsul a fost adaugat cu succes!"
  );
};

document.getElementById("add-product").addEventListener("click", addProduct);

document.getElementById("add-new-product").addEventListener("click", () => {
  document.querySelector(".add-product-container").classList.toggle("hidden");
});

const handleProducts = async (event) => {
  if (event.target.classList.contains("fa-trash-can")) {
    const productId = event.target.parentNode.id;
    const response = await deleteProductById(productId);
    if (response.ok) {
      await populateProductsTable();
    }
  }
};

document
  .getElementById("product-list")
  .addEventListener("click", handleProducts);
