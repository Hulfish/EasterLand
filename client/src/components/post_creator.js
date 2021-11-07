import { useState } from "react";
import {useSelector} from "react-redux"

export default function PostCreator(props) {
  const {lang} = useSelector(state => state.lang)
  const isCreating = props.isCreating;
  const { isUnfold, setIsUnfold } = props;
  function changeState() {
    setIsUnfold((isUnfold) => !isUnfold);
  }
  if (isCreating) {
    return <div> Creating post... </div>;
  }
  return (
    <>
      <div class="flex">
        <div>{lang === "RU" ? "Создать пост" : "Create new post"} </div>
        <p>
          <button
            class="btn btn-sm btn-primary ml-10"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={changeState}
          >
            {isUnfold ? `${lang === "RU" ? "Закрыть" : "Close"}` : `${lang === "RU" ? "Открыть" : "Open"}`}
          </button>
        </p>
      </div>
      <div class="collapse" id="collapseExample">
        <InputForm isUnfold={isUnfold} createPost={props.createPost} />
      </div>
    </>
  );
}

function InputForm(props) {
  const {lang} = useSelector(state => state.lang)
  const [postBody, setPostBody] = useState("");

  function onCreatePost() {
    props.createPost(postBody);
  }
  return (
    <div class="mb-50">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div> {lang === "RU" ? "Текст поста" : "Post body" } </div>
          <div class="form-floating h-200">
            <textarea
              class="form h-200 w-100"
              value={postBody}
              onChange={(e) => {
                setPostBody(e.target.value);
              }}
            ></textarea>
          </div>

          <div>
            <button class="btn btn-lg btn-primary mt-20" onClick={onCreatePost}>
              {" "}
              {lang === "RU" ? "Выложить пост" : "Create post" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
