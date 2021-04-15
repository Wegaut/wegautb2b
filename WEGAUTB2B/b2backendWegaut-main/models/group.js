'use strict'

var mongoose  = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Contact = require('../models/user').Schema;
const User    = require('../models/user').Schema;

var Schema = mongoose.Schema;

var MessageSchema =  new Schema({

    messageContent:{ type:String },
    //idStatusMessage:{ type:Boolean },
    user :{ type: Schema.ObjectId, ref:'User'},
    urlFile:{ type:String, default:'Image.png'},
},{ 	versionKey:false,
        timestamps:true, 

});

var Message = mongoose.model('Message' ,MessageSchema);

var GroupsSchema =  new Schema({
    nameChat:{ type:String },
    user :{type: Schema.Types.ObjectId, ref:'User'}, 
    //contact:[ContactSchema] 
    email:[ { type:String, unique:true, trim:true, require:true}],
    messages:[MessageSchema] 
},{ 	versionKey:false,
        timestamps:true,      
});

//cargar grupos
GroupsSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('Group',  GroupsSchema);
