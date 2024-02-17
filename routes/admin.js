const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/products/:productId => GET editor
router.get('/products/:productId', adminController.editProduct);

// /admin/products/:productId => POST updateProduct
router.post('/products/:productId', adminController.updateProduct);

// /admin/products/:productId => POST delete Product
router.get('/products/delete/:productId', adminController.deleteProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
