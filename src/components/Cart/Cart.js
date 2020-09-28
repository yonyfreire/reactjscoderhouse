import React from 'react';
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import "./styles.css";

function Cart() {
    const { cart, removeItemCart, quantity, priceTotal } = useCartContext()

    function armarCart() {
        const cartLines =
            cart.map((item, index) =>
                <div key={index} >
                    <hr></hr>
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        <div className="column1" ><img style={{ width: "100%" }} alt={"imageCartItem" + index} src={"../image/items/" + item.image} /></div>
                        <div className="column2">
                            <div className="itemTitle">{item.name}</div>
                            <div className="UnitPrice">Unidad: ${item.price}</div>
                        </div>
                        <div className="column3">Cantidad: {item.count}</div>
                        <div className="column4">${item.AcumulatedPrice}</div>
                        <div className="column5"><i className="fas fa-trash-alt text-danger" style={{ cursor: "pointer" }} onClick={() => removeItemCart(item)}></i></div>
                    </div>
                </div>
            )

        return (
            <div className=" container mt-5">
                <div style={{ maxWidth: "43rem", margin: "auto" }}>
                    {cartLines}
                    <hr></hr>
                    <h5> Total: <strong>${priceTotal}</strong> </h5>
                    <div>
                        <Link to="/checkout" type="button" className="btn btn-dark btn-block mt-5">Checkout</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ textAlign: "center" }}>
            {quantity > 0 ?
                <>
                    <div className="text-left p-3"><Link to="/" className="text-decoration-none p-3"><small><i class="fas fa-angle-double-left mr-1"></i>Volver al catalogo</small></Link></div>
                    {armarCart()}
                </>
                :
                <div className="mt-5">
                    <h3>No has seleccionado ningún producto...</h3>
                    <Link to="/"><button type="button" className="btn btn-dark mt-5 ">Volver al Catálogo</button></Link>
                </div>
            }
        </div>
    )
}

export default Cart
