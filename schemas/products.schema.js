const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
  productName: {
    type: String, 
    required: true,
  },
  content: {
    type: String, 
    required: true, //값은 무조건 존재해야만 함
  },
  idName: {
    type: String, 
    required: true,
    unique: true, 
  },
  pwd: {
    type: Number, //타입은 넘버임,
    required: true, //값은 무조건 존재해야만 함
    unique: true, //중복값이면 허용 안할거임
  },
  sale: {
    type: String, 
    required: true,
  },
  date: {
    type: Number, 
    required: true, 
    unique: true,
  },
 
},  
{timestamps : true }

);

//"Cart" 라는 모델 명으로 CartSchema 를 사용할거라는 말.
module.exports = mongoose.model("carotMarket", productSchema);
// module.exports = mongoose.model("Cart", cartSchema);
