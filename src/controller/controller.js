
const { fstat } = require('fs');
const path = require('path');
let productos= require('../data/products.json');
const fs = require("fs");

const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    
    listar: (req, res) => {
       return res.render('products',{productos});
    },

    detalleProducto: (req, res) => {
        let id=req.params.id;
        let detalle=productos.find((item)=>item.id==id);
        return res.render('detalle-producto',{detalle});
    },
    
    categoria: (req, res) => {
        let cat=req.params.categoria;
        let contienen=[];
        let bool=false;
        for(let i=0;i<productos.length;i++){
            if(productos[i].nombre.includes(cat)){
                contienen.push(productos[i]);
                bool=true;
            }
        }
        if(bool==true){
            return res.render('products',{'productos':contienen});
        }else{
            return res.render('products',{productos});
        }
    },
    eliminar:(req,res) => {
        let id=req.params.id;
        let nuevaListaProductos=productos.filter((producto)=>producto.id != id);
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(nuevaListaProductos, null, 4),
        {encoding: "utf-8",});
        res.render('abml-productos', {'productos':nuevaListaProductos});
    },
    
    alta:(req,res) => {
        return res.render('alta-producto');
       
    },

    crear: (req, res) => {
        const newId=productos[(productos.length - 1)].id + 1;
        let colorBolsa=[];
        colorBolsa.push(req.body.bolsaBeige);
        colorBolsa.push(req.body.bolsaNegra);
        colorBolsa.push(req.body.bolsaBlanca);
        colorBolsa.push(req.body.bolsaAzul);
        colorBolsa.push(req.body.bolsaRoja);
        colorBolsa.push(req.body.bolsaNaranja);
        colorBolsa.push(req.body.bolsaRosa);
        colorBolsa.push(req.body.bolsaCeleste);
        
        let colorTinta=[];
        colorTinta.push(req.body.tintaBeige);
        colorTinta.push(req.body.tintaNegra);
        colorTinta.push(req.body.tintaBlanca);
        colorTinta.push(req.body.tintaAzul);
        colorTinta.push(req.body.tintaRoja);
        colorTinta.push(req.body.tintaNaranja);
        colorTinta.push(req.body.tintaRosa);
        colorTinta.push(req.body.tintaCeleste);

        let stock=[];
        stock.push(req.body.stockBeige);
        stock.push(req.body.stockNegra);
        stock.push(req.body.stockBlanca);
        stock.push(req.body.stockAzul);
        stock.push(req.body.stockRoja);
        stock.push(req.body.stockNaranja);
        stock.push(req.body.stockRosa);
        stock.push(req.body.stockCeleste);
        
        let img =req.file;
        let nuevo={
            id: newId,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            colorBolsa: colorBolsa,
            colorTinta: colorTinta,
            tamaño: req.body.tamanio,
            precio: req.body.precio,
            imagen: `img/${img.filename}`,
            stock: stock,
            cantMinima: req.body.cantMinima
        }

        productos.push(nuevo);
        fs.writeFileSync(
            path.join(__dirname,"../data/products.json"),
            JSON.stringify(productos,null,4),
            {
                encoding: 'utf-8',
            }
        );
        return res.render('products',{productos});
        
    },

    registro: (req, res) => {
        return res.render('registro');
    },
    

    recuperarPass: (req, res) => {
        return res.render('recuperarPass');
    },

    carrito: (req, res) => {
        return res.render('carrito');
    },
    modificarProducto: (req,res) => {
        let id = req.params.id
        let index = productos.findIndex(x => x.id == id);
        let prod = productos[index];

        return res.render('modificar-producto',{prod});
    },
    abml: (req,res) => {
        return res.render('abml-productos',{productos});
   },
    
    info:(req,res) => {
        return res.render('info-pago');
    },
    edit:(req,res) => {
        let id = req.params.id;
        let index = productos.findIndex(x => x.id == id);
        let prod = productos[index];
        console.log("AAA");
        console.log(prod);
        console.log(req.body.nombre);
        let stock=[];
        stock.push(req.body.stockBeige);
        stock.push(req.body.stockNegra);
        stock.push(req.body.stockBlanca);
        stock.push(req.body.stockAzul);
        stock.push(req.body.stockRoja);
        stock.push(req.body.stockNaranja);
        stock.push(req.body.stockRosa);
        stock.push(req.body.stockCeleste);

        let colorBolsa=[];
        colorBolsa.push(req.body.bolsaBeige);
        colorBolsa.push(req.body.bolsaNegra);
        colorBolsa.push(req.body.bolsaBlanca);
        colorBolsa.push(req.body.bolsaAzul);
        colorBolsa.push(req.body.bolsaRoja);
        colorBolsa.push(req.body.bolsaNaranja);
        colorBolsa.push(req.body.bolsaRosa);
        colorBolsa.push(req.body.bolsaCeleste);
        
        let colorTinta=[];
        colorTinta.push(req.body.tintaBeige);
        colorTinta.push(req.body.tintaNegra);
        colorTinta.push(req.body.tintaBlanca);
        colorTinta.push(req.body.tintaAzul);
        colorTinta.push(req.body.tintaRoja);
        colorTinta.push(req.body.tintaNaranja);
        colorTinta.push(req.body.tintaRosa);
        colorTinta.push(req.body.tintaCeleste);
        
        let img =req.file;

        prod.nombre = req.body.nombre;
        prod.descripcion = req.body.descripcion;
        prod.colorBolsa = colorBolsa;
        prod.colorTinta = colorTinta;
        prod.tamaño = req.body.tamanio;
        prod.precio = req.body.precio;
        if(img){
            prod.imagen = `img/${img.filename}`;
        }
        prod.stock = stock;
        prod.cantMinima = req.body.cantMinima;
        console.log("BBB");
        console.log(prod);
        productos[index] = prod;

        fs.writeFileSync(
            path.join(__dirname,"../data/products.json"),
            JSON.stringify(productos,null,4),
            {
                encoding: 'utf-8',
            }
        );
        return res.render('abml-productos',{productos});
    }

    
    
}

module.exports = controller;