import express from "express";
const router = express.Router();

import Products from "../schemas/products.schema.js";

// 1. 상품 작성 (POST)
router.post("/products", async (req, res) => {
  try {
    const { title, content, author, password } = req.body;

    if (!req.body) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const newProducts = new Products({
      title,
      content,
      author,
      password,
    });

    await newProducts.save();
    res.status(201).json({ errorMessage: "판매 상품을 등록하였습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "예기치 못한 에러가 발생하였습니다." });
  }
});

// 2. 상품 목록 조회 (GET)
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find()
      .select("_id title author status createdAt")
      .sort({ createdAt: -1 })
      .exec();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "예기치 못한 에러가 발생하였습니다." });
  }
});

// 3. 상품 상세 조회 (GET) :params 쓰기!!
router.get("/products/:productsId", async (req, res) => {
  try {
    const products = await Products.findById(req.params.productsId).select(
      "_id title author status createdAt"
    );

    if (!products) {
      return res
        .status(404)
        .json({ errorMessage: "상품 조회에 실패하였습니다." });
    }
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "예기치 못한 에러가 발생하였습니다." });
  }
});

// 4,  상품 수정 (PUT)
router.delete("/products/:productsId", async (req, res) => {
  try {
    const { title, content, password, status } = req.body;
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const products = await Products.findById(req.params.productsId);

    if (!products) {
      return res
        .status(404)
        .json({ errorMessage: "상품 조회에 실패하였습니다." });
    }

    if (password !== products.password) {
      return res
        .status(401)
        .json({ errorMessage: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    products.title = title;
    products.content = content;
    products.status = status;

    await products.save();
    res.json({ message: "상품 정보를 수정하였습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "예기치 못한 에러가 발생하였습니다." });
  }
});

// 5. 상품 삭제 (DELETE)
router.put("/products/:productsId", async (req, res) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const productsId = req.params.productsId;
    const { password } = req.body;
    const products = await Products.findById(req.params.productsId);

    if (!products) {
      return res
        .status(404)
        .json({ errorMessage: "상품 조회에 실패하였습니다." });
    }

    if (password !== products.password) {
      return res
        .status(401)
        .json({ errorMessage: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    await products.deleteOne({ id: productsId });
    res.json({ message: "상품을 삭제하였습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "예기치 못한 에러가 발생하였습니다." });
  }
});

export default router;
