// ************ Midleware Validaciones Formulario ************
const { validationResult } = require('express-validator');


// ************  ************
const controller = {

    // INDEX ************
	store: (req, res) => {

        let visitas = req.session.visitas;

        let errors = validationResult(req);

        let datos = {
            nombre: req.body.nombre,
            color: req.body.color,
            email: req.body.email,
            edad: req.body.edad,
        }

        
        if(errors.isEmpty()){

            // debe hacerse antes de enviar el render
            req.session.colorFondo = datos.color;
            
            // si necesitamos verlo en pantalla...
            // res.send(req.session.colorFondo);

            // vuelve al formulario...  
            res.render('index', { 
                // mostrar los resultados enviados...
                datos: datos,
                visitas
            })  


        }
        else{
            // vuelve al formulario...  
            res.render('index', { 
                // mostramos los errores...
                errors: errors.array(),
                // necesario para cargar las variables que esten bien...
                old: req.body, 
                visitas
            }) 
        }
          
    
},


};

module.exports = controller;