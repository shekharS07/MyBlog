import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://my-blog-api-shivam.vercel.app/post/" + id).then(
      (response) => {
        response.json().then((postInfo) => {
          setTitle(postInfo?.title);
          setSummary(postInfo?.summary);
          setContent(postInfo?.content);
        });
      }
    );
  }, []);

  const updatePost = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("https://my-blog-api-shivam.vercel.app/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form className="post" onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(event) => {
          setSummary(event.target.value);
        }}
      />
      <input
        type="file"
        onChange={(event) => {
          setFiles(event.target.files);
        }}
      />
      <Editor value={content} onChange={setContent} />
      <button type="submit" className="button">
        Edit Post
      </button>
    </form>
  );
};
export default EditPost;
