'use strict'

var mongoose = require('mongoose');
var app = require('./app');
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
				//mongodb://localhost:27017/Chatbot
				//'mongodb+srv://JonasAndres:Developer04@b2bdatabase.hgzdh.mongodb.net/b2bdatabase?retryWrites=true&w=majority'
				//mongodb+srv://JonasAndres:Miajade212.@b2bchat.zwvdu.mongodb.net/B2BChat
				
				mongoose.connect('mongodb+srv://wegautb2b:Miajade212.@wegautb2b.zy9c6.mongodb.net/B2BChat?retryWrites=true&w=majority',{useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(() => {
	console.log("Conexión a la base de datos establecida satisfactoriamente...");
	// Creacion del servidor
	app.listen(PORT, () => {
		console.log(`Servidor corriendo correctamente en la url: localhost:${ PORT }`);
	});
})
.catch(err => console.log(err));



