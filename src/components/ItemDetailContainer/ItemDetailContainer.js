import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail";
import { getFirestore } from "../../firebase"
import Data from "../../remote/remote"

function ItemDetailContainer() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState([true]);
    const { id } = useParams()

    /*  Efecto Montaje */
    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("items")
        const item = itemCollection.doc(id)
        
        item.get().then((doc) => {
            if (!doc.exists) {
                console.log("no hay item")
                return
            }
            setItem({ id: doc.id, ...doc.data() })
        }).catch((error) => {
            console.log("error buscando items", error);
        }).finally(() => {
            setLoading(false)
        })
    }, [id]);

    return (
        <div style={{textAlign:"center"}}>
            {
                loading ? <i style={{ fontSize: "4rem", marginTop: "2rem", color: "#17a2b8" }} className="fas fa-spinner fa-spin"></i> :
                    <ItemDetail exist={item.length}name={item.name} description={item.description} id={item.id} stock={item.stock} />
            }
        </div>
    )
}

export default ItemDetailContainer;