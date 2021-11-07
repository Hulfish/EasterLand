import Loader from "../../components/loaders/loader";
import { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import useChats from "../../hooks/chats-hook";
import Chat_userCard from "../../components/chat_user-card";

export default function ChatsOverviewpage() {
  const {lang} = useSelector(state => state.lang)
  
  const { getChats } = useChats();
  const [isLoading, setIsLoading] = useState(1);
  const [chats, setChats] = useState([]);
  const [usernames, setUsernames] = useState(null)

  useEffect(async () => {
    try {
      const res = await getChats();
      if (!res.chats) {
        return;
      }
      const {chats, usernames} = res
      // console.log(res)
      setChats(chats);
      setUsernames(usernames)
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(0);
    }
  }, []);

  // console.log(document.getElementById(1)?.offsetHeight)

  return (
    <div class="py-4" id = "1">
      {isLoading ? (
        <Loader />
      ) : (
        <div class="">
          <h3 class="mb-4" > {lang === "RU" ? "Чаты" : "Your chats"} </h3>
          {chats[0] ? (
            <>
            <GenerateChatList_from_API usernames = {usernames} chats={chats} />
            {/* <button onClick = {() => {setChats(prev => Array.prototype.concat(prev, [1]))}} > Add chat </button> */}
            </>
            
          ) : (
            <>
              <div>No chats yet</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function GenerateChatList_from_API(props) {
  const usernames = props.usernames
  return (
    <div>
      <div class=""></div>
      {props.chats.map((chat) => {
        const name = usernames[chat.address]
        return (
          <div>
            <Chat_userCard id = {chat.address} name = {name}/>
          </div>
        );
      })}
    </div>
  );
}
