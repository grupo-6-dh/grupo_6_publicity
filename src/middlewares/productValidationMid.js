const path = require('path');

//solicitamos la funcion body de express validator, y validationResult para guardar y controlar errores de validación
const { body, validationResult } = require('express-validator');

//--validaciones--
exports.validacionDatosProducto = [

    body('nombre')
        .notEmpty().withMessage('Debes ingresar el nombre del producto')
        .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres'),
    body('precio')
        .notEmpty().withMessage('Debes ingresar el precio del producto'),
    body('descripcion')
        .notEmpty().withMessage('Debes agregar una descripcion del producto'),
    body('tamanio')
        .notEmpty().withMessage('Debes ingresar el tamaño del producto'),
    body('cantMinima')
        .notEmpty().withMessage('Debes ingresar la cantidad mínima de compra'),
    body('img')
        .custom((value, { req }) => {
            let file = req.file;

            let extensionAceptada = ['.png', '.jpg', '.gif'];
            //controlamos que se suba una imagen
            if (!file) {
                throw new Error('Debes subir una imágen')
            } else {
                //controlamos que sea valida la extension del archivo subido
                let extension = path.extname(file.originalname);

                if (!extensionAceptada.includes(extension)) {
                    throw new Error(`Los tipos de archivo permitidos son ${extensionAceptada.join(', ')}`);
                }
                //verifica que la imagen no sea mayor a 1.5MB        
                if (file.size > 1500000) {
                    throw new Error('El archivo es demasiado grande');
                }


            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //error en validación
            //si se cargo una imagen previamente la borramos
            if (req.file != 'undefined') {
                fs.unlinkSync(path.join(__dirname, "../../public/img/", req.file.filename));
            }
            //podemos enviar errores.array o errores.mapped dependiendo de si queremos utilizarlo en la vista como array o como objeto, en este caso enviamos un objeto
            return res.render('productos/alta', { mensajeDeError: errores.mapped(), datosViejos: req.body });
        }
        next();
    },
]

exports.validacionDatosProductoEditar = [

    body('nombre')
        .notEmpty().withMessage('Debes ingresar el nombre del producto')
        .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres'),
    body('precio')
        .notEmpty().withMessage('Debes ingresar el precio del producto'),
    body('descripcion')
        .notEmpty().withMessage('Debes agregar una descripcion del producto'),
    body('tamanio')
        .notEmpty().withMessage('Debes ingresar el tamaño del producto'),
    body('cantMinima')
        .notEmpty().withMessage('Debes ingresar la cantidad mínima de compra'),
    body('img')
        .custom((value, { req }) => {
            let file = req.file;

            let extensionAceptada = ['.png', '.jpg', '.gif'];
            //controlamos que se suba una imagen
            if (!file) {
                throw new Error('Debes subir una imágen')
            } else {
                //controlamos que sea valida la extension del archivo subido
                let extension = path.extname(file.originalname);

                if (!extensionAceptada.includes(extension)) {
                    throw new Error(`Los tipos de archivo permitidos son ${extensionAceptada.join(', ')}`);
                }
                //verifica que la imagen no sea mayor a 1.5MB        
                if (file.size > 1500000) {
                    throw new Error('El archivo es demasiado grande');
                }


            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //error en validación
            //si se cargo una imagen previamente la borramos
            if (req.file != 'undefined') {
                fs.unlinkSync(path.join(__dirname, "../../public/img/", req.file.filename));
            }
            //podemos enviar errores.array o errores.mapped dependiendo de si queremos utilizarlo en la vista como array o como objeto, en este caso enviamos un objeto
            return res.render('productos/edit', { mensajeDeError: errores.mapped(), datosViejos: req.body });
        }
        next();
    },
]