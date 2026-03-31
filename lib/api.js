import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// SEND OTP
export const sentOtp = async (mobile) => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  const res = await API.post("/auth/send-otp", formData);
  return res.data;
};

// VERIFY OTP
export const verifyOtp = async (mobile, otp) => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("otp", otp);

  const res = await API.post("/auth/verify-otp", formData);
  return res.data;
};

// CREATE PROFILE
export const createProfile = async (data) => {
  const formData = new FormData();
  formData.append("mobile", data.mobile);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("qualification", data.qualification);
  formData.append("profile_image", data.profile_image);

  const res = await API.post("/auth/create-profile", formData);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  sessionStorage.removeItem("token");
  return res.data;
};
