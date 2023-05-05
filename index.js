// import atau panggil package yang kita mau pake di aplikasi kita
const express = require('express');
const path = require("path");
const { product } = require('./models')
const bodyParser = require('body-parser');
const routes = require('./routes');
const { default: axios } = require('axios');
const { Op } = require('sequelize');

// yang bantu upload file
const imagekit = require('./lib/imagekit')
const upload = require('./middleware/uploader')

// framework utk http server
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// proses baca json 

// setting view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// public
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "controller")))

// url utama dari aplikasi
// req = request 
// res = response
// app.get('/', (req, res) => {
//     res.send('Hello FSW 3 yang luar biasa dari server nih !');
// })


app.use(routes);

// memulai server nya
app.listen(PORT, () => {
    console.log(`App running on Localhost: ${PORT}`)
})