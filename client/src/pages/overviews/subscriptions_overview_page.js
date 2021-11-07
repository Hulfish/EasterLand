import Loader from "../../components/loaders/loader";
import { useState, useEffect } from "react";
import useFollowing from "../../hooks/follow-hook";
import UserNameHeading from "../../components/user_name-heading";
import { useSelector } from "react-redux";

export default function Subscriptions_overview_page() {
  const { lang } = useSelector((state) => state.lang);
  return (
    <div>
      <h2> {lang === "RU" ? "Твои подписки" : "Your subscriptions"} </h2>
      <div>
        {" "}
        {lang === "RU"
          ? "Это типа те, на кого ты сам подписался, тебя об этом никто не просил, ну то есть ты сам взял и нажал эту чертову кнопку"
          : "people you follow "}{" "}
      </div>
      <Generate_subscriptions_from_API />
    </div>
  );
}

function Generate_subscriptions_from_API() {
  const { getSubscriptions } = useFollowing();
  const [isLoading, setIsLoading] = useState(1);
  const [subscriptions, setSubscriptions] = useState([]);
  const [usernames, setUsernames] = useState({});
  const id = window.location.pathname.split("/")[3];

  useEffect(async () => {
    try {
      const res = await getSubscriptions(id);
      setSubscriptions(res.subscriptions.container);
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
      <div class="mt-5">
        {subscriptions[0] ? (
          subscriptions.map((id) => {
            const name = usernames[id];
            return <SubscriptionCard name={name} id={id} />;
          })
        ) : (
          <div> No subs </div>
        )}
      </div>
    </div>
  );
}

function SubscriptionCard(props) {
  return (
    <div class="d-flex mb-2">
      <div class="image-round-placeholder-50 mr-10"></div>
      <div>
        <UserNameHeading id={props.id} name={props.name} fontSize={18} />
      </div>
    </div>
  );
}
