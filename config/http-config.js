import axios from "axios";

/* ---------------- AXIOS INSTANCE ---------------- */

const client = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */

client.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

client.interceptors.response.use(
  (response) => {
    // handle 204
    if (response.status === 204) return null;

    return response;
  },
  (error) => {
    const status = error?.response?.status;

    //  Handle auth errors
    if (status === 401) {
      clearSession();
    }

    //  Normalize error
    return Promise.reject({
      message: error?.response?.data?.message || "Something went wrong",
      status,
      data: error?.response?.data,
    });
  }
);

/* ---------------- GENERIC API FUNCTION ---------------- */

export const apiCall = async ({ method = "GET", url, data, params, headers = {} }) => {
  try {
    const response = await client({
      method,
      url,
      data,
      params,
      headers,
    });
    return response?.data ?? response;
  } catch (error) {
    throw error;
  }
};

/* ---------------- SESSION HANDLING ---------------- */

const clearSession = () => {
  sessionStorage.clear();

  // optional redirect
  window.location.href = "/login";
};

export default client;
