export interface IProductBatch {
    id: number;
    ProductName: string;
    purchaseQuantity: number;
    purchasePrice: number;
    receivedAt: Date;
    expirationDate: Date;
    vendorId: number;
    productId: number;
    orderId: number;
    restaurantId: number;
}
  