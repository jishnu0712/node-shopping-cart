const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    
    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: {cart: updatedCart} }
    );
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
