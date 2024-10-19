import axios, { AxiosResponse, AxiosError } from "axios";

// Define the base URL for your API
const BASE_URL = "http://192.168.1.7:5000/api/";

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (optional)
api.interceptors.request.use(
  (config) => {
    // You can add authorization headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle global errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Define interface for API response
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Generic GET request function
export const get = async <T>(
  url: string,
  params?: object
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.get(url, { params });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

// Generic POST request function
export const post = async <T>(
  url: string,
  data: object
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.post(url, data);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

// Generic PUT request function
export const put = async <T>(
  url: string,
  data: object
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.put(url, data);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

// Generic DELETE request function
export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.delete(url);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export default api;
