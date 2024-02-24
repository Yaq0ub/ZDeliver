import { doc, getDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig"; // Adjust the path as necessary
import { ProductItemType } from "../../constants/types"; // Adjust the path as necessary to your types

/**
 * Removes the provided item from the authenticated user's cart in Firestore.
 * If the item's count is greater than 1, it decrements the count. Otherwise,
 * it removes the item entirely.
 * 
 * @param item The item to remove or decrement in the cart.
 */
export const removeFromUserCart = async (item: ProductItemType): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user found.");
  }

  const userDocRef = doc(db, 'Users', user.uid);
  const cartCollectionRef = collection(userDocRef, 'cart');
  const itemDocRef = doc(cartCollectionRef, item.id);

  const docSnap = await getDoc(itemDocRef);
  if (docSnap.exists()) {
    const currentCount = docSnap.data().count;
    if (currentCount > 1) {
      await updateDoc(itemDocRef, {
        count: currentCount - 1
      });
    } else {
      await deleteDoc(itemDocRef);
    }
  } else {
    console.log('Item not found in the cart');
  }
};
