const path = require('path')
const multer  = require('multer')

const storage = multer.diskStorage({
    //indicamos donde se van a guardar las imagenes
    destination: function (req, file, cb) {
      cb(null, '../public/img')
    },
    //indicamos el nombre con el que se guardara el archivo
    filename: function (req, file, cb) {
      const nombreImagen =`${Date.now()}-img${path.extname(file.originalname)}`  
      cb(null, nombreImagen)
    }
  })
  
  const upload = multer({ storage: storage
  }) //guarda toda la logica de multer creada 

  module.exports= upload;