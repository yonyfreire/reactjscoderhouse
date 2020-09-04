import React, { useState} from 'react';
import {useCartContext} from "../../context/cartContext"
import ItemCount from "../ItemCount/ItemCount";
import './styles.css';

function ItemDetail({ id, name, description, stock }) {
    const [count, setCount] = useState();
    // const {cart, provideCart} = useContext(cartContext)
  const { addItem } = useCartContext();


    return (
        <div>
            <div className="h1" >Detalle del producto</div>
            <div>Articulo: {name}</div>
            <div>Descripcion: {description}</div>
            <div>Disponibles: {stock}</div>
            <div className="containerCount mt-3">
                <ItemCount initial={1} min={1} max={stock} count={count} setCount={setCount} />
                <button type="button" className="w-100 btn btn-info" onClick={()=>addItem({id, name, description, count})} >Agregar al Carrito</button>
            </div>
        </div>
    )
}



export default ItemDetail;