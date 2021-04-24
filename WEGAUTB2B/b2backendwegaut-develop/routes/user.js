'use strict'

var express = require('express');
var UserController = require('../controllers/user');


var router = express.Router();
var md_auth=require('../middleware/authenticated');

var multpart =require('connect-multiparty');
var md_upload=multpart({uploadDir:'./uploads/users'});

const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/users/');
        
    },

    filename:function(req,file,cb){
        cb(null,"user" + Date.now() + file.originalname);
    }
});
 
const upload = multer({storage:storage});



  
router.get('/home1', UserController.home);
router.post('/test1', UserController.test);
router.get('/GET_USERS', UserController.getUsuarios);
router.get('/GET_USER/:userId', UserController.getUsuario);
router.post('/POST_USER', UserController.save);
router.post('/POST_LOGIN', UserController.login);
router.put('/PUT_USER/', md_auth.authenticated, UserController.update);
router.delete('/DELETE_USER/:userId', md_auth.authenticated, UserController.deleteUsusario );
//router.post('/uploadPhotoProfile2', [md_upload,md_auth.authenticated], UserController.uploadPhotoProfile);
router.post('/uploadPhotoProfile', [md_auth.authenticated,upload.single('photoProfile')], UserController.uploadPhotoProfile);
//router.post('/uploadPhotoProfile3', [md_auth.authenticated,upload.single('photoProfile')], UserController.uploadPhotoProfile3);

router.get('/photoProfile/:fileName', UserController.photoProfile);

module.exports = router;
