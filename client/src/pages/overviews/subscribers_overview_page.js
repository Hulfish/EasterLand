import Loader from "../../components/loaders/loader";
import { useState, useEffect } from "react";
import useFollowing from "../../hooks/follow-hook";
import UserNameHeading from "../../components/user_name-heading";
import { useSelector } from "react-redux";

export default function Subscribers_overview_page() {
  const {lang} = useSelector(state => state.lang)
  return (
    <div>
      <h2>  {lang === "RU" ? "Твои подписчики" : "Your subscribers" } </h2>
      <div>   {lang === "RU" ? "Это типа те, кто на тебя подписан" : "people who follow you" } </div>
      <Generate_subscribers_from_API />
    </div>
  );
}

function Generate_subscribers_from_API() {
  const {lang} = useSelector(state => state.lang)
  const { getSubscribers } = useFollowing();
  const [isLoading, setIsLoading] = useState(1);
  const [subs, setSubs] = useState([]);
  const [usernames, setUsernames] = useState({});
  const id = window.location.pathname.split("/")[3];

  useEffect(async () => {
    try {
      const res = await getSubscribers(id);
      setSubs(res.subscribers.container);
      setUsernames(res.usernames);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(0);
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div class = "mt-5" >
        {subs[0] ? (
          subs.map((id) => {
            const name = usernames[id];
            return <SubscriberCard name={name} id={id} />;
          })
        ) : (
          <div> {lang === "RU" ? "Нет подписчиков" : "No subs" }</div>
        )}
      </div>
    </div>
  );
}

function SubscriberCard(props) {
  return (
    <div class="d-flex mb-2">
      <div class="image-round-placeholder-50 mr-10"></div>
      <div>
        <UserNameHeading id={props.id} name={props.name} fontSize={18} />
      </div>
    </div>
  );
}
