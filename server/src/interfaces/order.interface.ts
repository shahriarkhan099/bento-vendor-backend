export interface IOrder {
    id: number;
    totalPrice: number;
    orderDate: Date;
    deliveryDate: Date;
    vendorId: number;
    restaurantId: number;
}