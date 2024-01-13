export interface IVendor {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    type: string;
    workingDays: string[];
    openingHours: {
        startTime: string; 
        endTime: string; 
    };
    orderProcessingTime: number;
}