import $api from "../http/http-axios";

export default function useChats() {
  async function getChats(userId) {
    try {
      const res = await $api.get("/api/getChats");
      // console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function getDirectChat() {
    try {
      const chatting_with = getChatting();
      const res = await $api.post("/api/get_direct_chat", { chatting_with });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMessage(message) {
    const chatting_with = getChatting();
    const res = await $api.post("/api/send_message/" + chatting_with, {
      message,
    });
  }

  async function initializeChat(to) {
    try {
      const res = await $api.post("/api/initialize_chat");
    } catch (e) {
      console.log(e);
    }
  }

  async function startChatting (id) {
    setChatting(id)
    window.location.href = "/chats/direct"
  }

  function setChatting(id) {
    sessionStorage.setItem("Chatting_with", id);
  }

  function getChatting() {
    return sessionStorage.getItem("Chatting_with");
  }

  function clearChatting() {
    sessionStorage.removeItem("Chatting_with");
  }

  async function getChatParticipantName() {
    const chatting_with = getChatting();
    const res = await $api.post("/api/get_user_name", {
      userId: chatting_with,
    });
    return res.data;
  }

  return {
    getChats,
    getDirectChat,
    setChatting,
    getChatting,
    clearChatting,
    getChatParticipantName,
    sendMessage,
    startChatting,
  };
}
