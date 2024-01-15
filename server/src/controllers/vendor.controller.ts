import { Request, Response } from "express";
import { findAllVendors, findAllVendorsWithProducts, addVendor, editVendor, deleteVendor, findVendorByName, findVendorByProductName, findVendorById, findVendorByIdWithProducts, findVendorsByNameAndProductName } from "../models/vendor1/vendor.query";

export async function getAllVendors (req: Request, res: Response) {
  try {
    const vendors = await findAllVendors();
    res.status(200).json({ data: vendors });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function postVendor (req: Request, res: Response) {
  try {
    const vendor = req.body;
    const newVendor = await addVendor(vendor);
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (vendorId) {
      const vendor = req.body;
      const updatedVendor = await editVendor(vendorId, vendor);
      res.status(200).json(updatedVendor);
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (vendorId) {
      const deletedVendor = await deleteVendor(vendorId);
      res.status(200).json(deletedVendor);
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getVendorByName (req: Request, res: Response) {
  try {
    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const vendors = await findVendorByName(searchTerm);
      res.status(200).json({ data: vendors });
    } else res.status(400).json({ message: "Invalid search term." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getVendorByProductName (req: Request, res: Response) {
  try {
    const search = req.query.q;
    const searchTerm = search?.toString();
    
    if (searchTerm) {
      const vendors = await findVendorByProductName(searchTerm);
      res.status(200).json({ data: vendors });
    } else res.status(400).json({ message: "Invalid search term." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getVendorById (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (vendorId) {
      const vendor = await findVendorById(vendorId);
      res.status(200).json({ data: vendor });
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllVendorsWithProducts (req: Request, res: Response) {
  try {
    const vendors = await findAllVendorsWithProducts();
    res.status(200).json({ data: vendors });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getVendorByIdWithProducts (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (vendorId) {
      const vendor = await findVendorByIdWithProducts(vendorId);
      res.status(200).json({ data: vendor });
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getVendorsByNameAndProductName (req: Request, res: Response) {
  try {
    const search = req.query.q;
    const searchTerm = search?.toString();
    if (searchTerm) {
      const vendors = await findVendorsByNameAndProductName(searchTerm);
      res.status(200).json({ data: vendors });
    } else res.status(400).json({ message: "Invalid search term." });
  } catch (error) {
    res.status(500).send(error);
  }
}