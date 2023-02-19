import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
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
        title: "Невалидни данни!",
        message: "Моля въведете правилно име, емейл и парола.",
      });
      return;
    }
    if (enteredPassword.length < 8) {
      setErorr({
        title: "Невалидна парола!",
        message: "Паролата трябва да е поне 8 символа.",
      });
      return;
    }
    if (enteredPassword !== enteredConfirmPassword) {
      setErorr({
        title: "Паролите не са едни и същи!",
        message: "Моля потвърдете че сте въвели правилна парола.",
      });
    } else {
      const sendApiData = {
        username: `${enteredUsername}`,
        email: `${enteredEmail}`,
        password: `${enteredPassword}`,
      };
      localStorage.setItem("pointsValue", 0);
      getApiResponse(sendApiData);
      ctx.onLogin(enteredEmail, enteredPassword, enteredUsername);
      navigate("/profile");

      return;
    }
    props.onAddUser(enteredEmail, enteredPassword, enteredUsername);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredUsername("");
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

  const confirmPasswordChangeHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };
  const errorHandler = () => {
    setErorr(null);
  };

  let getApiResponse = async (props) => {
    console.log(props);
    let response = await fetch("http://127.0.0.1:8000/accounts/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
        getApiKey(props);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getApiKey = async (props) => {
    console.log(props)
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
        localStorage.setItem("access token",data.access);
        localStorage.setItem("refresh token",data.refresh);
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
        <h2>Регистрирайте се</h2>
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
        <input
          type="password"
          placeholder="Повтори паролата"
          onChange={confirmPasswordChangeHandler}
        />
        <Button className={`${styles.signUpButton} ${styles.buttons}`}>
          Регистрирация
        </Button>
        <p>
          Вече имате профил?{" "}
          <Link to={"/login"}>
            <span>Вход</span>
          </Link>
        </p>
       {/* <Card className={styles.orUseBox}>
          <hr></hr>
          <p>Или</p>
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
