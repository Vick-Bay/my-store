import API from "../api/axios.config";
class ReviewService {
  getReviews(user_id, product_id) {
    return API.get(`/products/${user_id}/reviews`, {
      params: {
        product_id,
        user_id,
      },
    });
  }
  addReview(user_id, product_id, content) {
    console.log(user_id, product_id, content);
    return API.post(`/products/${user_id}/reviews`, {
      product_id,
      content,
    });
  }
}

export default new ReviewService();
