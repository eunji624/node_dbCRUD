const express = require("express");
const app = express();
const port = 3001;

const productRouter = require("./routes/products.router.js");


// //mongoDB 에 데이터 넣기__ 연결은 되었는데 데이터를 못넣었슴__ 셋팅
// const { MongoClient } = require("mongodb");
// const url =
//   "mongodb+srv://applecoco:applecoco@cluster0.pqqngbq.mongodb.net/node_lv1";
// const client = new MongoClient(url);
// const dbName = "node_lv1";

//디비 가져오기2
const connect = require("./schemas");
connect();
// let db = connect((c) => c.db("carotMarket"));

//css파일 올리기
app.use(express.static(__dirname + "/public"));

//ejs 사용하기 위해 셋팅
app.set("view engine", "ejs");

//req.body를 사용하기 위해 셋팅
app.use(express.json());

//얘는 뭐하는 애니??????????
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRouter);


//  newPost에 접근하면
// const Product = require("./schemas/products.schema.js")


app.get("/", (req, res) => {
  res.send("연결 성공");
});

//실제로 서버를 실행.
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요");
});


// module.exports = client;
