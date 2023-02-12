import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../store/auth-context";


import Nav from "../Navigation/Nav";
import MenuButton from "../UI/Buttons/MenuButton";

const RootLayout=()=>{
    const ctx = useContext(AuthContext);
    return(
        <>
        <Nav/>
        <Outlet/>
        {ctx.isLoggedIn&&<MenuButton/>}
        </>
    )
}

export default RootLayout;