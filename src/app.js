const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();

// create express app
const app = express(); 

const PORT = process.env.PORT || 9999;

const { ROOT } = require("./utils/config").ROUTES;

// parse request data, Type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));
// parse request data, Type : application/json
app.use(bodyParser.json());
 
app.get(ROOT, (req,res)=>res.send('<h1> ChefKart Assignment by Sahil Pal </h1>'));
app.use(ROOT+"user",require("./api/routes/user"));
app.use(ROOT+"cart",require("./api/routes/cart"));
app.use(ROOT+"order",require("./api/routes/order"));

app.use(require("./utils/middlewares/404"));

// server setup
const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("App Crashed : ", err);
  } else {
    console.log("Server Started... ",server.address().port);
  }
});

module.exports = server;