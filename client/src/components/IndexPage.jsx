import { useEffect, useState } from "react";
import Postlist from "./Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://my-blog-api-shivam.vercel.app/post").then((response) => {
      response.json().then((post) => {
        setPosts(post);
      });
    });
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Postlist {...post} />)}</>;
};
export default IndexPage;
