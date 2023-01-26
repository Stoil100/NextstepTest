import React,{useState,useContext} from 'react';

import styles from './SignUp.module.css';

import Card from '../UI/Cards/Card';
import Button from '../UI/Buttons/LoginButton';
import ErrorModal from '../UI/Errors/ErrorModal';
import MainPage from '../MainPage/Main';
import AuthContext from "../store/auth-context";

const SignUp=(props)=>{
  const ctx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword]=useState("");
  const [error, setErorr] = useState();

  const submitUserData = (e) => {
    e.preventDefault();
    if (enteredEmail.trim().length === 0 || enteredPassword.trim() === 0 || enteredUsername.trim().length<=3) {
      setErorr({
        title: "Invalid input!",
        message: "Please enter a valid username, email and password.",
      });
      return;
    }
    if (enteredPassword.length <8) {
        setErorr({
            title: "Invalid Password!",
            message: "Password should be at least 8 characters.",
          });
      return;
    }
    if (enteredPassword !== enteredConfirmPassword) {
        setErorr({
            title: "Password does not match!",
            message: "Password should match confirmation.",
          });   
    }
    else{
      const sendApiData={username:`${enteredUsername}`,email:`${enteredEmail}`,password:`${enteredPassword}`}
      getApiResponse(sendApiData)
      ctx.setUsrnmValue(enteredUsername)
      ctx.setEmlValue(enteredEmail)
      ctx.setPswrdValue(enteredPassword)
      ctx.onLogin(
        enteredEmail, enteredPassword,enteredUsername
      );
      
      return;
    }
    props.onAddUser(enteredEmail, enteredPassword,enteredUsername);
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

  const confirmPasswordChangeHandler=(e)=>{
    setEnteredConfirmPassword(e.target.value);
  };
  const errorHandler=()=>{
    setErorr(null);
  }

  let getApiResponse = async (propsData) => {
    console.log(propsData);
    let response = await fetch("http://127.0.0.1:8000/accounts/users/",{
      method:'POST',
      headers:{
      'Content-Type': 'application/json',
    },
      body:JSON.stringify(propsData),
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log("Success",data)
    })
    .catch((error)=>{
      console.error("Error:",error);
    })
    let data = await response.json();  
  };

    return(
          <Card className={styles.signUpBox}>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <form className={styles.form} onSubmit={submitUserData}>
                <h2>Sign up</h2>
                <input type="text" placeholder="Username" onChange={usernameChangeHandler}/>
                <input type="email" placeholder="Email" onChange={emailChangeHandler}/>
                <input type="password" placeholder="Password" onChange={passwordChangeHandler}/>
                <input type="password" placeholder="Confirm password" onChange={confirmPasswordChangeHandler}/>
                <Button className={`${styles.signUpButton} ${styles.buttons}`}>Sign up</Button>
                <p>Already have an account? <span>Log in</span></p>
                <Card className={styles.orUseBox}>
                    <hr></hr>
                    <p>Or</p>
                    <hr></hr>
                </Card>
                <Button className={`${styles.googleButton} ${styles.buttons}`}>Log in with Google</Button>
            </form>
        </Card>
    )
}

export default SignUp;