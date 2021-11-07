import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loaders/loader";
import Post from "../components/post_parts/post";
import PostCreator from "../components/post_creator";
import AdditionalUserInfo from "../components/user_profile_parts/AdditionalUserInfo";
import { MobileContext } from "../context/mobile_context";
import useChats from "../hooks/chats-hook";
import useFollowing from "../hooks/follow-hook";
import useGuesting from "../hooks/guesting-hook";
import useProfileData from "../hooks/profile_data-hook";
import useRouting from "../hooks/routing-hook";
import useUserData from "../hooks/user_data-hook";
import { setIsHomeAction } from "../store/navigation_reducer";

export default function User_profile_page(props) {
  
  const dispatch = useDispatch()
  const { getSubscriptions } = useFollowing();
  const { getProfile_data, getProfile_posts } = useProfileData();
  const { getUserPosts, getUserData, createUserPost } = useUserData();
  const { getVisited } = useGuesting();
  const { isMobile } = useContext(MobileContext);
  const [isPostsLoading, setPostsIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState(null);
  const [isUnfold, setIsUnfold] = useState(null);
  const [subscribers_amount, setSubscribers_amount] = useState(0);
  const [friends_amount, setFriends_amount] = useState(0);
  const [additInfo, setAdditInfo] = useState(0)

  const {isHome} = useSelector(state => state.navigation)

  const [isSubscribed, setIsSubscribed] = useState(null);

  async function createPost(postBody) {
    try {
      setPostsIsLoading(true);
      setIsCreatingPost(true);
      const date = new Date();
      const res = await createUserPost({ postBody, date });
      // console.log(res);
      if (!res) {
        return alert("post is not created");
      }
      const { posts } = await getUserPosts();
      setPosts(posts.reverse());

      setIsUnfold(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreatingPost(false);
      setPostsIsLoading(false);
    }
  }

  useEffect(() => {
    const pathId = window.location.pathname.split("/")[ window.location.pathname.split("/").length - 1];
    if (pathId === localStorage.userId) {
      dispatch(setIsHomeAction(true));
    }
  }, [])

  useEffect(async () => {
    try {
      const pathId = window.location.pathname.split("/")[ window.location.pathname.split("/").length - 1];
      const reqId =
        pathId === localStorage.userId
          ? localStorage.userId
          : sessionStorage.getItem("VisitedUser_id");

      const { userData, fullname } = await getProfile_data(reqId);
      setName(fullname);

      setFriends_amount(userData.userData.friends.amount);
      setSubscribers_amount(userData.userData.subscribers.amount);

      const { posts } = await getProfile_posts(reqId);
      if (posts?.[0]) {
        setPosts(posts.reverse());
      }

      const res = await getSubscriptions(localStorage.getItem("userId"));

      var localIsSubscribed = isSubscribed;

      res.subscriptions.container.map((el) => {
        if (el === getVisited()) {
          setIsSubscribed((prev) => {
            return 1;
          });
          localIsSubscribed = 1;
        }
      });
      if (!localIsSubscribed) {
        setIsSubscribed(0);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPostsIsLoading(false);
    }
  }, []);

  return (
    <>
      <div class="">
        <UserPresenter
          subscribers_amount={subscribers_amount}
          friends_amount={friends_amount}
          isMobile={isMobile}
          name={name}
        />
        <div class="mb-20">
          <AdditionalUserInfo additInfo = {additInfo || 1} isHome={isHome} isMobile={isMobile} />
        </div>
        <div>
          <InteractButtons
            setIsSubscribed={setIsSubscribed}
            isSubscribed={isSubscribed}
            isHome={isHome}
          />
        </div>
        <div class="mb-20">
          <AdditionalUserActions isHome={isHome} />
        </div>
        <div>
          <PostCreator
            isUnfold={isUnfold}
            setIsUnfold={setIsUnfold}
            isCreating={isCreatingPost}
            createPost={createPost}
          />
        </div>
        <div>
          <Generate_posts_from_API posts={posts} isLoading={isPostsLoading} />
        </div>
      </div>
    </>
  );
}

function UserPresenter(props) {
  const {lang} = useSelector(state => state.lang)
  return (
    <>
      <div class="flex mb-20 ">
        <div class="">
          <ImagePlaceholder isMobile={props.isMobile} />
        </div>

        <div>
          <div>
            <div class={`f-si-${props.isMobile ? 22 : 24}`}>
              <div> {props.name ? props.name : "loading..."}</div>
            </div>
          </div>
          
          <div class="d-flex mt-2 f-si-14">
            <div>
              <b>{props.subscribers_amount} {lang === "RU" ? "ПОДПИСЧИКИ" : "SUBSCRIBERS"}</b>{" "}
            </div>
            <div class="mx-2"> {`\$\$`} </div>
            <div></div>
            <div>
              <b>{props.friends_amount}  {lang === "RU" ? "ПОДПИСКИ" : "SUBSCRIPTIONS"}</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InteractButtons(props) {
  const {lang} = useSelector(state => state.lang)
  const { setChatting } = useChats();
  const { getVisited } = useGuesting();
  const { subscribeTo, unsubscribeTo, getSubscribers, getSubscriptions } =
    useFollowing();

  async function onSubscribe() {
    props.setIsSubscribed(1);
    await subscribeTo(getVisited());
  }

  async function onUnsubscribe() {
    props.setIsSubscribed(0);
    await unsubscribeTo(getVisited());
  }

  useEffect(async () => {
    await getSubscriptions(localStorage.getItem("userId"));
    await getSubscribers(getVisited());
  }, []);

  if (props.isHome) {
    return <></>;
  }

  return (
    <>
      {props.isSubscribed !== null ? (
        <div class="row">
          <div class="col-sm-3 col-4 px-1">
            <button
              class="btn btn-primary btn-sm w-100"
              onClick={() => {
                window.location.href = "/chats/direct";
                setChatting(getVisited());
              }}
            >
              {lang === "RU" ? "сообщения" : "message"}
            </button>
          </div>
          <div class="col-sm-3 col-4 px-1">
            {props.isSubscribed ? (
              <button
                class="btn btn-primary btn-sm w-100"
                onClick={onUnsubscribe}
              >
                {lang === "RU" ? "отписаться" : "unsubscribe"}
              </button>
            ) : (
              <button
                class="btn btn-primary btn-sm w-100"
                onClick={onSubscribe}
              >
                {lang === "RU" ? "подписаться" : "subscribe"}
              </button>
            )}
          </div>
          <div class="col-3 px-1"></div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

function ImagePlaceholder(props) {
  return (
    <>
      {props.isMobile ? (
        <div class="">
          <div class="image-round-placeholder-60 mr-20"></div>{" "}
        </div>
      ) : (
        <div class="">
          <div class="image-round-placeholder-100 mr-40"></div>{" "}
        </div>
      )}
    </>
  );
}

function AdditionalUserActions(props) {
  const {lang} = useSelector(state => state.lang)
  const {goTo_subscribers_overview, goTo_subscriptions_overview} = useRouting()

  return (
    <div>
      <hr />
      <div class="row ">
        <div class="col-xl-2 col-5 mt-1 link" onClick = {() => {
            goTo_subscribers_overview(props.isHome)
        }} >  {lang === "RU" ? "подписчики" : "subscribers" } </div>
        <div class="col-xl-2 col-5 mt-1 link" onClick = {() => {
          goTo_subscriptions_overview(props.isHome)
        }}> {lang === "RU" ? "подписки" : "subscriptions" } </div>
      </div>
      <hr />
    </div>
  );
}

function Generate_posts_from_API(props) {
  const isLoading = props.isLoading;
  const posts = props.posts;

  if (isLoading) {
    return <Loader />;
  }

  return posts.map((post) => {
    return <Post post={post} />;
  });
}
