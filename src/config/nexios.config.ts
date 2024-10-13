
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: "http://localhost:5000/api/",
  credentials: "include",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
nexiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: accessToken,
    };
  }

  return config;
});

export default nexiosInstance;