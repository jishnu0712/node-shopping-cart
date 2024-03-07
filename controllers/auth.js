const User = require("../models/user");
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true');
  User.findById('65e330e6ac27816fc3167d02')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};