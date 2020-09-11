import React, { useEffect, useState, useContext } from "react";
import { fireAuth, getFirestore } from "../firebase";

export const Auth = React.createContext();

export const useUserContext = () => useContext(Auth);

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        fireAuth().onAuthStateChanged(function (user) {
            if (user) {
                const db = getFirestore();
                const users = db.collection("users")
                users.where('uid', '==', user.uid).get()
                    .then((querySnapshot) => querySnapshot.docs.map(doc =>
                        setUsuario(doc.data())
                    ))
            }
            setUsuario(user);
            setShowChild(true);
        });
    }, []);
    
    console.log(usuario);

    if (!showChild) {
        return null;
    } else {
        return (
            <Auth.Provider
                value={{ usuario }}
            >
                {children}
            </Auth.Provider>
        );
    }
};