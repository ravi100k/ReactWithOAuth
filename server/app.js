const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys.js');
require('./models/user.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes.js')(app);


const PORT = process.env.PORT || 5000;
// app.listen(PORT)
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
    }
    else {
    next();
    }
});

app.listen(PORT, function () {
  console.log('Express server is up on port '+PORT);
});
