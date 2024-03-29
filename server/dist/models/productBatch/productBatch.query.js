"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductBatchToVendor = exports.findAllProductBatchOfVendor = void 0;
const productBatch_model_1 = __importDefault(require("./productBatch.model"));
function findAllProductBatchOfVendor(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productBatches = yield productBatch_model_1.default.findAll({
                where: {
                    vendorId: vendorId,
                },
            });
            return productBatches;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllProductBatchOfVendor = findAllProductBatchOfVendor;
function addProductBatchToVendor(productBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newProductBatch = yield productBatch_model_1.default.create(productBatches);
            return newProductBatch;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.addProductBatchToVendor = addProductBatchToVendor;
