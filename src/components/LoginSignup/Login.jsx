import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SignUp.module.css";

import Card from "../UI/Cards/Card";
import Button from "../UI/Buttons/LoginButton";
import ErrorModal from "../UI/Errors/ErrorModal";
import Loader from "../UI/Loader/Loader";
import AuthContext from "../store/auth-context";

const SignUp = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ctx.isLoggedIn) {
      navigate("/profile");
    }
  }, [ctx.isLoggedIn]);

  const handleSubmit = async (e) => {
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

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://nextstep-trading-backend.herokuapp.com/accounts/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: enteredUsername, email: enteredEmail, password: enteredPassword }),
        }
      );

      const data = await response.json();

      if (data?.access) {
        localStorage.setItem("access token", data.access);
        localStorage.setItem("refresh token", data.refresh);
        ctx.onLogin(enteredEmail, enteredPassword, enteredUsername);
        navigate("/profile");
      } else {
        setError({
          title: "Профилът не съществува!",
          message: "Моля опитайте отново.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "username":
        setEnteredUsername(e.target.value);
        break;
      case "email":
        setEnteredEmail(e.target.value);
        break;
      case "password":
        setEnteredPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleModalClose = () => {
    setError(null);
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
              onConfirm={handleModalClose}
            />
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <input type="text" name="username" placeholder="Име" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Емейл" onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Парола" onChange={handleInputChange} />
            <Button className={`${styles.signUpButton} ${styles.buttons}`}>Влез</Button>
            <p>
              Нямате профил?{" "}
              <Link to={"/signup"}>
                <span>Регистрирайте се</span>
              </Link>
            </p>
          </form>
        </Card>
      )}
    </>
  );
};

export default SignUp;
