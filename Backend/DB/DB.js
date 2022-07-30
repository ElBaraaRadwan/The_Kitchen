const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((result) => console.log("DB connected"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;