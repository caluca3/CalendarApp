/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const router = Router();
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt')
const {crearUsuario,loginUsuario,revalidarUsuario} = require('../controllers/auth');


router.post('/new',
    [//*Middlewares
        check('name','El nombre es obligarotio').not().isEmpty(),
        check('email','El email es obligarotio').isEmail(),
        check('password','El password debe ser mayor a 5').isLength({min:6}),
        validarCampos
    ]
,crearUsuario)

router.post('/',
    [
        check('email','El email es obligarotio').isEmail(),
        check('password','El password debe ser mayor a 5').isLength({min:6}),
        validarCampos
    ],loginUsuario); 

router.get('/renew',validarJWT,revalidarUsuario);

module.exports = router;