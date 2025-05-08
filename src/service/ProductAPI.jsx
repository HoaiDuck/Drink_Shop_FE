import { instance } from "@/util";

const ProductAPI = {
  getAllProducts() {
    const url = "products";
    return instance.get(url);
  },
  createProduct(data) {
    const url = "products";
    return instance.post(url, data);
  },
  updateProduct(data) {
    const url = "products";
    return instance.put(url, data);
  },
  deleteProductById(id) {
    const url = `products/${id}`;
    return instance.delete(url, id);
  },
  getProductById(id) {
    const url = "products/{id}";
    return instance.get(url, id);
  },
  searchProduct({ keyword = "", minimumPrice, maxPrice, type }) {
    const params = new URLSearchParams();

    params.append("keyword", keyword); // luôn có thể là chuỗi rỗng

    if (minimumPrice !== undefined && minimumPrice !== "") {
      params.append("minimumPrice", minimumPrice);
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      params.append("maxPrice", maxPrice);
    }

    if (type) {
      params.append("type", type);
    }

    return instance.get(`/products/search/?${params.toString()}`);
  },
};
export default ProductAPI;
