import { Op } from "sequelize";
import Vendor from "./vendor.model";
import { IVendor } from "../../interfaces/vendor.interface";
import Product from "../product/product.model";

export async function findAllVendors () {
  try {
    const vendors = await Vendor.findAll();
    return vendors;
  } catch (error) {
    throw error;
  }
}

export async function findAllVendorsWithProducts () {
  try {
    const vendors = await Vendor.findAll({
      include: [
        {
        model: Product,
        },
    ],
    });
    return vendors;
  } catch (error) {
    throw error;
}
}

export async function addVendor (vendor: IVendor) {
  try {
    const newVendor = await Vendor.create(vendor);
    return newVendor;
  } catch (error) {
    throw error;
  }
}

export async function editVendor (vendorId: number, vendor: IVendor) {
  try {
    const updatedVendor = await Vendor.update(vendor, {
      where: {
        id: vendorId,
      },
    });
    return updatedVendor;
  } catch (error) {
    throw error;
  }
}

export async function deleteVendor (vendorId: number) {
  try {
    const deletedVendor = await Vendor.destroy({
      where: {
        id: vendorId,
      },
    });
    return deletedVendor;
  } catch (error) {
    throw error;
  }
}

export async function findVendorByName (searchTerm: string) {
  try {
    const vendors = await Vendor.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          }
        ],
      },
    });
    return vendors;
  } catch (error) {
    throw error;
  }
}

export async function findVendorByProductName (searchTerm: string) {
  try {
    const vendors = await Vendor.findAll({
      include: [
        {
          model: Product,
          where: {
            name: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        },
      ],
    });
    return vendors;
  } catch (error) {
    throw error;
  }
}

export async function findVendorById (vendorId: number) {
    try {
      const vendor = await Vendor.findByPk(vendorId);
      return vendor;
    } catch (error) {
      throw error;
    }
}

export async function findVendorByIdWithProducts (vendorId: number) {
  try {
    const vendor = await Vendor.findByPk(vendorId, {
      include: [
        {
          model: Product,
        },
      ],
    });
    return vendor;
  } catch (error) {
    throw error;
  }
}

export async function findVendorsByNameAndProductName(searchTerm: string) {
  try {
    const vendorsByNamePromise = findVendorByName(searchTerm);
    const vendorsByProductNamePromise = findVendorByProductName(searchTerm);

    const [vendorsByName, vendorsByProductName] = await Promise.all([vendorsByNamePromise, vendorsByProductNamePromise]);

    const uniqueVendors = [...vendorsByName, ...vendorsByProductName].reduce((acc, vendor) => {
      if (!acc.has(vendor.id)) {
        acc.set(vendor.id, vendor);
      }
      return acc;
    }, new Map()).values();

    return Array.from(uniqueVendors);
  } catch (error) {
    throw error;
  }
}