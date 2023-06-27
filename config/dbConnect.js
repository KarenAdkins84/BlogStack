const mongoose = require('mongoose');

const dbConnect = async () => {
    console.log(process.env);
    try {
        await mongoose.connect(
            process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/blog-stack'
            );
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log('DB Connection Failed', error.message);
    }
};

dbConnect();