import React, { useState, useEffect } from "react";
//fix this in school!
const AuthContext = React.createContext({
  setUsrnmValue: () => {},
  setEmlValue: () => {},
  setPswrdValue: () => {},
  onLogout: () => {},
  onLogin: (email, password, username) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [pointsValue, setPointsValue] = useState("");
  let stationaryUsernameValue = "";
  let stationaryEmailValue = "";
  let stationaryPasswordValue = "";

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("usernameValue");
    const storedEmail = localStorage.getItem("emailValue");
    const storedPassword = localStorage.getItem("passwordValue");
    const storedPointsValue=localStorage.getItem("pointsValie");
    if (storedLoggedIn === "1") {
      setIsLoggedIn(true);
    }
    if (storedUsername !== null) {
      setUsernameValue(storedUsername);
    }
    if (storedEmail !== null) {
      setEmailValue(storedEmail);
    }
    if (storedPassword !== null) {
      setPasswordValue(storedPassword);
    }
    if(storedPointsValue!==null){
      setPointsValue(storedPointsValue);
    }
  }, []);

  const usernameValueHandler = (props) => {
    stationaryUsernameValue = props;
  };
  const emailValueHandler = (props) => {
    stationaryEmailValue = props;
  };
  const passwordValueHandler = (props) => {
    stationaryPasswordValue = props;
  };
  const pointsValueHandler = (props) => {
    setPointsValue(props);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("usernameValue");
    localStorage.removeItem("emailValue");
    localStorage.removeItem("passwordValue");
    localStorage.removeItem("pointsValue");
    setIsLoggedIn(false);
    setUsernameValue("");
    setEmailValue("");
    setPasswordValue("");
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("usernameValue", `${stationaryUsernameValue}`);
    localStorage.setItem("emailValue", `${stationaryEmailValue}`);
    localStorage.setItem("passwordValue", `${stationaryPasswordValue}`);
    setIsLoggedIn(true);
    setUsernameValue(stationaryUsernameValue);
    setEmailValue(stationaryEmailValue);
    setPasswordValue(stationaryPasswordValue);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        emailValue: emailValue,
        usernameValue: usernameValue,
        passwordValue: passwordValue,
        pointsValue: pointsValue,
        setEmlValue: emailValueHandler,
        setPswrdValue: passwordValueHandler,
        setUsrnmValue: usernameValueHandler,
        setPntsValue: pointsValueHandler,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
