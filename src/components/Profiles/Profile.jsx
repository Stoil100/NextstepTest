import React,{useState,useEffect} from "react";
import jwtDecode from "jwt-decode";

import styles from "./Profile.module.css";
import Card from "../UI/Cards/Card";
import personIcon from '../../assets/person.svg';

import Loader from "../UI/Loader/Loader";

const Profile = (props) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Get the JWT token from local storage
    const token = localStorage.getItem('access token');

    // If the token exists, decode it to get the user's profile information
    if (token) {
      const decodedToken = jwtDecode(token);
      setProfile({
        name: decodedToken.username,
        email: decodedToken.email,
        points: localStorage.getItem("pointsValue")
      });
    }
  }, []);

  if (!profile) {
    return <Loader/>;
  }
  return (
    <Card className={styles.profileBox}>
      <Card className={`${styles.box1} `}>
        <div className={styles.imageAndUsernameHolder}>
          <img src={personIcon} className={styles.profileImg} alt="profileImg"></img>
          <h2>{profile.name}</h2>
        </div>
        <hr></hr>
        <div className={styles.infoHolder}>
            <h3>Емeйл:</h3>
            <h4>{profile.email}</h4>
        </div>
        <div className={styles.infoHolder}>
            <h3>NXST точки:</h3>
            <h4>{profile.points}</h4>
        </div>
      </Card>
      <Card className={`${styles.levelBox} `}>
        <h2>Ниво:</h2>
        <h1>Начинаещ</h1>
      </Card>
      <Card className={`${styles.box2} `}>
        <h2>Изгледани курсове:</h2>
        <ol>
        </ol>
      </Card>
    </Card>
  );
};

export default Profile;
