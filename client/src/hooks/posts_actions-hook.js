import $api from "../http/http-axios";

export default function usePostActions(id) {
  async function likePost(id) {
    try {
      const res = await $api.post("/api/userData/userPost_action/like", {
        postId: id,
      });
      if (res.status === 201) {
        return 1;
      }
      return 0;
    } catch (e) {
      console.log(e);
    }
  }

  async function commentPost(id, comment_text) {
    try {
      const res = await $api.post("api/userData/userPost_action/comment", {
        postId: id,
        text: comment_text,
      });
      // console.log(res)
      return res.data
      
    } catch (e) {
      console.log(e);
    }
  }

  return { likePost, commentPost };
}
