import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

//fix this in school!
const AuthContext = React.createContext({
  onLogout: () => {},
  onLogin: (email, password, username) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [pointsValue, setPointsValue] = useState("");


  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const accessToken=localStorage.getItem("access token");
    if (storedLoggedIn === "1") {
      setIsLoggedIn(true);
    }
    if(accessToken!==null){
      const decoded=jwtDecode(accessToken)
      console.log(decoded);
      setUsernameValue(decoded.username);
      setEmailValue(decoded.email)
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("access token");
    localStorage.removeItem("refresh token");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        emailValue: emailValue,
        usernameValue: usernameValue,
        passwordValue: passwordValue,
        pointsValue: pointsValue,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
