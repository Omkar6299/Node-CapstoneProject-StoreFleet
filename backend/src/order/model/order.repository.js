import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  const newOrder = OrderModel(data);
  await newOrder.save();
  return newOrder;
};
