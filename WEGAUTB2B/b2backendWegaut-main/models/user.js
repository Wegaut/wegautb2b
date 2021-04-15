'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var ContactSchema = new Schema({
      user :{ type:Schema.Types.ObjectId, ref:'User'},
      email: { type:String, trim:true},
     // email: [{type: Schema.Types.ObjectId, ref:'User'}]
      },{ 	versionKey:false,
            timestamps:true,      
});

var UserSchema = new Schema({
      name: { type:String,  trim:true, require:true},
      lastname: { type:String,  trim:true,  require:true},
      email: { type:String, unique:true, trim:true, require:true},
      password: { type:String, trim:true, /*required: [true,'El Password debe ser mas de 6 caracteres']*/},
      nPhone: { type:String, trim:true, /*required: [true,'El Numero debe insertar el umero de telefono']*/},
      photoProfile:{ type:String, default:'Image.png'},
      contacts:[ContactSchema] 
      },{ 	versionKey:false,
            timestamps:true,      
});

/*
var MessageSchema =  new Schema({

      messageContent:{ type:String },
      //idStatusMessage:{ type:Boolean },
      user :{ type: Schema.ObjectId, ref:'User'},
      urlFile:{ type:String, default:'Image.png'},
  },{ 	versionKey:false,
          timestamps:true, 
  });



var GroupsSchema =  new Schema({
      nameChat:{ type:String },
      user :{type: Schema.Types.ObjectId, ref:'User'}, 
      //Contact:[Contact],
      //email: [{type: Schema.Types.ObjectId, ref:"Contact"}], 
      contacts:{type: Schema.Types.ObjectId, ref:'Contact'},
      messages:[MessageSchema] 
  },{ 	versionKey:false,
          timestamps:true,      
  });

*/
//metodo para Eliminar password
UserSchema.methods.toJSON=function () {
      var obj =this.toObject();
      delete obj.password;
      
      return obj;
};

  //cargar grupos
 // GroupsSchema.plugin(mongoosePaginate);

  

//var Message = mongoose.model('Message' ,MessageSchema);
//var Group = mongoose.model('Group',  GroupsSchema);  

var Contact = mongoose.model('Contact', ContactSchema);  
module.exports = mongoose.model('User' ,UserSchema);