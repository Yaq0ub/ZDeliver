import readProductsInventory from "../../../services/other/readProductsInventory";

export function fetchProducts() {
  return new Promise((resolve, reject) => {
    readProductsInventory()
      .then((inventory) => {
        resolve(inventory); // Assuming readProductsInventory returns the desired inventory object
      })
      .catch((error) => {
        reject(error); // Handle any errors that may occur during inventory fetching
      });
  });
}
