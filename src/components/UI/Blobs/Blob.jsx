import React, { useState } from "react";

import styles from "./Blob.module.css";

const Blob = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  let setSize = Math.floor(Math.random() * 200) + 50;
  let setWidth = setSize + "px";
  let setLeft = Math.random() * 100 + "%";
  let setTop = Math.random() * 100 + "%";

  console.log(setSize, setWidth, setLeft, setTop);

  const animationEnded=(e)=>{
    setIsVisible(!isVisible);
    console.log("I was deleted");
  }

  console.log("I was created");
  return (
    isVisible && (
      <div
        className={styles.blob}
        style={{
          width: setWidth,
          left: setLeft,
          top: setTop,
        }}
        key={props.key}
        onAnimationEnd={animationEnded}
      ></div>
    )
  );
};

export default Blob;
