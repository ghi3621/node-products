import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    productsId: {
      type: Number, // 상품의 고유 ID를 나타냅니다.
      required: true, // 필수 항목입니다.
      unique: true, // 중복된 값을 허용하지 않습니다.
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["FOR_SALE", "SOLD_OUT"],
      default: "FOR_SALE",
    },
  },
  { timestamps: true }
  // createdAt: {
  //   type: Date,
  //   required: false,
  // },
);

// 프론트엔드 서빙을 위한 코드입니다. 모르셔도 괜찮아요!
// ProductsSchema.virtual('productsId').get(function () {
//   return this._id.toHexString();
// });
// ProductsSchemaSchema.set('toJSON', {
//   virtuals: true,
// });

export default mongoose.model("Products", ProductsSchema);
