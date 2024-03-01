import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (skip, keyword, category, price, rating) => {
  let filterExpression = {};

  if (keyword) {
    filterExpression.name = { $regex: new RegExp(keyword, 'i') }; // 'i' flag for case-insensitive matching
  }

  if (category) {
    filterExpression.category = category;
  }

  if (price && price.gte && price.lte) {
    // Filter by price range
    filterExpression.price = {
      $gte: parseFloat(price.gte),
      $lte: parseFloat(price.lte)
    };
  } else if (price && price.gte) {
    // Filter by minimum price
    filterExpression.price = { $gte: parseFloat(price.gte) };
  } else if (price && price.lte) {
    // Filter by maximum price
    filterExpression.price = { $lte: parseFloat(price.lte) };
  }

  if (rating && rating.gte && rating.lte) {
    // Filter by price range
    filterExpression.rating = {
      $gte: parseFloat(rating.gte),
      $lte: parseFloat(rating.lte)
    };
  } else if (rating && rating.gte) {
    // Filter by minimum price
    filterExpression.rating = { $gte: parseFloat(rating.gte) };
  } else if (rating && rating.lte) {
    // Filter by maximum price
    filterExpression.rating = { $lte: parseFloat(rating.lte) };
  }


  if(skip){
    return await ProductModel.find(filterExpression).skip(skip).limit(process.env.PRODUCT_LIMIT_PERPAGE);
  }
  return await ProductModel.find(filterExpression);
};


export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
