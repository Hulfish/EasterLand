import { useEffect } from "react";
import useGuesting from "../hooks/guesting-hook";

export default function UserNameHeading(props) {
  const { visitOne } = useGuesting();

  let name = props.id === localStorage.getItem("userId") ? "You" : props.name

  return (
    <div
      class={` f-si-${props.fontSize || 18}`}
      style={{ color: props.blue ? "darkblue" : "black" }}
      onClick={() => {
        visitOne(props.id);
      }}
    >
      {name}
    </div>
  );
}
