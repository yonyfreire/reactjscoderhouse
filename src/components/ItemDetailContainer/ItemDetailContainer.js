import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader"
import { getFirestore } from "../../firebase";

function ItemDetailContainer() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState([true]);
    const { id } = useParams()

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
        <div style={{ textAlign: "center" }}>
            {
                loading ?
                    <Loader />
                    :
                    <ItemDetail price={item.price} image={item.image} name={item.name} description={item.description} id={item.id} stock={item.stock} />
            }
        </div>
    )
}

export default ItemDetailContainer;