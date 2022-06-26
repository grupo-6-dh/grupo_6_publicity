const express = require('express');
const methodOverride= require('method-override'); //para utilizar PUT y DELETE
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const routes = require("./routes/index.routes")



app.set('view engine','ejs');

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//---rutas---
app.use("/", routes)

//---archivos estaticos---
app.use(express.static(publicPath));

//---middleware---
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});

