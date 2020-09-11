import React, { useState } from 'react';
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { getFirestore } from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "./styles.css"
import Loader from "../Loader/Loader";

function Cart() {
    const [loading, setLoading] = useState(false);
    const { cart, removeItemCart, quantity, priceTotal, cleanCart } = useCartContext()
    const { usuario } = useUserContext();

    function createOrders() {
        setLoading(true)
        var buyer = {
            name: usuario.displayName,
            mail: usuario.email,
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
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: priceTotal,

        }

        orders.add(newOrders).then(({ id }) => {
            alert("Orden numero " + id);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
            cleanCart()
        });
    }

    function armarCart() {
        const cartLines =
            cart.map((item, index) =>
                <>
                    <hr></hr>
                    <div key={index} style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        <div className="column1" ><img style={{ width: "100%" }} alt={"imageCartItem" + index} src={"../image/items/" + item.image} /></div>
                        <div className="column2">
                            <div className="itemTitle">{item.name}</div>
                            <div className="UnitPrice">Unidad: ${item.price}</div>
                        </div>
                        <div className="column3">Cantidad: {item.count}</div>
                        <div className="column4">${item.AcumulatedPrice}</div>
                        <div className="column5"><i className="fas fa-trash-alt text-danger" style={{ cursor: "pointer" }} onClick={() => removeItemCart(item)}></i></div>
                    </div>
                </>
            )

        return (
            <div className=" container mt-5">
                <div style={{ maxWidth: "43rem", margin: "auto" }}>

                    {cartLines}
                    <hr></hr>
                    <div> Total: ${priceTotal} </div>
                    <button onClick={() => createOrders()} type="button" className="btn btn-info mt-5 ">comprar</button>
                </div>
            </div>
        )

    }

    return (
        <div style={{ textAlign: "center" }}>
            {loading ? <Loader /> : null}
            {quantity > 0 ?
                armarCart()
                :
                <div className="mt-5">
                    <h3>No has seleccionado ningún producto...</h3>
                    <Link to="/"><button type="button" className="btn btn-dark mt-5 ">Volver al Catalogo</button></Link>
                </div>
            }
        </div>
    )
}

export default Cart
