import Product from "../models/product.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const getProducts = catchAsync(async (req, res) => {
  const { search, category, page = 1, limit = 12 } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (category) query.category = category;

  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(query).sort("-createdAt").skip(skip).limit(Number(limit)).lean(),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) throw new ApiError(404, "Product not found");
  res.json(product);
});

export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user.id });
  res.status(201).json(product);
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new ApiError(404, "Product not found");
  res.json(product);
});

export const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  res.json({ message: "Product deleted" });
});
