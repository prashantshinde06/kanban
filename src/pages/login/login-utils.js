import * as Yup from "yup";

// INITIAL VALUES
export const initialValues = {
  email: "",
  password: "",
};

// VALIDATION SCHEMA
export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password required"),
});

// API CALL
export const loginApi = async (payload) => {
  // Replace with real API
  // Example using fetch:

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw "Invalid credentials";
  }

  return await res.json();
};

// SESSION MANAGEMENT
export const setSession = (data) => {
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data.user));
  sessionStorage.setItem("isLoggedIn", "true");
};

export const clearSession = () => {
  sessionStorage.clear();
};
