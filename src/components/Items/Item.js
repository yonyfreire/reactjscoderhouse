import React from 'react';
import {Link} from "react-router-dom"
import './styles.css';

function Item({ id, name, description, stock }) {
    return (
        <div className="card col-xl-3 col-sm-6 col-md-4 pointer" >
            <div className="card-body">
                <img style={{width:"100%"}} alt="id"src="https://s.fenicio.app/f/tex/productos/1-celeste2_1920-1200_1536261400_189.jpg"></img>
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Stock:  {stock}</h6>
                <p className="card-text">{description}</p>
            <Link to={`/item/${id}`}>
                <button>Ver detalle</button>
            </Link>
            </div>
        </div>

    )
}


export default Item;