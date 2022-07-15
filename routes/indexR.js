var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const { body } = require('express-validator');

const {
  store,
} = require('../controllers/indexC');

// ************ Midleware Validaciones Formulario ************


const validationResult = [

  // Verifica que el campo no esté vacío
  body('nombre').notEmpty().withMessage('NOMBRE: Debes completar el nombre'),
  // Verifica la longitud de los datos
  body('color').notEmpty().withMessage('COLOR: Debes completar el color'),
  // Verifica que sea un email válido
  body('email').notEmpty().withMessage('EMAIL: Debes completar el email').bail()
    .isEmail().withMessage('EMAIL: Debe tener formato de email'),
  // Verifica que sea un número entero
  body('edad').isInt().withMessage('EDAD: Debe ser un numero')

]





/* GET home page. */
router.get('/', function(req, res, next) {
  // aplicamos un contador de visitas...
  let visitas = req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
  res.render('index', { visitas: visitas });
});


// incluimos el midleware de validaciones del formulario
router.post('/', validationResult, store);

router.get('/session', function(req, res, next) {
  // mostramos como persisten los datos session...
  let visitas = req.session.visitas;
  res.render('session', { visitas: visitas });
});

module.exports = router;
