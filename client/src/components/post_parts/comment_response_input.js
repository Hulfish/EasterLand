// import {useState} from "react"

// export default function CommentResponseInput(props) {
//   const [responseText, setResponseText] = useState("");

//   function onResponse(e) {
//     e.preventDefault();
//     if (!responseText.trim()) {
//       return;
//     }
//     props.addResponse(responseText);
//   }

//   return (
//     <form class="mt-1">
//       <input
//         value={responseText}
//         onChange={(e) => {
//           setResponseText(e.target.value);
//         }}
//         class="form-control"
//       />
//       <button
//         class="btn btn-sm btn-secondary mt-1"
//         onClick={(e) => {
//           onResponse(e);
//         }}
//       >
//         Add response
//       </button>
//     </form>
//   );
// }
