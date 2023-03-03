import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SignUp.module.css";

import Card from "../UI/Cards/Card";
import Button from "../UI/Buttons/LoginButton";
import ErrorModal from "../UI/Errors/ErrorModal";
import Loader from "../UI/Loader/Loader";
import AuthContext from "../store/auth-context";

const SignUp = (props) => {
  const ctx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(ctx.isLoggedIn){
      navigate("/profile")
    }
  },[ctx.isLoggedIn])

  const submitUserData =  useCallback((e) => {
    e.preventDefault();
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim() === 0 ||
      enteredUsername.trim().length <= 3
    ) {
      setError({
        title: "Невалидни данни!",
        message: "Моля въведете правилно име, емейл и парола.",
      });
      return;
    }
    if (enteredPassword.length < 8) {
      setError({
        title: "Невалидна парола!",
        message: "Паролата трябва да е поне 8 символа.",
      });
      return;
    }
    if (enteredPassword !== enteredConfirmPassword) {
      setError({
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
      setIsLoading(true);
      getApiResponse(sendApiData);
      ctx.onLogin(enteredEmail, enteredPassword, enteredUsername);
      return;
    }
    props.onAddUser(enteredEmail, enteredPassword, enteredUsername);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredUsername("");
  }, [enteredEmail, enteredPassword, enteredUsername, enteredConfirmPassword]);

  const emailChangeHandler = useCallback((e) => {
    setEnteredEmail(e.target.value);
  },[]);

  const passwordChangeHandler = useCallback((e) => {
    setEnteredPassword(e.target.value);
  },[]);
  const usernameChangeHandler = useCallback((e) => {
    setEnteredUsername(e.target.value);
  },[]);

  const confirmPasswordChangeHandler = useCallback((e) => {
    setEnteredConfirmPassword(e.target.value);
  },[]);
  const errorHandler = useCallback(() => {
    setError(null);
  },[]);

  let getApiResponse = async (props) => {
    console.log(props);
    let response = await fetch(
      "https://nextstep-trading-backend.herokuapp.com/accounts/users/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }
    )
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
    const response = await fetch(
      "https://nextstep-trading-backend.herokuapp.com/accounts/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("access token", data.access);
        localStorage.setItem("refresh token", data.refresh);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
            <input
              type="email"
              placeholder="Емейл"
              onChange={emailChangeHandler}
            />
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
      )}
    </>
  );
};

export default SignUp;
