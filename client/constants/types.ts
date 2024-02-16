export type ProductItemType = {
    key: string;
    name: string;
    price: number;
    category: string;
    uri: string;
};
export interface ProductListProps {
    selectedFilter: string;
    productsInventory: any;
  }

export type ProductCardType = {
    name: string;
    price: number;
    uri: string;
};
