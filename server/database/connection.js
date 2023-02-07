const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // mongodb connection string
        mongoose.set("strictQuery", false);
        const con = await mongoose.connect(process.env.MONGO_URI, {});

        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;