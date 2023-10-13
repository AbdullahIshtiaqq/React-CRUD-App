import apiClient from "./ApiClient";
import { ENDPOINTS } from "../constants/Constants";

async function authenticate(data) {
  try {
    const response = await apiClient.post(ENDPOINTS.LOGIN, data);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getCategories(limit) {
  try {
    const response = await apiClient.get(
      ENDPOINTS.CATEGORIES_WITH_LIMIT + limit.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function getUserProfile(token) {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_PROFILE, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getProducts() {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_PRODUCTS);
    return response;
  } catch (error) {
    throw error;
  }
}

async function addProduct(product) {
  try {
    const response = await apiClient.post(
      ENDPOINTS.ADD_UPDATE_DELETE_PRODUCT,
      product
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const response = await apiClient.delete(
      ENDPOINTS.ADD_UPDATE_DELETE_PRODUCT + id
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ id, data }) {
  try {
    const response = await apiClient.put(
      ENDPOINTS.ADD_UPDATE_DELETE_PRODUCT + id,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function uploadFile({ file, setProgress }) {
  try {
    const response = await apiClient.post(
      ENDPOINTS.UPLOAD_FILE,
      { file: file },
      {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);

          if (percent <= 100) {
            setProgress(percent);
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export {
  authenticate,
  getCategories,
  getUserProfile,
  getProducts,
  deleteProduct,
  uploadFile,
  addProduct,
  updateProduct,
};
