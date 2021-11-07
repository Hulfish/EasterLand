import { useContext, useEffect, useState } from "react";
import { MobileContext } from "../../context/mobile_context";
import { PostContext } from "../../context/post_context";
import useGuesting from "../../hooks/guesting-hook";

import PostBottomBar from "./post_bottom_bar";
import PostHeader from "./post_header";

export default function Post(props) {
    const post = props.post;
    const post_author = post.user;
    const post_id = post._id
    const commentMenu = post.commentaries;
    const { defaultFontSize } = useContext(MobileContext);
    const { setVisiting } = useGuesting();

    function visitOne() {
      setVisiting(post_author);
      window.location.href = "/user_profile/" + post_author;
    }

  //console.log("post_id: ", post_id)

    return (
        <PostContext.Provider
            value={{
                post_author,
                post_id
            }}
        >
            <div key={post._id} class="mb-20 card">
                <div class="px-3 pt-3">
                    <PostHeader
                        visitOne={visitOne}
                        date={post.date}
                        author={post.author}
                    />
                </div>
                <div class={`px-3 mt-20 mb-20 f-si-${defaultFontSize}`}>
                    {post.post_text}
                </div>
                <div class="">
                    <PostBottomBar
                        commentMenu={commentMenu}
                        postLikes={post.likes}
                        postCommentaries={post.likes}
                        id={post._id}
                    />
                </div>
            </div>
        </PostContext.Provider>
    );
}
