import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig"; // Adjust the path as necessary

import { ProductItemType } from "../../constants/types"; // Adjust the path as necessary to your types

/**
 * Writes the provided item to the authenticated user's cart in Firestore. If the item
 * already exists, its count is incremented. Otherwise, the item is added with a count of 1.
 * 
 * @param item The item to add or update in the cart.
 */
export const addToUserCart = async (item: ProductItemType): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user found.");
  }

  const userDocRef = doc(db, 'Users', user.uid);
  const cartCollectionRef = collection(userDocRef, 'cart');
  const itemDocRef = doc(cartCollectionRef, item.id);

  const docSnap = await getDoc(itemDocRef);

  if (docSnap.exists()) {
    await updateDoc(itemDocRef, {
      count: docSnap.data().count + 1
    });
  } else {
    await setDoc(itemDocRef, {
      ...item,
      count: 1
    });
  }
};
