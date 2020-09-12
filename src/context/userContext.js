import React, { useEffect, useState, useContext } from "react";
import { fireAuth, getFirestore } from "../firebase";

export const Auth = React.createContext();

export const useUserContext = () => useContext(Auth);

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    // console.log(showLogin)
        function MountUser(uid) {
            const db = getFirestore();
            const users = db.collection("users");
            users.where('uid', '==', uid).get()
                .then((querySnapshot) => querySnapshot.docs.map(doc => setUsuario(doc.data())
                ));
        }
    
    useEffect(() => {
        fireAuth().onAuthStateChanged((user) => {
            if (user) {
                MountUser(user.uid)
            } else { setUsuario(null) }
        });
    }, []);

    console.log(usuario);

    return (
        <Auth.Provider
            value={{ usuario, MountUser, showLogin , setShowLogin }}
        >
            {children}
        </Auth.Provider>
    );
}