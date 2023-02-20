import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  onLogout: () => {},
  onLogin: (email, password, username) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedLoggedIn === "1") {
      setIsLoggedIn(true);
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
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
