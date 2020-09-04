import React from 'react';
import Item from "../Items/Item"


function ItemList({ products, category }) {
    return (
        <>
            {category ? <div><h1 className="mt-4">Sección {category[0].toUpperCase() + category.slice(1)}</h1><hr style={{color: "grey", width: "68%"}} /></div> : <hr style={{color: "grey", width: "100%"}} />}
            
            <div style={{ justifyContent: "center", display: "flex", flex: "1 0 100%", marginTop: "2rem", flexWrap: "wrap" }} >
                {products.length > 0 ? products.map((prod, index) =>
                    <Item products={products} key={index + prod.id} name={prod.name} description={prod.description} id={prod.id} stock={prod.stock} price={prod.price} />
                    )
                    :
                    <h4>NO EXISTEN PRODUCTOS EN ESTA CATEGORIA..</h4>}
            </div>
        </>
    )
}


export default ItemList;