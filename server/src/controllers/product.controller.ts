import { Request, Response } from "express";
import { findAllProductOfVendor, addProductToVendor, editProductOfVendor, deleteProductOfVendor, findProductOfVendorBySearchTerm, findAllProductsOfPlatformBySearchTerm } from "../models/product1/product.query";


export async function getAllProductOfVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const products = await findAllProductOfVendor(vendorId);
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function postProductToVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId); 
    if (vendorId) {
        const product = req.body;
        product.vendorId = vendorId;
        const newProduct = await addProductToVendor(product);
        res.status(201).json(newProduct);
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateProductOfVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const productId = Number(req.params.productId);
    if (vendorId && productId) {
        const product = req.body;
        product.vendorId = vendorId;
        const updatedProduct = await editProductOfVendor(productId, product);
        res.status(200).json(updatedProduct);
    } else res.status(400).json({ message: "Invalid Vendor ID or Product ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeProductOfVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const productId = Number(req.params.productId);
    if (vendorId && productId) {
        const deletedProduct = await deleteProductOfVendor(productId);
        res.status(200).json(deletedProduct);
    } else res.status(400).json({ message: "Invalid Vendor ID or Product ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllProductsOfPlatformBySearchTerm (req: Request, res: Response) {
  try {
    const searchTerm = String(req.query.searchTerm);
    const products = await findAllProductsOfPlatformBySearchTerm(searchTerm);
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProductOfVendorBySearchTerm (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const searchTerm = String(req.query.searchTerm);
    const products = await findProductOfVendorBySearchTerm(vendorId, searchTerm);
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).send(error);
  }
}