const withAuth = (req, res, next) => {
  console.log('req session', req.session)
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
