const { application } = require('express');
const express = require('express');
const methodOverride= require('method-override'); //para utilizar PUT y DELETE
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const routes = require("./routes/index.routes")
const usersRoutes = require("./routes/users.routes");



app.set('views', path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//---rutas---
app.use("/", routes);
app.use("/users", usersRoutes);


//---archivos estaticos---
app.use(express.static(publicPath));

//---middleware---
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});

