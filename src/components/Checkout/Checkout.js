import React, { useState } from 'react';
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getFirestore } from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Loader from "../Loader/Loader";
import Brief from "../Brief/Brief";
import "./styles.css";



function Checkout() {
    const history = useHistory();
    const { cart, quantity, priceTotal, cleanCart } = useCartContext()
    const { usuario, setShowLogin } = useUserContext();
    const [loading, setLoading] = useState(false);

    function createOrders() {
        setLoading(true)
        console.log(usuario)
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
            alert("Orden numero " + id);
            history.push('/')
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
            cleanCart()
        });
    }
    return (
        <div className=" container mt-5">
            <div style={{ maxWidth: "43rem", margin: "auto" }}>
                {loading ? <Loader /> : null}
                {quantity > 0 ?
                    <div>
                        <Brief cartProps={cart} priceTotal={priceTotal} quantity={quantity}></Brief>
                        {usuario ?
                            <div>
                                <div>Datos del Usuario</div>
                                <div>Nombre: {usuario.displayName}</div>
                                <div>mail: {usuario.email}</div>
                                <div>Telefono: {usuario.phoneNumber}</div>
                                <button onClick={() => createOrders()} type="button" className="btn btn-success btn-block mt-5"> Finalizar Compra de <strong> {usuario.displayName} </strong></button>
                            </div>
                            :
                            <div>
                                <div>Debes ingresar o registrarte para finalizar la compra</div>
                                <button onClick={() => setShowLogin(true)} type="button" className="btn btn-danger btn-block mt-5"> ingresa tus datos</button>
                            </div>
                        }
                    </div>
                    :
                    <div className="mt-5">
                        <h3>No hay articulos en esta compra</h3>
                        <Link to="/"><button type="button" className="btn btn-dark mt-5 ">Inicio</button></Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Checkout
