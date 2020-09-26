import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/userContext";
import { fireAuth, googleAuthProvider, getFirestore, facebookAuthProvider } from "../../firebase";
import Loader from "../Loader/Loader";
import "./styles.css"


function Login({ setModal, modal }) {
    const { MountUser } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [emailLogin, setEmailLogin] = useState("");
    const [passLogin, setPassLogin] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmai2] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errLogin, setErrLogin] = useState("");
    const [errRegister, setErrRegister] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPass, setErrPass] = useState("");
    const [errName, setErrName] = useState("");
    const [errPhone, setErrPhone] = useState("");

    useEffect(() => {
        console.log(modal)
    }, [modal])

    function VerificoCampos() {
        function verificoName() {
            if (name !== "") {
                setErrName("")
                return true
            } else {
                setErrName("debe completar este campo")
                return false
            }
        }
        function verificPhone() {
            if (phone !== "") {
                setErrPhone("")
                return true
            } else {
                setErrPhone("debe completar este campo")
                return false
            }
        }
        function verificoPass() {
            if (pass !== "" && pass2 !== "") {
                if (pass === pass2) {
                    if (pass.length >= 6) {
                        setErrPass("")
                        return true
                    } else {
                        setErrPass("Debe tener un minimo de 6 caracteres")
                        return false
                    }
                } else {
                    setErrPass("Las contraseñas no coinciden")
                    return false
                }
            } else {
                setErrPass("Debe completar este campo")
                return false
            }
        }
        function verificoEmail() {
            if (email !== "" && email2 !== "") {
                if (email === email2) {
                    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
                        setErrEmail("")
                        return true
                    } else {
                        setErrEmail("Mail invalido")
                        return false
                    }
                } else {
                    setErrEmail("Los Email no coinciden")
                    return false
                }
            } else {
                setErrEmail("Debe completar este campo")
                return false
            }
        }

        if (verificoName() && verificPhone() && verificoEmail() && verificoPass()) {
            registerUser()
        }
    }

    // REGISTRO USUARIO//
    function registerUser() {
        setLoading(true)
        fireAuth().createUserWithEmailAndPassword(email, pass)
            .then((resp) => {
                console.log(resp);
                const db = getFirestore()
                const users = db.collection("users");
                let userNew = {
                    displayName: name,
                    email: email,
                    phoneNumber: phone,
                    uid: resp.user.uid,
                    photoUrl: resp.user.photoURL
                }
                users.add(userNew)
                    .then((resp) => {
                        console.log(resp);
                    }).catch(err => {
                        console.log(err)
                    })
                setModal(false);
                setErrRegister("");
                setName("");
                setPhone("");
                setEmail("");
                setEmai2("")
                setPass("");
                setPass2("");
            })
            .catch(function (error) {
                setErrRegister(error.message);
                console.log(error.message);
            }).finally(() => {
                setLoading(false)
            })
    }

    //LOGIN DE USUARIO//
    function signInUser() {
        setLoading(true)
        fireAuth().signInWithEmailAndPassword(emailLogin, passLogin)
            .then((res) => {
                console.log("mail:" + res.user.email + "Uid:" + res.user.uid)
                setErrLogin("")
                setEmailLogin("")
                setPassLogin("")
                setModal(false)
            })
            .catch((error) => {
                setErrLogin(error.message)
                console.log("error", error.message)
            }).finally(() => {
                setLoading(false)
            })
    }



    //LOGIN REDES SOCIALES//
    function socialLogin(provider) {
        setLoading(true)
        fireAuth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
                const db = getFirestore()
                const users = db.collection("users");
                users.where('uid', '==', result.user.uid).get()
                    .then((querySnapshot) => {
                        if (querySnapshot.docs.length === 0) {
                            let userNew = {
                                displayName: result.user.displayName,
                                email: result.user.email,
                                phoneNumber: result.user.phoneNumber,
                                uid: result.user.uid,
                                photoURL: result.user.photoURL
                            }
                            users.add(userNew)
                                .then((resp) => {
                                    console.log(resp);
                                    MountUser(result.user.uid)
                                }).catch(err => {
                                    console.log(err)
                                })
                        }
                    })
                setErrLogin("")
            })
            .catch(error => {
                setErrLogin(error.message)
                console.log(error);
            }).finally(() => {
                setLoading(false)
                setModal(false)
            });
    }

    return (

        <div className={modal ? "containerBackground showContainer" : "containerBackground hideContainer"}>
            {loading ? <Loader /> : null}
            <div style={{ width: "23rem", margin: "auto", backgroundColor: "white" }}>
                <i className="fas fa-times" style={{ color: "grey", cursor: "pointer", padding: "0.8rem", float: "right" }} onClick={() => setModal(false)}></i>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#login" role="tab">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#registro" role="tab">Registro</a>
                    </li>
                </ul>
                <div className="tab-content" style={{ minHeight: "30rem" }}>

                    {/* LOGIN */}
                    <div className="login-form tab-pane active" id="login" role="tabpanel">
                        <div className="form-group">
                            <input onChange={(e) => setEmailLogin(e.target.value)} type="email" className="form-control" placeholder="Usuario" required="required" value={emailLogin} />
                        </div>
                        <div className="form-group">
                            <input onChange={(e) => setPassLogin(e.target.value)} type="password" className="form-control" placeholder="Password" required="required" value={passLogin} />
                        </div>
                        <span className="text-danger">{errLogin}</span>
                        <div className="form-group">
                            <button onClick={() => signInUser()} type="submit" className="btn btn-dark btn-block">Ingresar</button>
                            <div className="opcion">Si no cuentas con un usuario, haz clic en la pestaña <strong>REGISTRO</strong>.</div>
                            <hr></hr>
                            <button onClick={() => socialLogin(googleAuthProvider)} type="submit" style={{ backgroundColor: " #dc4e41", color: "white", fontWeight: "bold" }} className="btn btn-block"><span style={{ lineHeight: 0, fontSize: "1.3rem", marginRight: 7 }}><i className="fab fa-google"></i></span> <span>  Continuar con Google</span></button>
                            <button onClick={() => socialLogin(facebookAuthProvider)} type="submit" style={{ backgroundColor: "#4267b2", color: "white", fontWeight: "bold" }} className="btn btn-block"><span style={{ lineHeight: 0, fontSize: "1.3rem", marginRight: 7 }}><i className="fab fa-google"></i></span> <span>  Continuar con Facebook</span></button>
                        </div>
                    </div>


                    {/* REGISTRO */}
                    <div className="login-form tab-pane" id="registro" role="tabpanel">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input onChange={(e) => setName(e.target.value)} id="inputName" type="text" className="form-control" placeholder="Nombre y Apellido" required="required" value={name} />
                            <span className="text-danger">{errName}</span>
                        </div>
                        <div className="form-group">
                            <label>Telefono</label>
                            <input onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" placeholder="Telefono" required="required" value={phone} />
                            <span className="text-danger">{errPhone}</span>

                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Usuario" required="required" value={email} />
                            <span className="text-danger">{errEmail}</span>

                        </div>
                        <div className="form-group">
                            <label>Confirmar Email</label>
                            <input onChange={(e) => setEmai2(e.target.value)} type="text" className="form-control" placeholder="Usuario" required="required" value={email2} />
                            <span className="text-danger">{errEmail}</span>

                        </div>
                        <div className="form-group">
                            <label>contraseña</label>
                            <input onChange={(e) => setPass(e.target.value)} type="password" className="form-control" placeholder="Password" required="required" value={pass} />
                            <span className="text-danger">{errPass}</span>
                        </div>
                        <div className="form-group">
                            <label>Confirmar contraseña</label>
                            <input onChange={(e) => setPass2(e.target.value)} type="password" className="form-control" placeholder="confirmar contraseña" required="required" value={pass2} />
                            <span className="text-danger">{errPass}</span>

                        </div>
                        <span className="text-danger">{errRegister}</span>
                        <div className="form-group">
                            <button onClick={() => VerificoCampos()} type="submit" className="btn btn-dark btn-block" >Crear cuenta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
