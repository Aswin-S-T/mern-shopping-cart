import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import path from "path";
import orderRouter from "./router/orderRouter.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(__dirname, "./frontend/build")));

mongoose.connect(
  "mongodb+srv://WhithatHacker:Aswins@1234<tecHie#4*!>@cluster0.yd0qb.mongodb.net/easyshopping?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id == req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("Product Not Found");
  }
});

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

app.get("/", (req, res) => {
  res.send("Nodejs is working");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
