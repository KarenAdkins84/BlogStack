const express = require('express');
const multer = require('multer');
const storage = require('../../config/coudinary');
const { 
    registerCtrl, 
    loginCtrl, 
    userDetailsCtrl, 
    profileCtrl, 
    uploadProfilePhotoCtrl, 
    uploadCoverPhotoCtrl, 
    updatePasswordCtrl, 
    updateUserCtrl,
    logoutCtrl
    } = require('../../controllers/users/users');

const protected = require('../../middlewares/protected')
const userRoutes = express.Router();
//instance of multer
const upload = multer({ storage });

//render views routes//

//rendering forms
//login form
userRoutes.get('/login', (req, res) => {
    res.render('users/login');
});
//register form
userRoutes.get('/register', (req, res) => {
    res.render('users/register');
});
//profile template
userRoutes.get('/profile-page', (req, res) => {
    res.render('users/profile');
});
//upload profile photo
userRoutes.get('/upload-profile-photo-form', (req, res) => {
    res.render('users/uploadProfilePhoto');
});
//upload cover photo
userRoutes.get('/upload-cover-photo-form', (req, res) => {
    res.render('users/uploadCoverPhoto');
});
//update user form
userRoutes.get('/update-user-form', (req, res) => {
    res.render('users/updateUser');
});

//api routes//
//POST/api/v1/users/register
userRoutes.post('/register', upload.single('profile'), registerCtrl);

//POST/api/v1/users/login
userRoutes.post('/login', loginCtrl);

//GET/api/v1/users/profile
userRoutes.get('/profile', protected, profileCtrl);

//GET/api/v1/users/:id
userRoutes.get('/:id', userDetailsCtrl);

//PUT/api/v1/users/profile-photo-upload/:id
userRoutes.put(
    '/profile-photo-upload/',
    protected, 
    upload.single('profile'), 
    uploadProfilePhotoCtrl
    );

//PUT/api/v1/users/cover-photo-upload/:id
userRoutes.put(
    '/cover-photo-upload/',
    protected,
    upload.single('cover'), 
    uploadCoverPhotoCtrl
    );

//PUT/api/v1/users/update-password/:id
userRoutes.put('/update-password/:id', updatePasswordCtrl);

//PUT/api/v1/users/update/:id
userRoutes.put('/update/:id', updateUserCtrl);

//GET/api/v1/users/logout
userRoutes.get('/logout', logoutCtrl);

module.exports = userRoutes;