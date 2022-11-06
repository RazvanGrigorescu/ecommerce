const PRODUCTS_URL = "https://632570b54cd1a2834c3e145e.mockapi.io/Product/";

export const getAllPoducts = async () => {
  const result = await fetch(PRODUCTS_URL);
  const products = await result.json();

  return products;
};

export const getProductById = async (id) => {
  const result = await fetch(PRODUCTS_URL + id);
  const product = await result.json();

  return product;
};

export const postNewProduct = async (product) => {
  const response = await fetch(PRODUCTS_URL, {
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response;
};

export const deleteProductById = async (id) => {
  const response = await fetch(PRODUCTS_URL + id, {
    method: "DELETE",
  });

  return response;
};

export const editProductById = async (product) => {
  const response = await fetch(PRODUCTS_URL + product.id, {
    method: "PUT",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "name": product.name,
      "description": product.description,
      "price": product.price,
      "imgURL": product.imgURL,
    }),
  });
  return response;
};
