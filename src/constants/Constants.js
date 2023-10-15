const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const ENDPOINTS = {
  LOGIN: "/auth/login",
  CATEGORIES_WITH_LIMIT: "/categories?limit=",
  GET_PROFILE: "/auth/profile",
  GET_PRODUCTS: "/products",
  ADD_UPDATE_DELETE_PRODUCT: "/products/",
  UPLOAD_FILE: "/files/upload",
};

const KEYS = {
  GET_PRODUCTS: "getProducts",
  GET_PROFILE: "getProfile",
  GET_CATEGORIES: "getCategories",
};

export { ACCESS_TOKEN, REFRESH_TOKEN, ENDPOINTS, KEYS };
