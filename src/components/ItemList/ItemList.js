import React from 'react';
import Item from "../Items/Item"


function ItemList({ products }) {
    return (
        <div  style={{justifyContent:"center", display:"flex", flex:"1 0 100%", marginTop:10, flexWrap:"wrap"}} >
                {products.map((prod, index) =>
                    <Item key={index + prod.id} name={prod.name} description={prod.description} id={prod.id} stock={prod.stock}/>
                )}
        </div>
    )
}


export default ItemList;