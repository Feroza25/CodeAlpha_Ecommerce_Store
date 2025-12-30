const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"));

app.get("/", (req, res) => res.send("Server running"));

/* REGISTER */
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.json("Registered");
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

/* PRODUCTS */
app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

/* CREATE ORDER */
app.post("/order", async (req, res) => {
  await Order.create(req.body);
  res.json("Order placed");
});

app.listen(5000, () => console.log("✅ Server running on 5000"));
