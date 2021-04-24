'use strict'

const validator = require('validator');
const Group = require('../models/group');
const _ = require('lodash');

const controller = {
//rutas o controladores de pruebas

    test: function (req, res) {
        return res.status(200).send({
            message: "soy el metodo testeando"
        });

    },

    saveGroup: function (req, res) {

        const errorMessageObj = {};
        const groupMembers = [];

        // TODO: Investigate about Joi library for inputs validation.
        // Input validation
        if (validator.isEmpty(req.body.nameChat)) {
            errorMessageObj.message = 'Chat name is not specified.';
        }

        if (_.isEmpty(req.body.groupMembers)) {
            errorMessageObj.message = 'Members cannot be an empty array.';
        }

        req.body.groupMembers.forEach((member) => {
            if (validator.isEmpty(member.name)) {
                errorMessageObj.message = 'Member name cannot be empty.';
                return;
            }
            if (validator.isEmpty(member.name) || !validator.isEmail(member.email)) {
                errorMessageObj.message = 'Invalid member email.';
                return;
            }
            groupMembers.push({name: member.name, email: member.email});
        });

        if (!_.isEmpty(errorMessageObj)) {
            errorMessageObj.status = 'bad_request';
            return res.status(400).send(errorMessageObj);
        }

        const group = new Group();
        group.nameChat = req.body.nameChat;
        group.user = req.user.sub;
        group.groupMembers = groupMembers;

        group.save((err, groupStored) => {
            //devolver una respuesta
            if (err || !groupStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'el Tema no se ha guardado'
                });
            }
            return res.status(200).send({
                status: 'succes',
                groupStored
            });

        });
    },

    getGroups: function (req, res) {

        //recoger grupos actuales
        if (!req.params.group || req.params.group == null || req.params.group == undefined) {

        } else {
            //cargar los mensajes
            var group = req.params.group;
        }

        //indicar las opciones  de la paginacion
        var options = {
            sort: {createdAt: -1},
            populate: 'user'
        };
        //find message


        Group.paginate({}, options, (err, group) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al hacer la consulta',
                });
            }
            if (!group) {
                return res.status(404).send({
                    status: 'notFound',
                    message: 'no hay datos'
                });
            }

            return res.status(200).send({
                status: 'success',
                group: group.docs,
                totalDocs: group.totalDocs,
            });
        });
    },

    getGroupByUsuario: function (req, res) {

        //conseguir el id del usuario

        var user = req.params.user;
        Group.find({
            user: user
        })
            .sort([['createdAt', 'descending']])
            .exec((err, group) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error en la peticion '
                    });
                }
                if (!group) {
                    return res.status(404).send({
                        message: 'no hay grupos para mostrar'
                    });
                }

                //devolver resultado
                return res.status(200).send({
                    status: 'success',
                    group
                });
            });

    },

    getGroup: function (req, res) {
        //sacar eñ id del topic de la url
        var groupId = req.params.id;

        //find por id del topic
        Group.findById(groupId)
            .populate('user')
            /* Comentario agregado, para borrar*/
            .populate('messages.user')
            /**/
            .exec((err, group) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion',
                    });
                }

                if (!group) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el grupo',
                    });
                }
                //Devolver Resultado
                return res.status(200).send({
                    status: 'success',
                    group
                });
            });
    },

    putGroup: function (req, res) {

        //recoger el id de la conversacion de la url
        var groupId = req.params.id;
        // recoger los datos que llega desde el post
        var params = req.body;
        //validar datos
        try {
            var validate_nameChat = !validator.isEmpty(params.nameChat);

        } catch (err) {
            return res.status(200).send({
                message: 'faltan datos por enviar // PUT',
            });
        }

        if (validate_nameChat) {
            //montar un json con los datos modificables
            var update = {
                nameChat: params.nameChat

            };
            console.log(update);
            //find and update del topic por id y por id de usuario
            Group.findOneAndUpdate({_id: groupId, user: req.user.sub}, update, {new: true}, (err, groupUpdated) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error en la peticion  grupo',
                    });
                }
                console.log(groupUpdated);
                if (!groupUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error no se ha actualizado el grupo  ',
                    });
                }
                //devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    group: groupUpdated
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'la validacion de los datos no es correcta ',
            });

        }
    },

    deletetGroup: function (req, res) {

        //sacar el id del grupo de la url
        var groupId = req.params.id;
        //find and delete por groupID y por usuarioID
        Group.findByIdAndDelete({_id: groupId, user: req.user.sub}, (err, groupRemoved) => {

            if (err) {
                return res.stats(500).send({
                    status: 'error',
                    message: 'Error en la peticion'
                });
            }

            if (!groupRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el el grupo'
                });
            }
            //Devolver respuesta
            return res.status(200).send({
                status: 'success',
                message: 'Se ha borrado el grupo con exito!',
                group: groupRemoved
            });
        });
    },

    searchGroup: function (req, res) {

        //Sacar string a buscar de la url
        var searchString = req.params.search;
        //find or 
        Group.find({
            "$or": [
                {"nameChat": {"$regex": searchString, "$options": "i"}},
                {"message": {"$regex": searchString, "$options": "i"}},
                {"messageContent": {"$regex": searchString, "$options": "i"}}
            ]
        })
            .sort([['createdAt', 'descending']])
            .exec((err, groups) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion'
                    });
                }
                if (!groups) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Datos no encontrados'
                    });
                }

                //devolver el resultado
                return res.status(200).send({
                    status: 'success',
                    groups
                });
            });
    }

};

module.exports = controller;
