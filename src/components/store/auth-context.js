import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  onLogout: () => {},
  onLogin: (email, password, username) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
     const storedLoggedIn = localStorage.getItem("isLoggedIn");
     if (storedLoggedIn === "true") {
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
     localStorage.setItem("isLoggedIn", true);
     setIsLoggedIn(true);
   };

   const contextValue = { isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }; // object destructuring

   return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
