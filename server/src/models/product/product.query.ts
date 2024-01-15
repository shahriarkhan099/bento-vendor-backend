import { Op } from "sequelize";
import Product from "./product.model";
import { IProduct } from "../../interfaces/product.interface";
import Vendor from "../vendor/vendor.model";

export async function findAllProductOfVendor (vendorId: number) {
  try {
    const products = await Product.findAll({
      where: {
        vendorId,
      },
    });
    return products;
  } catch (error) {
    throw error;
  }
}


export async function addProductToVendor (product: IProduct) {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    throw error;
  }
}

export async function editProductOfVendor (productId: number, product: IProduct) {
  try {
    const updatedProduct = await Product.update(product, {
      where: {
        id: productId,
      },
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductOfVendor (productId: number) {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: productId,
      },
    });
    return deletedProduct;
  } catch (error) {
    throw error;
  }
}

export async function findProductOfVendorBySearchTerm (vendorId: number, searchTerm: string) {
  try {
    const products = await Product.findAll({
      where: {
        vendorId,
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      include: [Vendor]
    });
    return products;
  } catch (error) {
    throw error;
  }
}

export async function findAllProductsOfPlatformBySearchTerm (searchTerm: string) {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        include: [Vendor]
      });
      return products;
    } catch (error) {
      throw error;
    }
  }