import { useContext, useEffect, useState } from "react";
import Loader from "../loaders/loader";
import Comment from "./comment";

export default function Generate_comments(props) {
  const [comments, setComments] = useState(props.comments);
  const [commentText, setCommentText] = useState("");
  const [isUploading, setIsUploading] = useState(0);

  async function leaveComment() {
    try {
      const _commentText = commentText;
      if (!commentText.trim()) {
        return alert("enter text");
      }
      setIsUploading(1);
      // console.log("commentText: ", _commentText)
      const res = await props.onComment(commentText);
      const id = res.commentId;
      // console.log("comment_id: ", res)
      setComments((prev) => [
        ...prev,
        {
          id,
          user: localStorage.getItem("userId"),
          text: _commentText,
          author: "You",
          send_time: JSON.stringify(new Date()),
        },
      ]);
      setIsUploading(0);
    } catch (e) {
      console.log(e);
    } finally {
      if (isUploading) {
        setIsUploading(0);
      }
    }
  }

  return props.isUnfold ? (
    <div class="p-3 border-top">
      <div class="flex">
        <textarea
          wrap="hard"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          class="form-control"
          id="floatingTextarea2"
        />
      </div>
      <div class="flex space-between">
        <div>
          <button onClick={leaveComment} class="btn btn-primary btn-sm mt-2">
            Leave a comment
          </button>
        </div>
        <div>{isUploading ? <Loader>uploading...</Loader> : <></>}</div>
      </div>

      <div>
        <div class="pt-3 px-2 ">
          Sort by: <b>{props.sortType}</b>
        </div>
        <div class="my-4"></div>
        <ul class="list-pure px-2">
          {comments[0] ? (
            comments.map((comment) => {
              // console.log(comment);
              return <Comment comment={comment} />;
            })
          ) : (
            <div> Still no comments </div>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
}
