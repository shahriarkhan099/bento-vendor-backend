export interface IProduct {
    id: number;
    name: string;
    price: number;
    minimumOrderAmount: number;
    unitOfStock: string,
    qty: number;
    volumeDiscount: number;
    image: string;
    expiryDate: Date;
    vendorId: number;
}