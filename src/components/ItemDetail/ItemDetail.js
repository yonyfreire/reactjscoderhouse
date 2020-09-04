import React, { useState } from 'react';
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import './styles.css';

function ItemDetail({ id, name, description, stock }) {
    const [count, setCount] = useState();
    const { addItem } = useCartContext();


    return (
        <>
            {
                id ?
                    <div>
                        <div className="h1" >Detalle del producto</div>
                        <div>Articulo: {name}</div>
                        <div>Descripcion: {description}</div>
                        <div>Disponibles: {stock}</div>
                        <div className="containerCount mt-3">
                            <ItemCount initial={1} min={1} max={stock} count={count} setCount={setCount} />
                            <button type="button" className="w-100 btn btn-info" onClick={() => addItem({ id, name, description, count })} >Agregar al Carrito</button>
                        </div>
                    </div>
                    :
                    <>
                        <h2 className="mt-5">Ups... no existe el producto seleccionado</h2>
                        <Link to="/"><button type="button" className="btn btn-info mt-5 ">Volver a la pagina de inicio</button></Link>
                    </>
            }
        </>
    )
}



export default ItemDetail;