import { createNewOrderRepo } from "../model/order.repository.js";
import { findProductRepo } from "../../product/model/product.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const { shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const userId = req.user._id;

    // Calculate the delivery date (2 days from now)
    const deliveredAt = new Date();
    deliveredAt.setDate(deliveredAt.getDate() + 2);

    // Check product existence and stock availability
    for (let product of orderedItems) {
      const singleProduct = await findProductRepo(product.product);
      if (!singleProduct) {
        return next( new ErrorHandler(400, `${product.name} not found with ID: ${product.product}`));
      }
      if (product.quantity > singleProduct.stock) {
        return next( new ErrorHandler(400, `${product.name} is insufficient to complete the order`));
      }
      singleProduct.stock -= product.quantity;
      await singleProduct.save();
    }

    // Create new order data
    const orderData = {
      shippingInfo,
      orderedItems,
      user: userId,
      paymentInfo,
      paidAt: Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: "completed",
      deliveredAt,
      createdAt: Date.now()
    };

    // Create new order
    const createdOrder = await createNewOrderRepo(orderData);
    if(createdOrder)
    res.status(200).json({ success: true, message: "Order created successfully", createdOrder });
  else
  return next( new ErrorHandler(400, `Failed to complete order`));

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ success: false, error: errors });
    } else{
      return next(new ErrorHandler(500, error.message));
    }
  }
};
