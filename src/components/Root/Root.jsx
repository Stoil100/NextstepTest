import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../store/auth-context";


import TopBar from "../TopBar/TopBar";
import MenuButton from "../Nav/MenuButton";

const RootLayout=()=>{
    const ctx = useContext(AuthContext);
    return(
        <>
        <TopBar/>
        <Outlet/>
        {ctx.isLoggedIn&&<MenuButton/>}
        </>
    )
}

export default RootLayout;