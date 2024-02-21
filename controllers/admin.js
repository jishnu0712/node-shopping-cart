const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
    .then((result) => {
      console.log("Saved successfully");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // Product.findByPk(prodId)
  req.user
    .getProducts({ where: { id: prodId } })
    .then((product) => {
      product = product[0];
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit",
        path: "admin/products",
      });
    })
    .catch();
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const { title, imageUrl, price, description } = req.body;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.imageUrl = imageUrl;
      product.price = price;
      return product.save();
    })
    .then((result) => {
      console.log("product updated");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("destroyed");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
