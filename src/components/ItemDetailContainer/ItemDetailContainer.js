import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail";
import Data from "../../remote/remote"

function ItemDetailContainer() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState([true]);
    const { id } = useParams()

    /* llamado de datos*/
    function getItem(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    Data.filter(Data => Data.id === id)
                );
            }, 500);
        });
    }

    /*  Efecto Montaje */
    useEffect(() => {
        getItem(id).then(resp => {
            setItem(resp[0])
            setLoading(false)
        })
    }, [id]);

    return (
        <div style={{textAlign:"center"}}>
            {
                loading ? <i style={{ fontSize: "4rem", marginTop: "2rem", color: "#17a2b8" }} className="fas fa-spinner fa-spin"></i> :
                    <ItemDetail name={item.name} description={item.description} id={item.id} stock={item.stock} />
            }
        </div>
    )
}

export default ItemDetailContainer;