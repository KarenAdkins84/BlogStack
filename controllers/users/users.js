const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async(req, res, next)=>{
    const { fullname, email, password } = req.body;
    console.log(req.body);
    //check if field is empty
    if(!fullname || !email || !password){
        return res.render('users/register',{
            error: "All fields are required",
        });
    }
    try {
        //check if user exists by email
        const userFound = await User.findOne({ email });
        //throw an error
        if(userFound){
            return res.render('users/register',{
                error: "Email already in use",
            });
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
        //redirect
        res.redirect('/api/v1/users/profile-page');
    } catch (error) {
        res.json(error);
    }
};

//login
const loginCtrl = async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.render('users/login',{
            error: "All fields are required",
        });
    }
    try {
        //check if email exists
        const userFound = await User.findOne({ email });
        if(!userFound) {
            //throw an error
            return res.render('users/login',{
                error: "Invalid login credentials",
            });
        }
        //verify password
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if(!isPasswordValid){
        //throw an error
        return res.render('users/login',{
            error: "Invalid login credentials",
        });
        }
        //save the user into session
        req.session.userAuth = userFound._id;
        console.log(req.session)
        res.redirect('/api/v1/users/profile-page');
    } catch (error) {
        res.json(error);
    }
};

//details
const userDetailsCtrl = async(req, res)=>{
    try {
        //get userId from params
        const userId = req.params.id;
        // find the user
        const user = await User.findById(userId);
        res.json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.json(error);
    }
};

//profile
const profileCtrl = async(req, res)=>{
    try {
        //get the logged in user
        const userId = req.session.userAuth;
        //find the user
        const user = await User.findById(userId)
        .populate('posts')
        .populate('comments');
        res.render('users/profile', { user });
        res.json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.json(error);
    }
};

//profile-photo-upload
const uploadProfilePhotoCtrl = async(req, res, next)=>{
    console.log(req.file.path)
    try {
        //check if file exists
        if(!req.file){
            res.render('users/uploadProfilePhoto', {
                error: 'Please upload image',
            });
        }
        //find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        //check if user found
        if(!userFound){
            return res.render('users/uploadProfilePhoto', {
                error: 'User not found',
            });
        }
        //update profile photo
        const userUpdated = await User.findByIdAndUpdate(
            userId, 
            {
                profileImage: req.file.path,
            },
            {
                new: true,
            }
        );
        //redirect
        res.redirect('api/v1/users/profile-page')
    } catch (error) {
        return res.render('users/uploadProfilePhoto', {
            error: error.message,
        });
    }
};

//upload-cover-image
const uploadCoverPhotoCtrl = async(req, res)=>{
    try {
        //find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        //check if user found
        if(!userFound){
            return next(appErr('User not found', 403))
        }
        //update cover photo
        await User.findByIdAndUpdate(
            userId, 
            {
                coverImage: req.file.path,
            },
            {
                new: true,
            }
        );
        res.json({
            status: 'success',
            data: 'You have successfully updated your cover photo',
        });
    } catch (error) {
        res.json(error);
        next(appErr(error.message));
    }
};

//update password
const updatePasswordCtrl = async(req, res, next)=>{
    //destructore password to update
    const { password } = req.body;
    try {
        //check if user is updating the password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            //update user
            await User.findByIdAndUpdate(
                req.params.id, 
                {
                    password: passwordHashed,
                },
                {
                    new: true,
                }
            );
            res.json({
                status: 'success',
                user: "Password has been changed successfully",
            });
        }
    } catch (error) {
        return next(appErr('Please provide password field'));
    }
};

//update user
const updateUserCtrl = async (req, res) => {
    
    const {fullname, email, password} = req.body
    try {
        //check that email has not been used before
        if(email){
            const emailUsed = await User.findOne({ email });
            if(emailUsed){
                return next(appErr('Email is already in use', 400));
            }
        }
        //update user
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                fullname,
                email,
            },
            {
                new: true,
            }
        );
        res.json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        return next(appErr(error.message)); 
    }
};

//logout
const logoutCtrl = async(req, res)=>{
    //destroy session
    req.session.destroy(()=>{
    res.redirect('/api/v1/users/login');
    });
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