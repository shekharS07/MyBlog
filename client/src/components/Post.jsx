import { formatISO9075 } from "date-fns";
import {Link} from "react-router-dom";
const Postlist = ({ _id,title, summary, cover, createdAt, author }) => {
  return (
    <div className="posts">
      <div className="image">
        <Link to={`post/${_id}`}>
          <img src={cover} alt="Image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`post/${_id}`}>
          <h1> {title}</h1>
        </Link>
        
        <p className="info">
          <p className="author">{author.username}</p>
          <p>{formatISO9075(new Date(createdAt))}</p>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};
export default Postlist;
