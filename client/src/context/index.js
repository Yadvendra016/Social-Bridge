import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user: {},
        token: "",
    });

    useEffect(() =>{
        setState(JSON.parse(window.localStorage.getItem('auth')));
    },[])
    
    const navigate = useNavigate();

    // adding token in config
    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = "http://localhost:8000/api"; // setting default base URL for axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Axios Interceptor request (when token expires then user forcefully logout)
    axios.interceptors.response.use(function(response){
        // if everything is fine then do not do anything
        return response;
    }, function(error){
        // Do something with request error
        let res = error.response;
        if(res.status === 401 && !res.config._isRetryRequest){ // 401->unothorised error
            // then lougout user 
            setState(null);
            window.localStorage.removeItem("auth"); // remove the user from localstorage
            navigate("/login");
        }
    });
    return (
        <UserContext.Provider value ={[state, setState]}>
            {children}
        </UserContext.Provider>
    )

};

export {UserContext, UserProvider}