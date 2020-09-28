import React from 'react';
import { Link } from "react-router-dom";
import Item from "../Items/Item";

function ItemList({ products, category }) {
    return (
        <>
            <div style={{ justifyContent: "center", display: "flex", flex: "1 0 100%", marginTop: "2rem", flexWrap: "wrap" }} >
                {products.length > 0 ?
                    products.map((prod, index) =>
                        <Item image={prod.image} key={index + prod.id} name={prod.name} description={prod.description} id={prod.id} stock={prod.stock} price={prod.price} />
                    )
                    :
                    <>
                        <h4>Esta categoria no tiene productos asociados...</h4>
                        <Link to="/"><button type="button" className="btn btn-dark ">Volver a la pagina de inicio</button></Link>
                    </>
                }
            </div>
        </>
    )
}


export default ItemList;