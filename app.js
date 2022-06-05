const express = require('express');
const path = require('path');
const app=express();
const publicPath=path.resolve(__dirname,"./public");

app.use(express.static(publicPath));

app.listen(3000,()=> {
    console.log("Servidor corriendo en el puerto 3000")
});

app.get('/registro',function(req,res){
    res.sendFile(path.join(__dirname,'./src/view/registro.html'));
});

app.get('/detalle-producto',function(req,res){
    res.sendFile(path.resolve(__dirname,'./src/view/detalle-producto.html'));
})
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'./src/view/index.html'));
})

app.get('/products', function (req, res) {
    res.sendFile(path.resolve(__dirname, './src/view/products.html'));
})

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,'./src/view/login.html'));
})

app.get('/recuperarPass',function(req,res){
    res.sendFile(path.join(__dirname,'./src/view/recuperarPass.html'));
})

app.get ('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, './src/view/carrito.html'))
})
