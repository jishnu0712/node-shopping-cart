const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65e0e1d38b901952182fe6b6")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user.id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
  "mongodb+srv://clumpiness:r1fbR7A327xczldH@cluster0.qcwuzp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(result => {
  app.listen(3000, console.log("server started"));
}).catch(err => console.log(err));
