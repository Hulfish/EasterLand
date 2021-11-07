import { useContext, useEffect, useState } from "react";
import PostsListStd from "../components/post_list_std";
import {useSelector } from "react-redux"

export default function Explorepage(props) {
  const {lang } = useSelector(state => state.lang)
  // const {isMobile} = useContext(MobileContext)
  const {limit, setLimit} = useState(5)
  return (
    <>
      <div class="">
      <div class="flex">
        <div class = "w-100">
          <h1 class="mb-50">
             {lang === "RU" ? "Лента" : "Explore" }
           
          </h1>
          <PostsListStd limit = {limit}/> {/* No multithreadness but just endless posibility of post getting */}
        </div>
        
      </div>
    </div>
    </>
  );
}


