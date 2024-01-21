import { Request, Response } from "express";
import { findAllOrderOfVendor, addOrderToVendor, editOrderOfVendor, deleteOrderOfVendor, 
  findOrderOfVendorWithAllProducts, addOrderToVendorWithProductBatches, sendOrderUpdateToInventory,
  findOneOrderOfVendorByOrderId, findOrderOfRestaurantWithProducts } from "../models/order/order.query";

export async function getAllOrderOfVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const orders = await findAllOrderOfVendor(vendorId);
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function postOrderToVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId); 
    if (vendorId) {
        const order = req.body;
        order.vendorId = vendorId;
        const newOrder = await addOrderToVendor(order);
        res.status(201).json(newOrder);
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateOrderOfVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const orderId = Number(req.params.orderId);
    if (vendorId && orderId) {
        const order = req.body;
        order.vendorId = vendorId;
        const updatedOrder = await editOrderOfVendor(orderId, order);
        res.status(200).json(updatedOrder);
    } else res.status(400).json({ message: "Invalid Vendor ID or Order ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeOrderOfVendor (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    const orderId = Number(req.params.orderId);
    if (vendorId && orderId) {
        const deletedOrder = await deleteOrderOfVendor(orderId);
        res.status(200).json(deletedOrder);
    } else res.status(400).json({ message: "Invalid Vendor ID or Order ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getOrderOfVendorWithAllProducts (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (vendorId) {
        const orders = await findOrderOfVendorWithAllProducts(vendorId);
        res.status(200).json({ data: orders });
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function postOrderToVendorWithProductBatches (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId); 
    if (vendorId) {
        const order = req.body;
        const productBatches = order.productBatches;
        order.vendorId = vendorId;
        const newOrder = await addOrderToVendorWithProductBatches(order, productBatches);
        res.status(201).json(newOrder);
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function sendOrderUpdateToInventoryService (req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId); 
    if (vendorId) {
        const orderId = req.body;
        console.log("checking hit")
        await sendOrderUpdateToInventory(orderId);
        res.status(201).json("Order Update Sent to Inventory Service.");
    } else res.status(400).json({ message: "Invalid Vendor ID." });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getOrderOfVendorByOrderId (req: Request, res: Response) {
  try {
    const orderId = Number(req.params.orderId);
    if (orderId) {
        const orders = await findOneOrderOfVendorByOrderId(orderId);
        res.status(200).json({ data: orders });
    } else res.status(400).json({ message: "Invalid Order ID." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getOrderOfRestaurantWithProducts (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
        const orders = await findOrderOfRestaurantWithProducts(restaurantId);
        res.status(200).json({ data: orders });
    } else res.status(400).json({ message: "Invalid Restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}