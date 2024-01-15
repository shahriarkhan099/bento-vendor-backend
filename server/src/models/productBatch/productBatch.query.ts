import { Op } from "sequelize";
import ProductBatch from "./productBatch.model";
import { IProductBatch } from "../../interfaces/productBatch.interface";
import Vendor from "../vendor/vendor.model";

export async function findAllProductBatchOfVendor (vendorId: number) {
  try {
    const productBatches = await ProductBatch.findAll({
      where: {
        vendorId,
      },
    });
    return productBatches;
  } catch (error) {
    throw error;
  }
}

export async function addProductBatchToVendor (productBatches: IProductBatch) {
  try {
    const newProductBatch = await ProductBatch.create(productBatches);
    return newProductBatch;
  } catch (error) {
    throw error;
  }
}