import { format, formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../store/UserContext";
import { FiEdit } from "react-icons/fi";

const Postpage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`https://my-blog-api-shivam.vercel.app/post/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    );
  }, []);
  const date = postInfo?.createdAt;

  return (
    <div className="post-page">
      <h1>{postInfo?.title} </h1>
      {date && <time>{formatISO9075(new Date(date))}</time>}

      <div className="author">by {postInfo?.author.username}</div>
      {userInfo?.id === postInfo?.author._id && (
        <div className="edit">
          <Link href="" className="edit-btn" to={`/edit/${postInfo?._id}`}>
            {" "}
            <FiEdit /> Edit post{" "}
          </Link>
        </div>
      )}
      <div className="image">
        <img src={postInfo?.cover} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: postInfo?.content }}></p>
    </div>
  );
};
export default Postpage;
