import React, { useState } from 'react';
import { useUserContext } from "../../context/userContext"
import { fireAuth, googleAuthProvider } from "../../firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { usuario } = useUserContext()
    console.log(usuario);
    function registerUser() {
        fireAuth().createUserWithEmailAndPassword(email, pass)
            .then((res) => console.log(res))
            .catch((error) => {
                console.log("error", error.message)
            })
    }

    function signInUser() {
        fireAuth().signInWithEmailAndPassword(email, pass)
            .then((res) => console.log("mail:" + res.user.email + "Uid:" + res.user.uid))
            .catch((error) => {
                console.log("error", error.message)
            })
    }

    function signOutUser() {
        fireAuth().signOut()
            .then((res) => console.log("mail:" + res.user.email + "Uid:" + res.user.uid))
            .catch((error) => {
                console.log("error", error.message)
            })
    }

    function socialLogin(provider) {
        fireAuth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="login-form" style={{ width: "20rem", margin: "auto" }}>
            {usuario ? <h2 class="text-center">{usuario.email}</h2> : <h2 className="text-center">SIN USUARIO LOGIN</h2>}
            <h2 className="text-center">Log in</h2>
            <div className="form-group">
                <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Username" required="required" />
            </div>
            <div className="form-group">
                <input onChange={(e) => setPass(e.target.value)} type="password" className="form-control" placeholder="Password" required="required" />
            </div>
            <div className="form-group">
                <button onClick={() => signInUser()} type="submit" className="btn btn-primary btn-block">Log in</button>
                <button onClick={() => registerUser()} type="submit" className="btn btn-success btn-block">registrar</button>
                <button onClick={() => signOutUser()} type="submit" className="btn btn-danger btn-block">LOGOUT</button>
                <button onClick={() => socialLogin(googleAuthProvider)} type="submit" className="btn btn-danger btn-block">Google</button>
            </div>
        </div>
    )
}

export default Login
