import { useContext, useEffect, useState } from "react";
import { MobileContext } from "../../context/mobile_context";
import { PostContext } from "../../context/post_context";
import usePostActions from "../../hooks/posts_actions-hook"
import UserNameHeading from "../user_name-heading";
import CommentResponseInput from "./comment_response_input";
import Generate_comments_responses from "./generate_comments_responses";

export default function Comment(props) {
    const commentAuthor_id = props.comment.user;
    const comment_id = props.comment.id;
    const { addResponseToComment } = usePostActions()
    const { defaultFontSize } = useContext(MobileContext);
    const { post_id } = useContext(PostContext)
    // const { commentComment } = use
    const commentAuthor = props.comment.author;
    const commentBody = props.comment.comment || props.comment.text;
    const [isResponsing, setIsResponsing] = useState(0);
    const [responses, setResponses] = useState(
      props.comment.responses?.[0] ? props.comment.responses : [],
    );
    return (
        <li class="my-3 ">
            <div class="f-si-14">
                <UserNameHeading
                    blue={true}
                    name={commentAuthor}
                    fontSize={14}
                    id={commentAuthor_id}
                />
            </div>
            <div class={`px-2 border-solid-left f-si-${defaultFontSize - 2}`}>
                {commentBody}
            </div>
            <div class=" mt-1 f-si-12">
                {Advanced_date_parser(props.comment.send_time)}
            </div>
        </li>
    );
}

function Advanced_date_parser(date) {
    if (!date) {
        return;
    }
    let [YMoD, HMiS] = date.split("T");
    let [Y, Mo, D] = YMoD.split("-");
    let [H, Mi, S_d] = HMiS.split(":");
    const [S] = S_d.split(".");
    // console.log(Y, Mo, D, H, Mi, S)

    let isTimeTurned = 0;

    if (+H + 10 > 23) {
        D = +D + 1;
        H = H - 14;
    } else {
        H = +H + 10;
    }

    const today = JSON.stringify(new Date()).split("-")[2].slice(0, 2);
    let isToday = 0;

    if (isTimeTurned) {
        if (today + 1 === D) {
            isToday = 1;
        }
    } else {
        if (today === D) {
            isToday = 1;
        }
    }
    return (isToday ? "today" : D) + " " + H + ":" + Mi;
}
