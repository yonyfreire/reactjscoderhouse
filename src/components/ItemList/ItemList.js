import React from 'react';
import { Link } from "react-router-dom";
import Item from "../Items/Item";

function ItemList({ products, category }) {
    return (
        <>
            {category ? <div><h1 className="mt-4">Sección {category[0].toUpperCase() + category.slice(1)}</h1><hr style={{ color: "grey", width: "68%" }} /></div> : <div><h2 className="mt-4">Ofertas Destacadas <i className="far fa-star"></i></h2><hr style={{ color: "grey", width: "100%" }} /></div>}
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