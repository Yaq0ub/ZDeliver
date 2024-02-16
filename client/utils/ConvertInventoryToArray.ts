// ConvertInventoryToArray.ts
import { ProductItemType } from '../constants/types'; // Adjust the path as necessary

const ConvertInventoryToArray = (productsInventory: { [key: string]: Omit<ProductItemType, 'key'> }): ProductItemType[] => {
  return Object.keys(productsInventory).map((key) => ({
    key,
    ...productsInventory[key],
  }));
};

export default ConvertInventoryToArray;
