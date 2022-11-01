/*
    Event routes
    /api/events
*/

const { Router } = require('express');
const router = Router();
const {check} = require('express-validator')

const {validarJWT} = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas deben pasar por la validadcion JWT
router.use(validarJWT);

//Obtener eventos
router.get('/',getEventos)

//Crear eventos
router.post(
    '/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('title','La fecha de Start obligatoria').custom(isDate),
    check('title','La fecha de End obligatoria').custom(isDate),
    validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put(
    '/:id',
    [check('title','El titulo es obligatorio').not().isEmpty(),
    check('title','La fecha de Start obligatoria').custom(isDate),
    check('title','La fecha de End obligatoria').custom(isDate),
    validarCampos],
    actualizarEvento)

//Borrar evento
router.delete('/:id',eliminarEvento)


module.exports = router;
