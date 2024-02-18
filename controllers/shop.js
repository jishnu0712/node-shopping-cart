const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "product Details",
      path: "/products"
    })
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {

  Cart.getAllCartItems(cartItems => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cartItems: cartItems,
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
