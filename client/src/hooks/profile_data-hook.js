import $api from "../http/http-axios";

export default function useProfileData() {
  async function getProfile_data(userId) {
    try {
      if (!userId) {
        return;
      }
      const res = await $api.get("/api/get_profile_data/" + userId);
      const name = res.data.userData.name;
      const surname = res.data.userData.surname;
      const fullname = name + " " + surname;
      // console.log(res);
      return { userData: res.data, fullname };
    } catch (e) {
      console.log(e);
    }
  }

  async function getProfile_posts(userId) {
    try {
      const res = await $api.get("/api/get_profile_posts/" + userId);
      // console.log(res)
      return res.data
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserAdditionalInfo(id) {
    try {
      if (!id) {
        return 
      }
      const userId = id
      
      const res = await $api.get(
        "/api/userData/getUserAdditionalInfo/" + userId,
      );
      // console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function updateAdditionInfo(body) {
    try {
      const res = await $api.post("/api/userData/updateUserAdditionalInfo", {
        body,
      });
      // console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
  return {
    getUserAdditionalInfo,
    updateAdditionInfo,
    getProfile_data,
    getProfile_posts,
  };
}
