import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  productsId: {
    type: Number, // 상품의 고유 ID를 나타냅니다.
    required: true, // 필수 항목입니다.
    unique: true, // 중복된 값을 허용하지 않습니다.
  },
  title: {
    type: String,
    required: true, // value 필드는 필수 요소입니다.
  },
  content: {
    type: String,
    required: true, // value 필드는 필수 요소입니다.
  },
  author: {
    type: String,
    required: true, // value 필드는 필수 요소입니다.
  },
  password: {
    type: String,
    required: true, // value 필드는 필수 요소입니다.
  },
  status: {
    type: String,
    required: true, // value 필드는 필수 요소입니다.
  },
  createdAt: {
    type: Date, // doneAt 필드는 Date 타입을 가집니다.
    required: false, // doneAt 필드는 필수 요소가 아닙니다.
  },
});

// 프론트엔드 서빙을 위한 코드입니다. 모르셔도 괜찮아요!
// ProductsSchema.virtual('productsId').get(function () {
//   return this._id.toHexString();
// });
// ProductsSchemaSchema.set('toJSON', {
//   virtuals: true,
// });

// TodoSchema를 바탕으로 Todo모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("Products", ProductsSchema);
