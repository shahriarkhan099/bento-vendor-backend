export interface IVendor {
  id: number;
  name: string;
  email: string;
  password: string;
  logo: string;
  address: string;
  contactNumber: string;
  vendorType: string;
  workingDays: string[];
  openingHours: {
    startTime: string;
    endTime: string;
  };
  orderProcessingTime: number;
  bookedTimeSlots: String[];
}