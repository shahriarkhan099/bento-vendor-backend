export interface IProduct {
    id: number;
    uniqueIngredientId: number;
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