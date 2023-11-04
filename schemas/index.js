require("dotenv").config();

const mongoose = require("mongoose");

const {DB_USER, DB_PW, DB_NAME} = process.env;


const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PW}@cluster0.pqqngbq.mongodb.net/${DB_NAME}`,
      {autoIndex: false}
    )
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

// export default connect;
module.exports = connect;
