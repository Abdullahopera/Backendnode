import Product from "../src/models/product.js";

export const getProduct = async (req, res) => {
  try {
    const { name, id } = req.query;
    let product;
    if (id) {
      product = await Product.findById(id);
    } else if (name) {
      product = await Product.findOne({ name });
    } else {
      return res.status(400).json({ message: "Provide a name or id query" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
