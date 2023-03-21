const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async(req, res, next)=>{
    const { fullname, email, password } = req.body;
    //check if field is empty
    if(!fullname || !email || !password){
        return next(appErr('All fields are required'))
    }
    try {
        //check if user exists by email
        const userFound = await User.findOne({ email });
        //throw an error
        if(userFound){
            return next(appErr('User alresady exists'));
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt)
        //register user
        const user = await User.create({
            fullname, 
            email, 
            password: passwordHashed,
        });
        res.json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.json(error);
    }
};

//login
const loginCtrl = async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(appErr('Email and password fields are required'));
    }
    try {
        //check if email exists
        const userFound = await User.findOne({ email });
        if(!userFound) {
            //throw an error
            return next(appErr('Invalid login credentials'));
        }
        //verify password
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if(!isPasswordValid){
        //throw an error
        return next(appErr('Invalid login credentials'));
        }
        //save the user into session
        req.session.userAuth = userFound._id;
        console.log(req.session)
        res.json({
            status: 'success',
            data: userFound,
        });
    } catch (error) {
        res.json(error);
    }
};

//details
const userDetailsCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User details'
        });
    } catch (error) {
        res.json(error);
    }
};

//profile
const profileCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User profile'
        });
    } catch (error) {
        res.json(error);
    }
};

//profile-photo-upload
const uploadProfilePhotoCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User profile image upload'
        });
    } catch (error) {
        res.json(error);
    }
};

//upload-cover-image
const uploadCoverPhotoCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User cover image upload'
        });
    } catch (error) {
        res.json(error);
    }
};

//update password
const updatePasswordCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User password update'
        });
    } catch (error) {
        res.json(error);
    }
};

//update user
const updateUserCtrl = async (req, res) => {
    try {
        res.json({
            status: 'success',
            user: 'User update'
        });
    } catch (error) {
        res.json(error); 
    }
};

//logout
const logoutCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User logout'
        });
    } catch (error) {
        res.json(error);
    }
};


module.exports = {
    registerCtrl,
    loginCtrl,
    userDetailsCtrl,
    profileCtrl,
    uploadProfilePhotoCtrl,
    uploadCoverPhotoCtrl,
    updatePasswordCtrl,
    updateUserCtrl,
    logoutCtrl,
}