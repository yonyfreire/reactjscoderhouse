import React, { useState } from 'react';
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import './styles.css';

function ItemDetail({ id, name, description, stock, image, price }) {
    const [count, setCount] = useState();
    const { addItem } = useCartContext();

    return (
        <>
            {
                id ?
                    <div className="row mt-5" style={{ backgroundColor: "#e2dfd84a", margin: "0" }}>
                        <div className="col-md-7 img-detailContainer">
                            <img alt={"img" + id} src={"../image/items/" + image}></img>
                        </div>
                        <div className="col-md-5  detailItemContainer">
                            <div>
                                <h1 className="titulo" >{name}</h1>
                                <div class="precios"> <span class="precio venta"><span class="sim">UYU</span> <span class="monto">{price}</span></span> </div>
                                <div className=" mt-3">
                                    <ItemCount initial={1} min={1} max={stock} count={count} setCount={setCount} />
                                </div>
                                <button type="button" className="w-100 btn btn-dark" onClick={() => addItem({ id, name, description, price, count, image })} >Agregar al Carrito</button>
                                <div className="description"><p><strong>DESCRIPCION:</strong><br /><br /> {description}</p></div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <h2 className="mt-5">Ups... no existe el producto seleccionado</h2>
                        <Link to="/"><button type="button" className="btn btn-dark ">Volver a la pagina de inicio</button></Link>
                    </>
            }
        </>
    )
}



export default ItemDetail;