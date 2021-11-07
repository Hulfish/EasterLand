import $api from "../http/http-axios";

export default function useUsers() {
  async function deleteUser(userId) {
    try {
      const res = await $api.post("/api/delete_user", { userId });
      return { data: res.data, status: res.status };
    } catch (e) {
      console.log(e);
    }
  }
  return { deleteUser };
}
