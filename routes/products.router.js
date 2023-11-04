const express = require("express");
const router = express.Router();

const carotMarket = require("../schemas/products.schema.js");

//제이슨 타입 변환 위해 셋팅
router.use(express.json());

//데이터 상세 조회하기.
router.get("/products/:_id", async(req, res) => {
  const { _id } = req.params;
  let data = await carotMarket.find({_id: _id});
  await res.json(data)
});

//products 엥서 데이터베이스 입력 받으면 서버 거쳐서 디비에 저장.
router.post("/products", async (req, res) => {
  console.log(req.body.productName)
  try {
    const newData = {
      productName : req.body.productName,
      content : req.body.content,
      idName : req.body.idName,
      pwd : req.body.pwd,
      sale : "FOR_SALE",
      date : Date.now(),
    };
    // console.log(newData)
    await carotMarket.create(newData);
    return res.json({ message : "판매 상품을 등록하였습니다." });
    // router.redirect("/list");
  } catch (err) {
    return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }
});

//데이터베이스의 내용들 보여주기
router.get("/products", async (req, res) => {
  try{
    let data = await carotMarket.find({});

    data = data.sort((a, b) => b.date - a.date);
    
    return res.send(data)
    // res.render("./list.ejs", { posts : data });
  }catch (err) {
    return res.json({errorMessage: '데이터 불러오는데 실패'})
  }
});

//

//modification _ 파람스 입력 없을 경우1
router.put("/products/", (req, res) => {
  res.status(400).json({message : "데이터 형식이 올바르지 않습니다."})
})

//modification _ 파람스 입력 없을 경우2
router.put("/products", (req, res) => {
  res.status(400).json({message : "데이터 형식이 올바르지 않습니다."})
})

//modification _ body가 없을 경우
router.put("/products/:_id", async (req, res)=>{
  const allData = await carotMarket.find({});
  const { _id } = req.params;

  const getModiData = {
    productName : req.body.productName,
    content : req.body.content,
    pwd : req.body.pwd,
    sale : req.body.sale
  }
  
  try{
    //req.body에 데이터가 4개 중 하나라도 없다면?-- 입력데이터 개수
    const resultBody = Object.values(getModiData).filter((data)=>{
      return data
    })

    //수정하려고 하는 데이터 아이디 번호 있니? 
    const resultId = allData.filter((product)=> {
      console.log(product._id.toString())
      return product._id.toString() === _id;
    })

    //상품 비밀번호 일치하니?
    const resultPwd = allData.filter((product)=> {
      return product.pwd === getModiData.pwd;
    })

    if(resultBody.length !== Object.values(getModiData).length ){
      return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."})
    }else if(!resultId.length){
      return res.status(404).json({ "message" : "상품 조회에 실패하였습니다."})
    }else if(!resultPwd.length){
      return res.status(401).json({ "message" : "상품을 수정할 권한이 존재하지 않습니다."})
    }else if(resultId.length && resultPwd.length){
      await carotMarket.updateOne(getModiData);
      return res.json({"message": "상품 정보를 수정하였습니다."})
    }
  }catch (err){

  }

})


//deletion

//deletion _ 파람스 입력 없을 경우1
router.delete("/products/", (req, res) => {
  res.status(400).json({ "message" : "데이터 형식이 올바르지 않습니다."})
})

//deletion _ 파람스 입력 없을 경우2
router.delete("/products", (req, res) => {
  res.status(400).json({ "message" : "데이터 형식이 올바르지 않습니다."})
})

router.delete("/products/:_id", async (req, res)=>{
  try{
    const { _id } = req.params;
    const { pwd } = req.body;
    const deleteData = await carotMarket.find({ _id });

    if(deleteData[0].pwd === pwd){
      await carotMarket.deleteOne(deleteData[0]);
      return res.json({ "message": "상품을 삭제하였습니다." });
    }else if(deleteData[0].pwd !== pwd) {
      return res.status(401).json({ "message": "상품을 삭제할 권한이 존재하지 않습니다." });
    }
  }catch (err) {
    console.log(err)
    return res.status(404).json({ "message": "상품 조회에 실패하였습니다." });
  }
})

module.exports = router;
