const router = require("express").Router();
const crypto = require("crypto");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: "rzp_test_U1odAZx2aIXLbD",
  key_secret: "MvKndbYci2ujSvenYcC7pNiS",
});

router.post("/verification", (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;
  console.log("request body", req.body);

  const shasum = crypto.createHmac("sha256", "MvKndbYci2ujSvenYcC7pNiS");
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");
  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === razorpaySignature) {
    console.log("request is legit", req);
    // process it
    require("fs").writeFileSync(
      razorpayOrderId,
      JSON.stringify(req.body, null, 4)
    );
    res.json({ status: "success", message: "order place successfully" });
  } else {
    // pass it
    res.json({ status: "failed", message: "verfication failed" });
    console.log("in else");
  }
});

router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const { amount } = req.body;
  const currency = "INR";
  console.log("request body", req.body);
  const options = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
  };

  try {
    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
