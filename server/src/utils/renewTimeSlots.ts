import { emptyBookedTimeSlotsForAllVendors } from "../models/vendor/vendor.query";

const renewTimeSlots = () => {
    console.log('Renew Time Slots starting');
    emptyBookedTimeSlotsForAllVendors();
    console.log('Renew Time Slots completed');
};

export default renewTimeSlots;