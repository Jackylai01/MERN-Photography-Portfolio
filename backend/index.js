const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const cors = require("cors");

//引入路由位置
const user = require("./routes/user-route");
const createProfile = require("./routes/Profile-route");
const upload = require("./routes/slideshow-route");
const HomePhoto = require("./routes/HomePhoto-route");
const commercial = require("./routes/Commercial-route");
const activity = require("./routes/Activity-route");
const graphicDesign = require("./routes/GraphicDesign-route");
const space = require("./routes/Space-route");
const fashion = require("./routes/fashion-route");
const product = require("./routes/Product");

//連結雲端資料庫-mongodb-altas
mongoose
  .connect(process.env.DO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas.");
  })
  .catch((e) => {
    console.log(e);
  });

//跨域設定
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:3000",
    "https://cloudinary.com/",
    "https://photography-portfolio-eryj.onrender.com
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//跨域請求
app.use(cors(corsOptions));

//中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//路由位置
app.use("/user", user);
app.use("/profile", createProfile);
app.use("/home", HomePhoto);

app.use("/upload", upload);
app.use("/commercial", commercial);
app.use("/activity", activity);
app.use("/graphicDesign", graphicDesign);
app.use("/space", space);
app.use("/fashion", fashion);
app.use("/product", product);

//伺服器
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
