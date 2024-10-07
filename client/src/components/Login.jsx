import { useContext, useState } from "react";
import {Navigate} from "react-router-dom";
import UserContext from "../store/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect]= useState(false);
  const {setUserInfo}=useContext(UserContext);

  const login = async (event) => {
    event.preventDefault();
    const response=await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials:"include"
    });
    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }else{
      alert("wrong credentials")
    }
  };

  if(redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(data) => {
          setUsername(data.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(data) => {
          setPassword(data.target.value);
        }}
      />
      <button>Login</button>
    </form>
  );
};
export default Login;