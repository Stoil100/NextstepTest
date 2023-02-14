import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

import styles from "./SignUp.module.css";

import Card from "../UI/Cards/Card";
import Button from "../UI/Buttons/LoginButton";
import ErrorModal from "../UI/Errors/ErrorModal";
import MainPage from "../MainPage/Main";
import AuthContext from "../store/auth-context";

const SignUp = (props) => {
  const ctx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [error, setErorr] = useState(); 
  const navigate = useNavigate();


  const submitUserData = (e) => {
    e.preventDefault();
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim() === 0 ||
      enteredUsername.trim().length <= 3
    ) {
      setErorr({
        title: "Invalid input!",
        message: "Please enter a valid username, email and password.",
      });
      return;
    }
    if (enteredPassword.length < 8) {
      setErorr({
        title: "Invalid Password!",
        message: "Password should be at least 8 characters.",
      });
      return;
    } else {
      const sendApiData = {
        username: `${enteredUsername}`,
        email: `${enteredEmail}`,
        password: `${enteredPassword}`,
      };
      getApiResponse(sendApiData);
      
      return;
    }
    props.onAddUser(enteredEmail, enteredPassword, enteredUsername);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredUsername("");
  };
  const sendApiResponse = (props) => {
    if (props === true) {
      ctx.onLogin(enteredEmail, enteredPassword, enteredUsername);
      navigate('/profile');
    } else {
      setErorr({
        title: "User does not exist!",
        message: "Please try again.",
      });
    }
    return;
  };

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  };
  const errorHandler = () => {
    setErorr(null);
  };

  const getApiResponse = async (props) => {
    const response = await fetch("http://127.0.0.1:8000/accounts/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.access !== undefined) {
          localStorage.setItem("access token",data.access);
          localStorage.setItem("refresh token",data.refresh);
          sendApiResponse(true);
        } else {
          sendApiResponse(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card className={styles.signUpBox}>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form className={styles.form} onSubmit={submitUserData}>
        <h2>Вход</h2>
        <input
          type="text"
          placeholder="Име"
          onChange={usernameChangeHandler}
        />
        <input type="email" placeholder="Емейл" onChange={emailChangeHandler} />
        <input
          type="password"
          placeholder="Парола"
          onChange={passwordChangeHandler}
        />
        <Button className={`${styles.signUpButton} ${styles.buttons}`}>
         Влез
        </Button>
        <p>
          Нямате профил?{" "}
          <Link to={"/signup"}>
            <span>Регистрирайте се</span>
          </Link>
        </p>
       {/* <Card className={styles.orUseBox}>
          <hr></hr>
          <p>Or</p>
          <hr></hr>
        </Card>
        <Button className={`${styles.googleButton} ${styles.buttons}`}>
          Log in with Google
        </Button>*/}
      </form>
    </Card>
  );
};

export default SignUp;
