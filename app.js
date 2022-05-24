/* Importo el módulo express */
const express = require ('express');

/* Guardo en la variable app la ejecución de la función express */
const app = express();

/* Importo el módulo nativo path en la variable path */
const path = require ('path');

/* A través de la propiedad static de express establezco los archivos estáticos */
app.use (express.static('public'));

/* Levanto mi servidor */
app.listen(8080, () => console.log('Servidor funcionando en http://localhost:8080'))

/* Indico cuando me mostrará el home de mi página */
app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})
app.get ('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/carrito.html'))
})