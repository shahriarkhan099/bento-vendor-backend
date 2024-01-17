export interface IProductBatch {
    id: number;
    productName: string;
    purchaseQuantity: number;
    unitOfStock: string;
    purchasePrice: number;
    receivedAt: Date;
    expirationDate: Date;
    vendorId: number;
    productId: number;
    orderId: number;
    restaurantId: number;
}
  