//solicitamos la funcion body de express validator, y validationResult para guardar y controlar errores de validación
const { body, validationResult } = require('express-validator');

//--validaciones--
exports.validacionLogin = [
    body('email')
        .notEmpty().withMessage('Debes ingresar un email')
        .isEmail().withMessage('Debes ingresar un email válido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) //error en validación
            return res.render('usuarios/login', { mensajeDeError: errors.mapped(), datosViejos: req.body });
        next();
    },
]

exports.validacionRegistro = [
    body('nombre')
        .notEmpty().withMessage('Debes completar el campo con tu nombre completo')
        .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un email')
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('contrasenia')
        .notEmpty().withMessage('Debes ingresar una contraseña')
        .isLength({ min: 5 }).withMessage('La contraseña debe tener como mínimo 5 caracteres'),
    body('contraseniaConfirmada').custom(async (contraseniaConfirmada, { req }) => {
        const contrasenia = req.body.contrasenia

        // Si la contraseña no es la misma
        if (contrasenia !== contraseniaConfirmada) {
            throw new Error('Las contraseña deben coincidir')
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) //error en validación
            return res.render('usuarios/registro', { mensajeDeError: errors.mapped(), datosViejos: req.body });
        next();
    },
]