import { useEffect, useState } from "react";
import Postlist from "./Post"

const IndexPage=()=>{
   const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/post").then(response=>{
            response.json().then(post=>{
                setPosts(post);
            })
        })
    },[])
    return (
        <>
        {posts.length>0 && posts.map(post=>(
            <Postlist {...post} />
        ))}

        </>  
    )
}
export default IndexPage;