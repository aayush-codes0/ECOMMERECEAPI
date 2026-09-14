const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const OrderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DBconnection successful!")).catch((err)=>{
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/checkout", stripeRoute);



app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server is running");
})