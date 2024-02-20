const fs = require("fs");
const path = require("path");

const db = require("../util/database");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    return db.execute("INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)", [
      this.title, this.description, this.price, this.imageUrl
    ]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products where id = ?",[id]);
  }

  static updateProduct(id, updatedProd) {}

  static deleteProduct(id) {}
};
