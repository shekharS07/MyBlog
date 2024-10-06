import { useState } from "react";
import {Navigate} from "react-router-dom";
import Editor from "./Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect,setRedirect]=useState(false);

  const createNewPost = async (event) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    event.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    console.log(await response.json());

    if(response.ok){
      setRedirect(true);
    }

  };

  if(redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <form className="post" onSubmit={createNewPost}>
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
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
