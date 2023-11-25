const Order = require("../model/orderModel");

// Get All products
const save_order = async (req, res) => {
  console.log("Save order", req.body);
  const { order_id, products, user, totalPrice, shippingInfo, shippingCharge } =
    req.body;
  const order = new Order({
    order_id: order_id,
    totalPrice: totalPrice,
    user: user,
    products: req.body.products,
    address: req.body.address,
    shippingCharge: shippingCharge,
    shippingInfo: shippingInfo,
  });

  try {
    const savedOrder = await order.save();
    console.log("Save order", order, savedOrder);
    res.status(200).send({ status: 200, msg: "order store successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ status: 400, msg: error });
  }
};

const get_orderby_user = async (req, res) => {
  console.log("req", req.body);
  try {
    const orders = await Order.find({ user: req.body.userId });
    if (orders.length) {
      res.status(200).json({ data: orders });
    } else {
      res.status(200).json({ data: orders, msg: "no orders" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// // Add New product
// const product_create = async (req, res) => {
//   const product = new Product({
//     title: req.body.title,
//     price: req.body.price,
//     image: req.file.path,
//     details: req.body.details,
//     qty: req.body.qty,
//     ratings: req.body.ratings,
//   });

//   try {
//     const savedProduct = await product.save();
//     res.status(200).send(savedProduct);
//   } catch (error) {
//     console.log("Error", error);
//     res.status(400).send(error);
//   }
// };

// // Update product
// const product_update = async (req, res) => {
//   try {
//     const product = {
//       title: req.body.title,
//       price: req.body.price,
//       image: req.body.image,
//       details: req.body.details,
//     };

//     const updatedProduct = await Product.findByIdAndUpdate(
//       { _id: req.params.productId },
//       product
//     );
//     res.json(updatedProduct);
//   } catch (error) {
//     res.json({ message: error });
//   }
// };

// // Delete product
// const product_delete = async (req, res) => {
//   try {
//     const removeProduct = await Product.findByIdAndDelete(req.params.productId);
//     res.json(removeProduct);
//   } catch (error) {
//     res.json({ message: error });
//   }
// };

module.exports = {
  save_order,
  get_orderby_user,
};
