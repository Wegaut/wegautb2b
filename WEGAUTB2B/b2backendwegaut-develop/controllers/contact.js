'use strict'

var User = require('../models/user');
var validator =require('validator');
var Contact = require('../models/user');

var controller={

addContact: function (req, res) {
    console.log("qlq estas entrando aqui?? ");
    var userId = req.params.userId;

    User.findById(userId).exec((err, user)=>{
        if(err){
            return  res.status(500).send({
                status:'error',
                message:'Error en la peticion', 
            });
        }
        if(!user){
            return  res.status(500).send({
                status:'error',
                message:'No existe el tema', 
            });
        }
        if(req.body.email){
            try{
                var validate_email = !validator.isEmpty(req.body.email);  

            }catch(err){
                    return  res.status(200).send({
                        message:'no has comentado nada', 
                });
            }   

        if(validate_email){


            var contacts = {
                user: req.user.sub,
                email: req.body.email,
            };

            user.contacts.push(contacts);

            user.save((err)=>{

                if(err){
                    return  res.status(500).send({
                        status:'error',
                        message:'Error al guardar el contacto', 
                    });
                }

            return  res.status(200).send({
                status:'status',
                message:'Se ha añadido el contacto  ',
                user
                });
            });

        }else{
                return  res.status(200).send({
                    message:'no has comentado nada', 
            });
        }
    }

 }); 

},
    verifyContactBeforeAdd: function (req, res){
        User.findOne({email: req.params.email}, function(err, email) {
           // console.log(result);
           console.log(email);
            if(err ||!email){
                return  res.status(500).send({
                    status:'error',
                    message:'el usuario no esta en la plataforma y no lo puedo agregar a mis contactos', 
             
                });
            }else{
                return res.status(200).send({
                    status:'success',
                    email
                });
            }
        });
    },


    deleteContac: function (req, res) {
        //Sacar el id del grupo y el comentario y del comentario a borrar
        
        var userId = req.params.userId;
        var contactId = req.params.contactId;
        // buscar el grupo

        User.findById(userId,(err,user) =>{
            console.log(user);
            if(err){
                return  res.status(500).send({
                    status:'error',
                    message:'Error en la peticion', 
                });
            }
            if(!user){
                return  res.status(404).send({
                    status:'error',
                    message:'No existe el UsuarioID', 
                });
            }
        //seleccionar el subdocumento (comentario)
        var contact = user.contacts.id(contactId);

        //borrar el comentario
            if(contact){
                contact.remove();
            //guardar el grupo
            user.save((err)=>{

                if(err){
                    return res.status(200).send({
                        status:'success',
                        message:'Soy el metodo Delete'
                    });
                }  
            //devolver el resultado
            return res.status(200).send({
                status:'success',
                user
                });
            });

            }else{
                return  res.status(404).send({
                    status:'error',
                    message:'No existe el contactoID', 
                    });
                }
        });
    },    

    getContact: function (req, res) {
        //Sacar el id del grupo y el comentario y del comentario a borrar
        
        var userId = req.params.userId;
        var contactId = req.params.contactId;
        // buscar el grupo

        User.findById(userId,(err,user) =>{
            
            if(err){
                return  res.status(500).send({
                    status:'error',
                    message:'Error en la peticion', 
                });
            }
            if(!user){
                return  res.status(404).send({
                    status:'error',
                    message:'No existe el UsuarioID', 
                });
            }

        //seleccionar el subdocumento (comentario)
        var contact = user.contacts.id(contactId);

            return res.status(200).send({
                status:'success',
                message:'El contacto es el siguiente',
                contact
                });
            });
       
    },
    
        getContacts: function (req,res){
      
            var userId = req.params.userId;
            // buscar el grupo
    
            User.findById(userId,(err,user) =>{
                console.log(user);
                if(err){
                    return  res.status(500).send({
                        status:'error',
                        message:'Error en la peticion', 
                    });
                }
                if(!user){
                    return  res.status(404).send({
                        status:'error',
                        message:'No existe el UsuarioID', 
                    });
                   
                }
                return res.status(200).send({
                    status:'success',
                    user
                });
            });
        },    


       /* searchContact: function(req,res){

            //Sacar string a buscar de la url
            var searchString = req.params.search;
            //find or 
            User.find({ "$or":[
                { "email": { "$regex": searchString, "$options": "i"}},
               
            ]})
            .sort([['createdAt', 'descending']])
            .exec((err, contacts) =>{
    
                if(err){
                    return res.status(500).send({
                        status:'error',
                        message:'Error en la peticion'
                    });
                }
                if(!contacts){
                    return res.status(404).send({
                        status:'error',
                        message:'Datos no encontrados'
                    }); 
                 } 
          
                //devolver el resultado
                return res.status(200).send({
                    status:'success',
                    contacts
                });
            }); 
        }*/

     
    
    };
   
module.exports= controller; 