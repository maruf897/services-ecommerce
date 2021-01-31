const mongoose = require("mongoose");

const usersDB = async () => {
  try {
    const conn = await mongoose.connect(
        'mongodb+srv://maruf:abcd@cluster0.qqrly.mongodb.net/users?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MONGOOSE CONCT");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = usersDB;
