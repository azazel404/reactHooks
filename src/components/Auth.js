import React,{useContext} from "react";
import AuthContext from "../auth-context"; //manggil createContext

const Auth = props => {
        const auth = useContext(AuthContext); //gunakan createContext\
        console.log(auth)
        return <button onClick={auth.login}>Login!</button>;
};

export default Auth;
