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
  
  Product
    .create({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description
    })
    .then((result) => {
      console.log('Saved successfully');
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(err => console.log(err))
};

exports.editProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit",
      path: "admin/products",
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // get form data
  // update the product
  Product.updateProduct(prodId, req.body);

  // redirect
  res.redirect("/products");
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.deleteProduct(productId);
  res.redirect("/products");
};
