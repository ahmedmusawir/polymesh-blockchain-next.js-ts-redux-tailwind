import axios from 'axios';
import apiClient from "./apiClient";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export async function signIn({ email, password }: { email: string, password: string }) {
  const res = await axios.post(`${strapiUrl}/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}

const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post("/api/login", {
      identifier: email,
      password,
    });

    const data = response.data;

    if (data.user) {
      return data;
    } else {
      throw new Error("Login failed");
    }
  },

  async logout() {
    await apiClient.post("/api/logout");
  },

  async checkAuthStatus() {
    try {
      const response = await apiClient.get("/api/current-user");
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Not authenticated");
    } catch (error) {
      console.error("Error checking auth status:", error);
      throw error;
    }
  },

  async register(username: string, email: string, password: string) {
    const response = await apiClient.post("/auth/local/register", {
      username,
      email,
      password,
    });
    return response.data;
  },
};

export default authService;
