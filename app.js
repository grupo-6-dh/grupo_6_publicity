const express=require("express");
const path=require("path");
const app=express();

const publicPath=path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(3000,()=> {
    console.log("Servidor corriendo en el puerto 3000")
});

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'./view/header-footer.html'));
})

app.get('/detalle-producto',function(req,res){
    res.sendFile(path.resolve(__dirname,'./view/detalle-producto.html'));
})
