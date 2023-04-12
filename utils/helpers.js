//truncate
const truncatePost = post => {
    if(post.lenth > 100){
        return post.substring(0, 100) + "...";
    }
    return post;
};

module.exports = {
    truncatePost,
};