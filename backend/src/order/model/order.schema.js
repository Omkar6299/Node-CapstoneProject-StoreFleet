import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "address is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      default: "IN",
    },
    pincode: {
      type: Number,
      required: [true, "pincode is required"],
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      trim: true,
    },
  },
  orderedItems: [
    {
      name: {
        type: String,
        required: [true, "order name is required"],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "price is required"],
        trim: true,
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        trim: true,
      },
      image: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product Id is required"],
        trim: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    trim: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: [true, "Payment info is required"],
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: [true, "status is required"],
      trim: true,
    },
  },
  paidAt: {
    type: Date,
    required: [true, "Payment time is required"],
    trim: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
