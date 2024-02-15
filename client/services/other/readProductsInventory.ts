import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const readProductsInventory = async () => {
  const productsCollectionRef = collection(db, "ProductsInventory");
  try {
    const querySnapshot = await getDocs(productsCollectionRef);
    const productsDictionary: { [key: string]: { name: string; category: string; price: number; uri: string; } } = {};

    querySnapshot.forEach((doc) => {
      // Assuming doc.id is the key
      productsDictionary[doc.id] = doc.data() as { name: string; category: string; price: number; uri: string; };
    });

    console.log(productsDictionary);
    return productsDictionary;
  } catch (error) {
    console.error("Error reading documents: ", error);
    return {};
  }
};

export default readProductsInventory;