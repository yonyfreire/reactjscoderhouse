import React from 'react';
import { Link } from "react-router-dom"
import './styles.css';

function Item({ id, name, description, stock }) {
    return (
        <div className="col-xl-3 col-sm-6 col-md-4" >
                <div className="bodyItem">
            <Link to={`/item/${id}`}>
            <div className="img-contenedor">
                    <img style={{ width: "100%" }} alt={"img"+id} src="https://s.fenicio.app/f/tex/productos/1-celeste2_1920-1200_1536261400_189.jpg"></img>
                    </div>
            </Link>
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Stock:  {stock}</h6>
                    <p className="card-text">{description}</p>
                </div>
        </div>

    )
}


export default Item;