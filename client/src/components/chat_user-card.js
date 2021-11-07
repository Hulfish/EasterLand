import { useEffect } from "react";
import useChats from "../hooks/chats-hook"

export default function Chat_userCard(props) {

  const {startChatting} = useChats()

  function startChat () {
    startChatting(props.id)
  }

  useEffect(() => {
    console.log("update")
  })

  return (
    <div class="height-70  border-bottom card" onClick = {startChat}>
      <div class="d-flex ">
        <div class="image-round-placeholder-50 ml-10 mr-10 mt-10"> </div>
        <div class="mt-10 h-100 d-flex-column justify-content-between ">
          <div class="f-si-16"> {props.name} </div>
          
        </div>
      </div>
    </div>
  );
}
