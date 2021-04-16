'use strict'

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ContactSchema = require('../models/user');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    messageContent: {type: String},
    //idStatusMessage:{ type:Boolean },
    user: {type: Schema.ObjectId, ref: 'User'},
    urlFile: {type: String, default: 'Image.png'},
}, {
    versionKey: false,
    timestamps: true,
});

const GroupMemberSchema = new Schema({
    name: {type: String},
    email: {type: String, trim: true}
}, {
    versionKey: false,
    timestamps: true,
});

const GroupsSchema = new Schema({
    // TODO: Modify this schema according to business needs
    nameChat: {type: String},
    // user: {type: Schema.ObjectId, ref: 'User'},
    // email: {type: String, unique: true, trim: true, require: true},
    //contact :{ type:Schema.ObjectId, ref:'Contact'}, 
    // messageContent: {type: String},
    messages: [MessageSchema],
    groupMembers: [GroupMemberSchema]
}, {
    versionKey: false,
    timestamps: true,
});

// Loading schemas
const message = mongoose.model('Message', MessageSchema);
const groupMember = mongoose.model('GroupMember', GroupMemberSchema);

//cargar grupos
GroupsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Group', GroupsSchema);
