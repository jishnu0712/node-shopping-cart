const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65e3dd4116a0b1e2f1560e99')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://clumpiness:r1fbR7A327xczldH@cluster0.qcwuzp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Jishnu',
          email: 'jishnu@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000, console.log('server started'));
  })
  .catch(err => {
    console.log(err);
  });
