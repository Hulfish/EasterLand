// import { useContext, useEffect, useState } from "react";
// import { MobileContext } from "../../context/mobile_context";
// import { PostContext } from "../../context/post_context";
// import usePostActions from "../../hooks/posts_actions-hook";
// import UserNameHeading from "../user_name-heading";
// import CommentResponseInput from "./comment_response_input";
// import Generate_comments_responses from "./generate_comments_responses";

// export default function CommentResponse(props) {
//   const {post_id} = useContext(PostContext)
//   const {addResponseToComment} = usePostActions()

//   const author_id = props.author_id || null;
//   const { defaultFontSize } = useContext(MobileContext);
//   const author = props.author;
//   const text = props.text;
//   const to = props.to;
//   const path = props.path
//   const [isResponsing, setIsResponsing] = useState(0);
//   const [responses, setResponses] = useState(
//     props.responses?.[0] ? props.responses : [],
//   );

//   function onAnswer() {
//     setIsResponsing((prev) => (prev ? 0 : 1));
//   }

//   async function addResponse(text) {
//     try {
//       setIsResponsing((prev) => 0);
//       const res = await addResponseToComment({
//         user: localStorage.getItem("userId"),
//         text: text,
//         author: "You",
//         send_time: JSON.stringify(new Date()),
//         recipient_id: author_id,
//         to: author,
//         to_comment_id: props.to_comment_id,
//         path: props.path + "/" + props.to_comment_id
//       });

//       const response = {
//         // id,
//         user: localStorage.getItem("userId"),
//         text: text,
//         author: "You",
//         send_time: JSON.stringify(new Date()),
//         recipient_id: author_id,
//         to: author,
//         to_comment_id: props.to_comment_id ,
//         path: props.to_comment_id
//       };


//       setResponses((prev) => [...prev, response]);
      
//       console.log("responses:", responses, ", text:", text);
//     } catch (e) {
//       console.log(e);
//     } finally {
//     }
//   }
//   useEffect(() => {
//     console.log("response render")
//   } , [])
//   return (
//     <li
//       class="my-3"
//       onClick={() => {
//         console.log(props.to_comment_id);
//       }}
//     >
//       <div class="f-si-14 d-flex ">
//         <UserNameHeading
//           fontSize={14}
//           blue={true}
//           name={author}
//           id={props.id}
//         />
//         <div class="mx-1">to </div>
//         <div>
//           <UserNameHeading
//             fontSize={14}
//             blue={true}
//             name={to}
//             id={props.recipient_id}
//           />
//         </div>
//       </div>

//       <div class={`px-2 border-solid-left f-si-${defaultFontSize - 2}`}>
//         <div> to comment: {props.to_comment_id} </div>
//         {text}
//         <Generate_comments_responses responses={responses} />
//       </div>
//       <div class=" mt-1 f-si-12">{Advanced_date_parser(props.send_time)}</div>

//       <div class="d-flex justify-content-between ">
//         <div class="flex">
//           <div class="f-si-14 link" onClick={onAnswer}>
//             to answer
//           </div>
//         </div>
//         {/* <div class="f-si-14 link ml-20"> to report </div> */}
//       </div>
//       {isResponsing ? (
//         <CommentResponseInput addResponse={addResponse} />
//       ) : (
//         <></>
//       )}
//     </li>
//   );
// }

// function Advanced_date_parser(date) {
//   if (!date) {
//     return;
//   }
//   let [YMoD, HMiS] = date.split("T");
//   let [Y, Mo, D] = YMoD.split("-");
//   let [H, Mi, S_d] = HMiS.split(":");
//   const [S] = S_d.split(".");
//   // console.log(Y, Mo, D, H, Mi, S)

//   let isTimeTurned = 0;

//   if (+H + 10 > 23) {
//     D = +D + 1;
//     H = H - 14;
//   } else {
//     H = +H + 10;
//   }

//   const today = JSON.stringify(new Date()).split("-")[2].slice(0, 2);
//   console.log(today);
//   let isToday = 0;

//   if (isTimeTurned) {
//     if (today + 1 === D) {
//       isToday = 1;
//     }
//   } else {
//     if (today === D) {
//       isToday = 1;
//     }
//   }
//   return (isToday ? "today" : D) + " " + H + ":" + Mi;
// }
