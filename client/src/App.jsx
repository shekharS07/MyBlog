import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import { UserContextProvider } from "./store/UserContext";
import Postpage from "./components/Postpage";
import EditPost from "./components/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/post/:id" element={<Postpage/>}/>
        <Route path="/edit/:id" element={<EditPost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
