import React from "react";

import styles from './LoginButton.module.css';

const Button=(props)=>{
    
    return(
        <button className={`${styles.button} ${props.className}`}>{props.children}</button>
    )
}

export default Button;