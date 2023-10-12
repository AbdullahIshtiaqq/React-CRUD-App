import apiClient from "./apiClient";

async function authenticate(data) {
  try {
    const response = await apiClient.post("/auth/login", data);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getCategories(limit) {
  try {
    const response = await apiClient.get(
      "/categories?limit=" + limit.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function getUserProfile(token) {
  try {
    const response = await apiClient.get("/auth/profile", {
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
    const response = await apiClient.get("/products");
    return response;
  } catch (error) {
    throw error;
  }
}

async function addProduct(product) {
  try {
    const response = await apiClient.post("/products/", product);
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const response = await apiClient.delete("/products/" + id);
    return response;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ id, data }) {
  try {
    const response = await apiClient.put("/products/" + id, data);
    return response;
  } catch (error) {
    throw error;
  }
}

async function uploadFile({ file, setProgress }) {
  try {
    const response = await apiClient.post(
      "/files/upload",
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
