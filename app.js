import serverless from "serverless-http"; // Importing serverless-http package

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "jishnu", email: "jishnudevroy@gmail.com" });
    }
    return user;
  })
  .then((res) => {
    console.log(res);
    // Start the serverless handler after setting up all the routes and middleware
    const handler = serverless(app);
    module.exports.handler = async (event, context) => {
      // Your serverless function entry point
      return await handler(event, context);
    };
  })
  .catch((err) => console.log(err));
