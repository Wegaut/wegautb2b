'use strict'

var mongoose = require('mongoose');
var app = require('./app');
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
				
/** Conexion local */										//mongodb://localhost:27017/Chatbot
/** Conexion con el correo de prueba */						//mongodb+srv://JonasAndres:Miajade212.@b2bchat.zwvdu.mongodb.net/B2BChat
/** Conexion con el correo de desarrollo */					//mongodb+srv://JonasAndres:Developer04@b2bdatabase.hgzdh.mongodb.net/b2bdatabase?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://JonasAndres:Developer04@b2bdatabase.hgzdh.mongodb.net/b2bdatabase?retryWrites=true&w=majority',{useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(() => {
	console.log("Conexión a la base de datos establecida satisfactoriamente...");
	// Creacion del servidor
	app.listen(PORT,  () => {
		console.log(`Servidor corriendo correctamente en la url: localhost:${PORT}`);
	});
})
.catch(err => console.log(err)); 




