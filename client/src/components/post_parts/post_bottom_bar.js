import usePostActions from "../../hooks/posts_actions-hook";
import { useContext, useEffect, useState } from "react";
import Generate_comments from "./generate_comments";


export default function PostBottomBar(props) {
    const comments = props.commentMenu.commentaries;
    const comments_amount = props.commentMenu.amount;
  
    const { likePost, commentPost } = usePostActions();
    const [isLiked, setIsLiked] = useState(0);
    const [likes_amount, setLikes_amount] = useState(0);
    const [isUnfold, setIsUnfold] = useState(0);
    const [sortType, setSortType] = useState("most interesting");
  
    function onLike() {
      isLiked
        ? setLikes_amount((prev) => prev - 1)
        : setLikes_amount((prev) => prev + 1);
  
      setIsLiked((prev) => (prev ? 0 : 1));
      likePost(props.id);
    }
  
    async function onComment(text) {
      try {
        const res = await commentPost(props.id, text);
        // console.log(res);
        return res
      } catch (e) {
        console.log(e);
      }
  
      // console.log(props.id, text);
    }
  
    function unfolderComments() {
      setIsUnfold((prev) => (prev ? 0 : 1));
    }
  
    useEffect(() => {
      setLikes_amount(props.postLikes.amount);
      const userId = localStorage.getItem("userId");
      for (var i = 0; i < props.postLikes.users.length; i++) {
        if (props.postLikes.users[i] === userId) {
          return setIsLiked(1);
        }
      }
      // console.log(props.isLiked);
    }, []);
  
    return (
      <div class="border-top">
        <div class="w-100 px-3 pb-1 flex">
          <button
            class="btn-custom-post"
            onClick={() => {
              onLike();
            }}
          >
            <div class="align-self-center">
              {!isLiked ? <HeartSVG_sleep /> : <HeartSVG_liked />}
            </div>
          </button>
  
          <div class="align-self-center ml-6"> {likes_amount} </div>
          <button
            class="btn-custom-post"
            onClick={() => {
              /////////////////////////////////////point
              unfolderComments();
            }}
          >
            <div class="align-self-center ml-20 mt-2">
              <CommentSVG />
            </div>
          </button>
  
          <div class="align-self-center ml-4"> {comments_amount} </div>
  
          <div class="align-self-center ml-20">
            <ShareSVG />
          </div>
        </div>
        <div class="">
          <Generate_comments 
            onComment={onComment}
            comments={comments}
            sortType={sortType}
            isUnfold={isUnfold}
          />
        </div>
      </div>
    );
  }
  
  function CommentSVG() {
    return (
      <div class="h-30">
        <svg
          width="28"
          height="24"
          viewBox="0 0 32 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="14" cy="11.5" rx="14" ry="11.5" fill="#737373" />
          <path
            d="M28.785 23.7109L16.5023 18.8146L22.0709 11.3857L28.785 23.7109Z"
            fill="#737373"
          />
        </svg>
      </div>
    );
  }
  
  function HeartSVG_sleep() {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </div>
    );
  }
  
  function HeartSVG_liked() {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </div>
    );
  }
  
  function ShareSVG() {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-share"
          viewBox="0 0 16 16"
        >
          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
        </svg>
      </div>
    );
  }