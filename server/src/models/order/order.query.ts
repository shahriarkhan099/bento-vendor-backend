import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";


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
    const updatedOrder = await Order.update(order, {
      where: {
        id: orderId,
      },
    });
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