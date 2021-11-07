import { useEffect, useState } from "react";
import Post from "./post_parts/post";
import useUserData from "../hooks/user_data-hook";
import Loader from "./loaders/loader";

export default function PostsListStd(props) {
  const { getPostsLimited } = useUserData();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // const [ThreadLength] = useState(5);
  const limit = props.limit

  // const iterator = new Array(ThreadLength).fill(null)

  useEffect(async () => {
    try {
      const posts = await getPostsLimited(limit);
      // console.log(posts.posts);
      setPosts(posts.posts);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  if (posts[0]) {
    // console.log("posts");
    return posts.map((post) => {
      return <Post post={post} />;
    });
  }
  // console.log(posts);
  return (
    <div>
      {" "}
      <div>Error</div>{" "}
      <div> Probably you are unauthorized </div>
    </div>
  );
}
