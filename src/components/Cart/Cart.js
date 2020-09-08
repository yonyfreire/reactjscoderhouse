import React from 'react';
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext"
function Cart() {
    const { cart, removeItemCart, quantity } = useCartContext()

    function armarCart() {
        const cartLines = cart.map((item, index) =>
            <div key={index}><div style={{width:"4rem", height:"4rem", display: "inline-block", overflow:"hidden", verticalAlign:"middle", borderRadius:"0.4rem" }}><img style={{width:"100%"}} alt={"imageCartItem"+index} src={"../image/items/" + item.image}/></div>Articulo: {item.name} / cantidad:{item.count} / Precio: ${item.price} / <i className="fas fa-trash-alt text-danger" style={{ cursor: "pointer" }} onClick={() => removeItemCart(item)}></i></div>
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
