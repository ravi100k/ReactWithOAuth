const express = require('express')
require('./services/passport.js')

const app = express();
require('./routes/authRoutes.js')(app);




const PORT = process.env.PORT || 5000;

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
