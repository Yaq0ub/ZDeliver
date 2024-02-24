export type ProductItemType = {
    id: string;
    name: string;
    price: number;
    category: string;
    uri: string;
    count: number;
};
export interface ProductListProps {
    selectedFilter: string;
    productsInventory: any;
  }
