import React,{useContext} from "react";

import styles from "./App.module.css";

import Wave from "./assets/Waves/Wave";
import SignUp from "./components/LoginSignup/Signup";
import Login from "./components/LoginSignup/Login";
//import Button from "./components/UI/Buttons/Button";
import Nav from "./components/Navigation/Nav";
import Profile from "./components/Profiles/Profile";
import MenuButton from "./components/UI/Buttons/MenuButton";
import Card from "./components/UI/Cards/Card";
import Footer from "./components/Footer/Footer";
//import Blob from "./components/UI/Blobs/Blob";
import MainPage from "./components/MainPage/Main";
import AuthContext from "./components/store/auth-context";
function App() {
  const ctx=useContext(AuthContext);
  return (
    <>
    <Card className={styles.Box}>
      <Nav/>
      
      {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Profile />}
      <MenuButton/>
    </Card>
    <Footer/>
    </>
  );
}

export default App;