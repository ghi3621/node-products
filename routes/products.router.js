import express from "express";

// Express.js의 라우터를 생성합니다.
const router = express.Router();

// 1. mongoose,  Products 모델 가져오기
import mongoose from "mongoose";
import Products from "../schemas/products.schema.js";

router.post("/products", async (req, res) => {
  // 1. 클라이언트로 부터 받아온 value 데이터를 가져온다.
  const { productsId, title, content, author, password } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ errorMessage: "상품명 형식이 올바르지 않습니다." });
  } else if (!content) {
    return res
      .status(400)
      .json({ errorMessage: "작성 내용 형식이 올바르지 않습니다." });
  } else if (!author) {
    return res
      .status(400)
      .json({ errorMessage: "작성자명 형식이 올바르지 않습니다." });
  } else if (!password) {
    return res
      .status(400)
      .json({ errorMessage: "비밀번호가 올바르지 않습니다." });
  }

  const products = await Products.find({ productsId: productsId }).exec();

  if (products.length) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  const createdProducts = await Products.create({
    productsId: productsId,
    title: title,
    content: content,
    author: author,
    password: password,
  });

  // 2. 해당하면 마지막 order 데이터를 조회한다.
  //findOne은 한개의 데이터만 조회한다.
  // sort -> 어떤 컬럼(필드)를? 정렬해?
  // const productMaxOrder = await Products.findOne().sort("-status").exec(); // (-) 내림차순

  // 3. 만약 존재 (?)한다면 현재 해야 할 일을 +1 하고,
  // order 데이터가 존재하지 않는다면, 1로 할당
  // const createdAt = productMaxOrder
  //   ? productMaxOrder.status + "for_sale"
  //   : "sold_out"; //과제에 status

  // 4. 해야 할 일 등록
  // const products = new Products({ title, status, content, author, password }); // instance를 만든거임.
  // await products.save(); //실제 DB에 저장한다.

  // 5. 해야 할 일을 클라이언트에게 반환한다.
  return res.status(201).json({ products: createdProducts });
});

export default router;
