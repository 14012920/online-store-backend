const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const paymentRoute = require("./routes/payementRoute");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoute");
const staticContentRoutes = require("./routes/staticContentRoute");

dotenv.config();

//connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
  }
);

// parse application/json
// app.use(formData.parse());
// app.use(formidable());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//Routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoutes);
app.use("/api/static", staticContentRoutes);

// Middleware
app.use(cors({ credentials: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//port runing
app.listen(process.env.PORT, () => {
  console.log("server up and runing on port 4000!");
});
