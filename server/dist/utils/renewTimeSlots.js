"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_query_1 = require("../models/vendor/vendor.query");
const renewTimeSlots = () => {
    console.log('Renew Time Slots starting');
    (0, vendor_query_1.emptyBookedTimeSlotsForAllVendors)();
    console.log('Renew Time Slots completed');
};
exports.default = renewTimeSlots;
