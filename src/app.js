const { application } = require('express');
const express = require('express');
const methodOverride= require('method-override'); //para utilizar PUT y DELETE
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const routes = require("./routes/index.routes")
const usersRoutes = require("./routes/users.routes");
const session = require('express-session');
const cookieParser = require('cookie-parser');


const recordameMid = require('./middlewares/recordameMid')

app.set('views', path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.use(methodOverride("_method"));


//Indicamos a Express que vamos a trabajar con JSON y que la información esté en el formato correcto
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())


//---middleware de session---
app.use(session({ secret: "the secret message xd" }));

//---middleware de recuerdame con cookies---
app.use(recordameMid);

app.use((req, res, next) => {
    res.locals.logueado = 0;
    res.locals.admin = 0;
    if (req.session.usuarioLogueado){
        res.locals.logueado = 1;
        res.locals.nombreUsuario = req.session.usuarioLogueado.name;
    }
    if (req.session.admin) {
        res.locals.admin = 1;
    }
    next();
});



//---rutas---
app.use("/", routes);
app.use("/users", usersRoutes); 



//---archivos estaticos---
app.use(express.static(publicPath));

//---middleware---
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});

// error 404
app.use((req,res,next)=>{
  res.status(404).render("error404");
});

