import {
  postNewProduct,
  getAllPoducts,
  deleteProductById,
  editProductById,
} from "./products.js";
import { showConfirmationMessage } from "./utils.js";

const imageInputElement = document.querySelector(".add-product-form #image");
const nameInputElement = document.querySelector(".add-product-form #name");
const descriptionInputElement = document.querySelector(
  ".add-product-form #description"
);
const priceInputElement = document.querySelector(".add-product-form #price");

// Edit elements
const editProductId = document.querySelector(".edit-product-form #id");
const editImageInputElement = document.querySelector(
  ".edit-product-form #image"
);
const editNameInputElement = document.querySelector(".edit-product-form #name");
const editDescriptionInputElement = document.querySelector(
  ".edit-product-form #description"
);
const editPriceInputElement = document.querySelector(
  ".edit-product-form #price"
);

const populateProductsTable = async () => {
  const products = await getAllPoducts();

  const tableContent = products
    .map(
      (product, index) =>
        `<tr>
       <th scope="row">${index + 1}</th>
       <td><img src="${product.imgURL}" width="50" height="50"></td>
       <td>${product.name}</td>
       <td>${product.price}</td>
       <td>
        <button id="${product.id}" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-warning" >
           <i class="fa-solid fa-pen" data-product='${JSON.stringify(
             product
           )}'></i>
        </button>
       </td>
      </tr>`
    )
    .join("");

  document.getElementById("products-table-body").innerHTML = tableContent;
};

// edit products

window.addEventListener;

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

const editProduct = async () => {
  const product = {
    id: editProductId.value,
    name: editNameInputElement.value,
    imgURL: editImageInputElement.value,
    description: editDescriptionInputElement.value,
    price: editPriceInputElement.value,
  };

  const response = await editProductById(product);
  showConfirmationMessage(
    "edit-product-message",
    response,
    "Produsul a fost actualizat cu succes!"
  );
};



document.getElementById("add-product").addEventListener("click", addProduct);
document.getElementById("edit-product").addEventListener("click", editProduct);

document.getElementById("add-new-product").addEventListener("click", () => {
document.querySelector(".add-product-container").classList.toggle("hidden");});

const handleProducts = async (event) => {
  if (event.target.classList.contains("fa-trash-can")) {
    const productId = event.target.parentNode.id;
    const response = await deleteProductById(productId);
    if (response.ok) {
      await populateProductsTable();
    }
  }
  if (event.target.classList.contains("fa-pen")) {
    console.log("test");
    event.target.addEventListener("click", () => {
      document
        .querySelector(".edit-product-container")
        .classList.toggle("hidden");
      var productInfo = JSON.parse(event.target.getAttribute("data-product"));
      editProductId.value = productInfo.id;
      editImageInputElement.value = productInfo.imgURL;
      editNameInputElement.value = productInfo.name;
      editPriceInputElement.value = productInfo.price;
      editDescriptionInputElement.value = productInfo.description;
    });
  }
};

document.getElementById("product-list").addEventListener("click", handleProducts);
