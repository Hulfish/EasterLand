import $api from "../http/http-axios";

export default function useAuth() {
  async function login(email, password) {
    try {
      const res = await $api.post("/api/login", { password, email });
      // console.log(res)
      
      if (!res.data.tokens) {
        return res
      }
      const accessToken = res.data.tokens.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const userId = res.data.id
      localStorage.setItem("userId", userId)
      return {accessToken};
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    try {
      await $api.get("/api/logout")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
    } catch (e) {}
  }

  async function registration(body) {
    try {
      const { email, password } = body;
      const res = await $api.post("/api/registration", {
        body,
        email,
        password,
      });
      if(res.status !== 201) {
        return {isSuccess: 0}
      }

      // const userId = res.data.user.id
      
      // localStorage.setItem("userId", userId)
      // localStorage.setItem("accessToken", accessToken);
      return {isSuccess: 1}
    } catch (e) {
      console.log(e);
    }
  }

  async function refresh () {
    try {
      const res = await $api.get("/api/refresh");
      // console.log(res)
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (e) {
      console.log(e);
    }
  }

  return { login, registration, logout, refresh };
}
