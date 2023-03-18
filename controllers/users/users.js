//register
const registerCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User registered'
        });
    } catch (error) {
        res.json(error);
    }
};

//login
const loginCtrl = async(req, res)=>{
    try {
        res.json({
            status: 'success',
            user: 'User login'
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