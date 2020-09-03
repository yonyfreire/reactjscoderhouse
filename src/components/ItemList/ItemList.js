import React from 'react';
import Item from "../Items/Item"


function ItemList({ products, category }) {
    return (
        <>
            {category ? <h1 className="mt-4">Sección {category[0].toUpperCase() + category.slice(1)}</h1> : null}
            <div style={{ justifyContent: "center", display: "flex", flex: "1 0 100%", marginTop: "2rem", flexWrap: "wrap" }} >
                {products.map((prod, index) =>
                    <Item key={index + prod.id} name={prod.name} description={prod.description} id={prod.id} stock={prod.stock} />
                )}
            </div>
        </>
    )
}


export default ItemList;