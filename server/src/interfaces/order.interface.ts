export interface IOrder {
    id: number;
    totalPrice: number;
    totalQuantity: number;
    quantityUnit: string;
    orderDate: Date;
    deliveryDate: Date;
    vendorId: number;
    productId: number;
    restaurantId: number;
}