import Loader from "../components/loaders/loader";
import { useState, useEffect } from "react";
import useChats from "../hooks/chats-hook";
import UserNameHeading from "../components/user_name-heading";
import { useSelector } from "react-redux";

export default function ChatDirectpage() {
  const { getChats } = useChats();
  const [isLoading, setIsLoading] = useState(1);
  // const [chats, setChats] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(async () => {
    try {
      // const res = await getChats();
      // if (!res.chats) {
      //   setIsLoading(0);
      // }
      setIsLoading(0);
    } catch (e) {}
  }, []);

  return (
    <div class="py-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Chat_direct_frame setChat={setChat} chat={chat} />
        </div>
      )}
    </div>
  );
}

function Chat_direct_frame(props) {
  const { sendMessage } = useChats();

  const {height} = useSelector(state => state.chatFrame)

  // console.log("date: ", new Date())

  function _sendMessage(message) {
    
    props.setChat((prev) =>
      Array.prototype.concat(prev, {
        text: message,
        user: localStorage.getItem("userId"),
        send_time: JSON.stringify(new Date())
      }),
    );
    // console.log(message);
    sendMessage(message);
  }

  // console.log(currentHeight);
  return (
    <div
      class=" flex-column justify-content-between"
      style={{ height: height + "px", marginTop: "-46px", marginBottom: "5px" }}
    >
      <div>
        <Chat_direct_header />
        <Chat_frame setChat={props.setChat} chat={props.chat} />
      </div>
      <div>
        <Message_Input sendMessage={_sendMessage} />
      </div>
    </div>
  );
}

function Chat_frame(props) {
  const {height} = useSelector(state => state.chatFrame)
  const { getDirectChat } = useChats();

  const [isLoading, setIsLoading] = useState(1);

  useEffect(async () => {
    try {
      const res = await getDirectChat();
      // console.log(res.messages);
      const { messages } = res;
      props.setChat(messages);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(0);
    }
  }, []);

  return (
    <div class="overflow-auto mb-2" style={{ height: (height - 80) + "px"}}>
      {props.chat ? (
        props.chat.map((el) => {
          let isYour = 0;
          if (el.user === localStorage.getItem("userId")) {
            isYour = 1;
          }
          return (
            <Message
              isYour={isYour}
              send_time={el.send_time}
              message={el._text || el.text}
            />
          );
        })
      ) : (
        <div>{"No messages"}</div>
      )}
    </div>
  );
}

function Chat_direct_header(props) {
  const { getChatParticipantName, getChatting } = useChats();
  const [fullname, setFullname] = useState();
  const [isLoading, setIsLoading] = useState(1);

  useEffect(async () => {
    try {
      const res = await getChatParticipantName();
      if (res.fullname) {
        setFullname(res.fullname);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(0);
    }
  }, []);

  return (
    <div class="h-80 d-flex pt-10 border-bottom">
      <div class="image-round-placeholder-60"></div>
      <div class="mx-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div class="f-si-20">
              <b>
                {" "}
                <UserNameHeading
                  name={fullname}
                  id={getChatting()}
                  fontSize={20}
                />{" "}
              </b>
            </div>
            <div> Status of corresponder</div>
          </>
        )}
      </div>
    </div>
  );
}

function Message_Input(props) {
  const [text, setText] = useState("");

  function onSendMessage() {
    if (!text.trim()) {
      return;
    }
    props.sendMessage(text.trim());
    setText("");
  }

  return (
    <div class="h-60">
      <div class="d-flex w-100" url="">
        <form class="w-100 pr-10">
          <textarea
            class="form-control"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </form>
        <button class="btn" onClick={onSendMessage}>
          <MessageArrow_send />
        </button>
      </div>
    </div>
  );
}

function Message(props) {
  return (
    <div class={`d-flex ${props.isYour ? " justify-content-end" : ""}`}>
      <div>
        <div
          class="bg-light-gray mt-2"
          style={{
            maxWidth: "400px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "4px",
          }}
        > <div>
          {props.message}
        </div>
          
          <div class={`f-si-10 d-flex ${props.isYour ? " justify-content-end" : ""}`}>{TimeDecoder(props.send_time)}</div>
        </div>
      </div>
    </div>
  );
}

function TimeDecoder (send_time) {
  // console.log("send_time:", send_time)
  const [ H, M, S] = send_time.split("T")[1].split(".")[0].split(":")
  return [H, ":", M]
  return (
    <div> Time </div>
  )
}

function MessageArrow_send() {
  return (
    <div cstyle={{ height: "22px", width: "36px" }}>
      <svg
        width="36"
        height="22"
        viewBox="0 0 339 207"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M339 103.5L84.75 193.133V13.866L339 103.5Z" fill="#848484" />
        <path d="M154 103.5L84.25 193.133V13.866L154 103.5Z" fill="#ffffff" />
      </svg>
    </div>
  );
}
