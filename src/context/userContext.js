import React, { useEffect, useState, useContext } from "react";
import {fireAuth} from "../firebase";

export const Auth = React.createContext();

export const useUserContext = () => useContext(Auth);

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        fireAuth().onAuthStateChanged(function(user) {
            setUsuario(user);
            setShowChild(true);
        });
    }, []);

    
    if (!showChild) {
        return null;
    } else {
        return (
            <Auth.Provider
                value={{usuario}}
            >
                {children}
            </Auth.Provider>
        );
    }
};