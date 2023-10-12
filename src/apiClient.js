import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export default apiClient;
