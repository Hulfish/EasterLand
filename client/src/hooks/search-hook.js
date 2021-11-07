import $api from "../http/http-axios";

export default function useSearch() {
  async function search(body) {
    try {
      const res = await $api.post("/api/search", body);
      // console.log(body)
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  return { search };
}
