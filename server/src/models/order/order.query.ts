import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import Product from "../product/product.model";
import ProductBatch from "../productBatch/productBatch.model";
import { IProductBatch } from "../../interfaces/productBatch.interface";
import axios from 'axios';
import { findVendorById } from "../vendor/vendor.query";


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
    await Order.update(order, {
      where: {
        id: orderId,
      },
    });
    const updatedOrder = await Order.findOne({
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

export async function findOrderOfVendorWithAllProducts (vendorId: number) {
  try {
    const orders = await Order.findAll({
      where: {
        vendorId,
      },
      include: {
        model: ProductBatch,
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function findOneOrderOfVendorByOrderId (orderId: number) {
  try {
    const orders = await Order.findAll({
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
      let deliveryTime = new Date();
      deliveryTime.setHours(deliveryTime.getHours() + vendor.orderProcessingTime);
      order.deliveryDate = deliveryTime;
      const newOrder = await Order.create(order);
      productBatches.forEach(productBatch => {
        productBatch.orderId = newOrder.id;
        productBatch.vendorId = newOrder.vendorId;
        productBatch.restaurantId = newOrder.restaurantId;
        productBatch.receivedAt = newOrder.orderDate;
      });
      await ProductBatch.bulkCreate(productBatches);

      // setTimeout(async () => {
      //   await sendOrderUpdateToInventory({ orderId: newOrder.id });
      // }, 10000); // 5 sec timeout
      await sendOrderUpdateToInventory({ orderId: newOrder.id });

      return newOrder;
    }
  } catch (error) {
    throw error;
  }
}


// export async function sendOrderUpdateToInventory(acceptOrder: { orderId: number }) {
//   try {
//     const orders = await findOneOrderOfVendorByOrderId(acceptOrder.orderId);

//     orders[0].status = 'accepted';
//     console.log(orders[0].toJSON());
    
//     await editOrderOfVendor(orders[0].id, orders[0]);
//     await Order.update(orders[0], {
//       where: {
//         id: orders[0].id,
//       },
//     });

//     console.log("Order Accepted", orders[0].toJSON());
    

//     if (orders[0].status === 'accepted') {
//       const transformedData = transformData(orders);

//       const response = await axios.post('http://localhost:4000/v1/order/restaurant/1/ingredientBatches', transformedData);
  
//       console.log(response.data);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function sendOrderUpdateToInventory(acceptOrder: { orderId: number }) {
  try {
    const orders = await findOneOrderOfVendorByOrderId(acceptOrder.orderId);

    let order = orders[0];

    order.status = 'accepted';
    const updatedOrder = await editOrderOfVendor(order.id, order);

    if (!updatedOrder) {
      throw new Error(`No order found with id: ${order.id}`);
    }

    order = updatedOrder;

    console.log("Order Accepted", order.toJSON());

    if (order.status === 'accepted') {
      const transformedData = transformData(orders);

      const response = await axios.post('http://localhost:4000/v1/order/restaurant/1/ingredientBatches', transformedData);
    }
  } catch (error) {
    console.error(error);
  }
}


function transformData(orders: any[]) {
  const order = orders[0];

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

