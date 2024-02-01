import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import ProductBatch from "../productBatch/productBatch.model";
import { IProductBatch } from "../../interfaces/productBatch.interface";
import axios from 'axios';
import { findVendorById } from "../vendor/vendor.query";
import Vendor from "../vendor/vendor.model";
import config from "../../config";


export async function findAllOrderOfVendor(vendorId: number) {
  try {
    const orders = await Order.findAll({
      where: {
        vendorId,
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function findOneOrderOfVendor(orderId: number) {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
}

export async function findOrderOfVendorWithAllProducts (vendorId: number) {
  try {
    const orders = await Order.findAll({
      where: {
        vendorId,
      },
      include: [
      {
        model: ProductBatch,
      },
    ],
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function findOrderOfRestaurantWithProducts (restaurantId: number) {
  try {
    const orders = await Order.findAll({
      where: {
        restaurantId,
      },
      include: [
      {
        model: ProductBatch,
      },
      {
        model: Vendor,
      },
    ],
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function addOrderToVendor(order: IOrder) {
  try {
    const newOrder = await Order.create(order);
    return newOrder;
  } catch (error) {
    throw error;
  }
}

export async function editOrderOfVendor(orderId: number, order: IOrder) {
  try {
    await Order.update(order, {
      where: {
        id: orderId,
      },
    });
    const updatedOrder = await findOneOrderOfVendor(orderId);
    return updatedOrder;
  } catch (error) {
    throw error;
  }
}

export async function deleteOrderOfVendor(orderId: number) {
  try {
    const deletedOrder = await Order.destroy({
      where: {
        id: orderId,
      },
    });
    return deletedOrder;
  } catch (error) {
    throw error;
  }
}

export async function findOneOrderOfVendorByOrderId (orderId: number) {
  try {
    const orders = await Order.findOne({
      where: {
        id: orderId,
      },
      include: {
        model: ProductBatch,
      },
    });
    console.log(orders);
    
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function addOrderToVendorWithProductBatches (order: IOrder, productBatches: IProductBatch[]) {
  try {
    const vendor = await findVendorById(order.vendorId);
    if (vendor) {
      const newOrder = await Order.create(order);
      productBatches.forEach(productBatch => {
        productBatch.orderId = newOrder.id;
        productBatch.vendorId = newOrder.vendorId;
        productBatch.restaurantId = newOrder.restaurantId;
        productBatch.receivedAt = newOrder.orderDate;
      });
      await ProductBatch.bulkCreate(productBatches);

      setTimeout(async () => {
        await sendOrderUpdateToInventory({ orderId: newOrder.id });
      }, 10000); // 10 sec timeout

      return newOrder;
    }
  } catch (error) {
    throw error;
  }
}

export async function sendOrderUpdateToInventory(acceptOrder: { orderId: number }) {
  try {
    const orders = await findOneOrderOfVendorByOrderId(acceptOrder.orderId);

    const transformedData = transformData(orders);
    const response = await axios.post(`${config.HELPER_API}/v1/order/restaurant/${orders?.restaurantId}/ingredientBatches`, transformedData);
    console.log( 'sending order to inventory', response.data);
  } catch (error) {
    console.error(error);
  }
}


function transformData(order: any) {

  const { status, deliveryDate, vendorId, productBatches } = order;

  const ingredientBatches = productBatches.map((productBatch: any) => {
    return {
      uniqueIngredientId: productBatch.uniqueIngredientId,
      ingredientName: productBatch.productName,
      unitOfStock: productBatch.unitOfStock,
      purchaseQuantity: productBatch.purchaseQuantity,
      purchasePrice: productBatch.purchasePrice,
      expirationDate: productBatch.expirationDate,
    };
  });

  const transformedData = {
    status,
    deliveryDate,
    supplierId: vendorId, 
    ingredientBatches,
  };

  return transformedData;
}
