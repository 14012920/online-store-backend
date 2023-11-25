const Product = require("../model/ProductModel");

// Get All products
const product_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get Cat wise products
const catWiseProduct = async (req, res) => {
  console.log("req.params.catId",req.params)
  try {
    const products = await  Product.find({ category:req.params.catId }).exec();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};
// Single product
const product_details = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Add New product
const product_create = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    image: req.file.path,
    details: req.body.details,
    qty: req.body.qty,
    ratings: req.body.ratings,
  });

  try {
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (error) {
    console.log("Error", error);
    res.status(400).send(error);
  }
};

// Update product
const product_update = async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      details: req.body.details,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      product
    );
    res.json(updatedProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
const product_delete = async (req, res) => {
  try {
    const removeProduct = await Product.findByIdAndDelete(req.params.productId);
    res.json(removeProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  product_all,
  product_details,
  product_create,
  product_update,
  product_delete,
  catWiseProduct
};
