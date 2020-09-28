import React, { useState } from 'react';
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { getFirestore } from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Loader from "../Loader/Loader";
import Brief from "../Brief/Brief";
import "./styles.css";

function Checkout() {
    const { cart, quantity, priceTotal, cleanCart } = useCartContext()
    const { usuario, setShowLogin } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [finishBuy, setFinishBuy] = useState(false);
    const [orderNumber, setorderNumber] = useState("");

    function createOrders() {
        setLoading(true)
        var buyer = {
            name: usuario.displayName,
            email: usuario.email,
            phone: usuario.phoneNumber,
            uid: usuario.uid
        }
        var items = cart.map((e) =>
            ({
                id: e.id,
                name: e.name,
                price: e.price,
                count: e.count
            })
        )
        const db = getFirestore()
        const orders = db.collection("orders");
        const newOrders = {
            buyer: buyer,
            items: items,
            state: "generada",
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: priceTotal,
        }

        orders.add(newOrders).then(({ id }) => {
            setorderNumber(id)
            setFinishBuy(true)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
            cleanCart()
        });
    }
    
    return (
            <div className=" container mt-5 text-center">
                <div style={{ maxWidth: "43rem", margin: "auto" }}>

                    {loading ? <Loader /> : null}
                    {!finishBuy ?
                        quantity > 0 ?
                            <>
                                <div className="text-left p-3"><Link to="/cart" className="text-decoration-none p-3"><small><i class="fas fa-angle-double-left mr-1"></i>Editar Orden</small></Link></div>
                                <div>
                                    <Brief cartProps={cart} priceTotal={priceTotal}></Brief>
                                    {usuario ?
                                        <div>
                                            <h4 className="mt-5"><u>Datos del Usuario</u></h4>
                                            <div><strong>Nombre:</strong> {usuario.displayName}</div>
                                            <div><strong>mail:</strong> {usuario.email}</div>
                                            <div><strong>Teléfono:</strong> {usuario.phoneNumber}</div>
                                            <button onClick={() => createOrders()} type="button" className="btn btn-success btn-block mt-5"> Finalizar Compra como <strong> {usuario.displayName} </strong></button>
                                        </div>
                                        :
                                        <div>
                                            <button onClick={() => setShowLogin(true)} type="button" className="btn btn-danger btn-block mt-5"> ingresa tus datos</button>
                                            <small><strong>Ingresa con tu usuario o regístrate para finalizar la compra</strong></small>
                                        </div>
                                    }
                                </div>
                            </>
                            :
                            <div className="mt-5">
                                <h3>No hay artículos  en esta compra</h3>
                                <Link to="/"><button type="button" className="btn btn-dark mt-5 ">Inicio</button></Link>
                            </div>
                        :
                        <>
                            <h1 className="p-4 text-success">Felicidades, compra finalizada con éxito</h1>
                            <h3>Número de orden: </h3>
                                <h2><strong> {orderNumber}</strong></h2>
                            <div><small className="m-4">Conserva este número para buscar tu pedido</small></div>
                            <Link to="/"><button type="button" className="btn btn-dark mt-5 ">Volver al catálogo</button></Link>
                        </>
                    }
                </div>
            </div>
    )
}

export default Checkout
