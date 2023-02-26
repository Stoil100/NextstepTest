import React, { useContext, useState } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";


import styles from "./App.module.css";

import SignUp from "./components/LoginSignup/Signup";
import Login from "./components/LoginSignup/Login";
import Profile from "./components/Profiles/Profile";
import Card from "./components/UI/Cards/Card";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/Main";
import AuthContext from "./components/store/auth-context";
import Test from "./components/Test/TestList/Test";
import News from "./components/News/NewsMain/News";
import RootLayout from "./components/Root/Root";
import Course from "./components/Courses/Course/Course";
import ErrorPage from "./components/UI/Errors/ErrorPage";
import CourseItem from "./components/Courses/CourseItems/CourseItem";
import TradingViewWidget from "./components/Charts/TradingViewChart";
import CryptoList from "./components/Charts/CryptoList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
      { path: "/news", element: <News /> },
      { path: "/Test/:testId", element: <Test /> },
      { path:"/courses", element:<Course/>},
      { path:"/courses/:courseId",element:<CourseItem/>},
      {path:"/cryptoList",element:<CryptoList/>},
      {path:"/cryptoList/:chartId",element:<TradingViewWidget/>},
    ],
  },
]);

function App() {
  return (
    <>
      <Card className={styles.Box}>
        <RouterProvider router={router} />
      </Card>
      <Footer />
    </>
  );
}

export default App;
