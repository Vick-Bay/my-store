import API from "../api/axios.config";

class ProductService {
  getProducts(page, limit) {
    return API.get(`/products/?page=${page}`);
  }
  getProduct(id) {
    return API.get(`/products/${id}`);
  }
  getProductByName(name) {
    return API.get(`/products/${name}`);
  }
  updateProductQuantity(quantity, product_id) {
    return API.put(`/products/${product_id}`, {
      quantity,
    });
  }
}

export default new ProductService();
