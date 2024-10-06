import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (event) => {
    event.preventDefault();
    const response=await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if(response.status===200){
      alert("registration successful")
    }
    else{
      alert("registration failed")
    }
  };
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(data) => setUsername(data.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(data) => setPassword(data.target.value)}
      />
      <button>Register</button>
    </form>
  );
};
export default Register;
