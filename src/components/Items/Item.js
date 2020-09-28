import React from 'react';
import { Link } from "react-router-dom"
import './styles.css';

function Item({ id, name, price, image }) {
        return (
                <div className="col-xl-3 col-sm-6 col-md-4" >
                        <div className="bodyItem">
                                <Link to={`/item/${id}`}>
                                        <div className="img-contenedor">
                                                <img style={{ width: "100%" }} alt={"img" + id} src={"../image/items/" + image}></img>
                                        </div>
                                </Link>
                                <h5 className="card-title">{name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Precio:  ${price}</h6>
                        </div>
                </div>
        )
}


export default Item;