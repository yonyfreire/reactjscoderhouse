import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext"
function Cart() {
    const { cart, removeItemCart, quantity } = useContext(cartContext)

    function armarCart() {
        const cartLines = cart.map((item, index) =>
            <div key={index}>Articulo: {item.name} / Detalle: {item.description} / cantidad:{item.count} / <i className="fas fa-trash-alt text-danger" style={{ cursor: "pointer" }} onClick={() => removeItemCart(item)}></i></div>
        )
        return (
            <div className=" container mt-5">

                {cartLines}
                <button onClick={() => console.log(cart)} type="button" className="btn btn-info mt-5 ">comprar</button>
            </div>
        )

    }

    return (
        <div style={{ textAlign: "center" }}>

            {/* <span className="h4">PAGINA CON DETALLES DEL CARRO</span> */}
            {quantity > 0 ?
                armarCart()
                :
                <div className="mt-5">
                    <h1>Tu Carro esta vacío...</h1>
                    <Link to="/"><button type="button" className="btn btn-info mt-5 ">Volver al Catalogo</button></Link>
                </div>
            }
        </div>
    )
}

export default Cart
