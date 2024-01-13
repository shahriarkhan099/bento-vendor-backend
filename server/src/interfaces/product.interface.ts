export interface IProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    expiryDate: Date;
    minimumOrderAmount: number;
    volumeDiscount: number;
    quantityUnit: number,
    vendorId: number;
}