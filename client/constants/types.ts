export type ProductItemType = {
    id: string;
    name: string;
    price: number;
    category: string;
    uri: string;
    count: number;
};

export type OrderType = {
    id: string;
    items: ProductItemType[];
    method: string;
    status: 'Delivered' | 'Pickedup' | 'Placed' | 'Confirmed' | 'Cancelled';
    address: string;
    Total: number;
    paymentid: string;
}
export type PaymentType = {
    id: string;
    name: string;
    last4: string;
}
export type AddressType = {
    //id: string;
    name: string; 
    area: string;
    street1: string;
    street2: string;
    city: string;
    zipcode: string;
   phone: string;
}
export interface ProductListProps {
    selectedFilter: string;
    productsInventory: any;
}

