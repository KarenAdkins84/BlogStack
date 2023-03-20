//create comment
const createCommentCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment created'
        });
    } catch (error) {
        res.json(error);
    }
};

//get all
const fetchCommentsCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment list'
        });
    } catch (error) {
        res.json(error);
    }
};

//get by id
const singleCommentCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment details'
        });
    } catch (error) {
        res.json(error);
    }
};

//delete
const deleteCommentCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment deleted'
        });
    } catch (error) {
        res.json(error);
    }
};

//update
const updateCommentCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment updated'
        });
    } catch (error) {
        res.json(error);
    }
};

module.exports = { createCommentCtrl, 
    fetchCommentsCtrl, 
    singleCommentCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
}