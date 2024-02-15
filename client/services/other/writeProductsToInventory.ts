import { PRODUCTS_IMAGE_PATH } from "../../constants/consts";
import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';

const writeProductsToInventory = async () => {
    const productEntries = Object.entries(PRODUCTS_IMAGE_PATH);

    try {
        // Use map to transform each entry into a promise and then wait for all of them
        await Promise.all(productEntries.map(async ([key, uri], index) => {
            const docId = (index + 1).toString(); // Firestore document ID, starting from "1"
            const name = `name${docId}`;
            const price = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Random price between 10 and 20
            const category = "category"; // Static category for all items

            // Directly return the promise from setDoc
            return setDoc(doc(db, "ProductsInventory", docId), {
                name,
                category,
                price,
                uri
            });
        }));

        console.log("All documents successfully written!");
    } catch (error) {
        console.error("Error writing documents: ", error);
    }
};

export default writeProductsToInventory;
