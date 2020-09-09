import React, { useState } from 'react';
import { useUserContext } from "../../context/userContext"
import { fireAuth, googleAuthProvider } from "../../firebase";
import "./styles.css"
function Login({ setModal, modal }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { usuario } = useUserContext()

    function registerUser() {
        fireAuth().createUserWithEmailAndPassword(email, pass)
            .then((res) => console.log(res))
            .catch((error) => {
                console.log("error", error.message)
            })
    }

    function signInUser() {
        fireAuth().signInWithEmailAndPassword(email, pass)
            .then((res) => {
                console.log("mail:" + res.user.email + "Uid:" + res.user.uid)
                setModal(false)
            })
            .catch((error) => {
                console.log("error", error.message)
            })
    }

    function signOutUser() {
        fireAuth().signOut()
            .then((res) => {
                console.log(res)
                setModal(false)
            })

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
        <div className={modal ? "containerBackground showContainer" : "containerBackground hideContainer"}>
            <div  style={{ width: "20rem", margin: "auto", backgroundColor:"white" }}>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">First Panel</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Second Panel</a>
                    </li>
                </ul>
                <div class="tab-content" style={{minHeight: "30rem"}}>
                    {/* LOGIN */}
                    <div className="login-form tab-pane active" id="tabs-1" role="tabpanel">
                        <h4 className="text-center">Iniciar Sesion</h4>
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
                    {/* registro */}
                    <div className="login-form tab-pane" id="tabs-2" role="tabpanel"></div>
                </div>

            </div>
        </div>
    )
}

export default Login
