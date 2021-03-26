
'use strict'

var express=require('express');
var ContactController =require('../controllers/contact');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});


router.post('/POST_CONTACT/:userId?', md_auth.authenticated,ContactController.addContact);
router.get('/GET_CONTACT_BEFORE_ADD/:email?', md_auth.authenticated,ContactController.verifyContactBeforeAdd);
router.delete('/DELETE_CONTACT/:userId/:contactId?', md_auth.authenticated,ContactController.deleteContac);
router.get('/GET_CONTACT/:userId/:contactId?', md_auth.authenticated,ContactController.getContact);
router.get('/GET_CONTACTS/:userId?', md_auth.authenticated,ContactController.getContacts);

 
module.exports = router; 


//https://wegautb2b.herokuapp.com
//REvisar UPLOAD FILE
//Revisar Get Groups
//GET_GROUP_USER
//update Group
