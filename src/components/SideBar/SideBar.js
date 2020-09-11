import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { fireAuth } from "../../firebase";
import { useFilterContext } from "../../context/filterContext";
import './styles.css';
import { useUserContext } from "../../context/userContext";
import Login from "../Login/Login"

function SideBar({ show, changeShowState }) {
    const { category } = useFilterContext();
    const { usuario } = useUserContext();
    const [modal, setModal] = useState(false);

console.log(usuario)
    return (
        <div>
            <div className={show ? "containerBar showBar" : "containerBar hideBar"}>

                <div style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
                    <Link to="/" onClick={changeShowState} style={{ color: "grey", cursor: "pointer", textDecoration: "none", padding: "0.5rem" }}>
                        <i className="fas fa-home"></i>
                    </Link>
                    <i onClick={changeShowState} style={{ color: "grey", cursor: "pointer", padding: "0.5rem" }} className="fas fa-times"></i>
                </div>

                <div style={{ justifyContent: "center", display: "flex", alignItems: "center", marginTop: "1rem" }}>
                    {usuario ? <img style={{ width: 35, borderRadius: "50%", marginRight: "0.5rem" }} alt="imgUser" src={usuario.photoURL ? usuario.photoURL : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}></img> : null}
                    <div>
                        <div>
                            {usuario ?
                                usuario.displayName ?
                                    usuario.displayName :
                                    usuario.email :
                                <div >
                                    <button type="button" className="btn btn-outline-secondary " onClick={()=>setModal(true)}>
                                        inciar sesion
                                </button>
                                </div>
                            }
                        </div>
                        {usuario ?
                            <span onClick={() => fireAuth().signOut()} style={{ cursor: "pointer", fontSize: "0.6rem", float: "right", backgroundColor: "grey", color: "white", borderRadius: "7px", paddingLeft: "5px", paddingRight: "5px", textDecoration: "none" }}>
                                Cerrar Sesion
                        </span>
                            :
                            null
                        }

                    </div>
                </div>

                <div style={{ justifyContent: "start", display: "flex", flexDirection: "column", marginTop: "1rem" }}>
                    <hr style={{ color: "grey", width: "80%", marginLeft: "0" }} />

                    <Link className="link mb-2" to={`/`} onClick={changeShowState}><i className="fas fa-home"></i> Inicio</Link>
                    <Link className="link mb-2" onClick={changeShowState} to="/cart"><i className="fas fa-shopping-cart"></i> Mi Carrito</Link>
                    <hr style={{ color: "grey", width: "80%", marginLeft: "0" }} />

                    <span style={{ fontWeight: "bold", color: "grey" }}>Categorías</span>
                    {category.map((cat, index) =>
                        <NavLink onClick={changeShowState} className="navLink" activeClassName="activeNavLink" to={`/categories/${cat.key}`} key={index}>{cat.description}</NavLink>
                    )}
                </div>

            </div>

            <div onClick={changeShowState} className={show ? "containerBack showCont" : "containerBack hideCont"}></div>
            
            
           
                <Login setModal={setModal} modal={modal}></Login>
           
        </div>
    )
}

export default SideBar