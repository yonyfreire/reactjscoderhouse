import React, {useState} from 'react';
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { getFirestore } from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Loader from "../Loader/Loader";

function Cart() {
    const [loading, setLoading] = useState(false);
    const { cart, removeItemCart, quantity, priceTotal, cleanCart } = useCartContext()
    const { usuario } = useUserContext();

console.log(usuario)

    function createOrders() {
        setLoading(true)
        var buyer = {
            name: usuario.displayName,
            mail: usuario.email,
            phone: usuario.phoneNumber
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

        orders.add(newOrders).then(({id}) => {
            alert("Orden numero " +id);
        }).catch(err =>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
            cleanCart()
        });
    }
console.log(loading);
    function armarCart() {
        const cartLines = cart.map((item, index) =>
            <div key={index}>
                <div style={{ width: "4rem", height: "4rem", display: "inline-block", overflow: "hidden", verticalAlign: "middle", borderRadius: "0.4rem" }}><img style={{ width: "100%" }} alt={"imageCartItem" + index} src={"../image/items/" + item.image} /></div>
                <div> Articulo: {item.name} / cantidad:{item.count} / Unitario: ${item.price}/ Precio: ${item.AcumulatedPrice} / <i className="fas fa-trash-alt text-danger" style={{ cursor: "pointer" }} onClick={() => removeItemCart(item)}></i></div>
            </div>
        )

        return (
            <div className=" container mt-5">
                {cartLines}
                <div> Total: {priceTotal} </div>
                <button onClick={() => createOrders()} type="button" className="btn btn-info mt-5 ">comprar</button>
            </div>
        )

    }

    return (
        <div style={{ textAlign: "center" }}>
            {loading ? <Loader/>:null}
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
