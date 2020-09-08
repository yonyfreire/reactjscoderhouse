import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader"
import { getFirestore } from "../../firebase";
import './styles.css';

function ItemListContainer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState([true]);
    const { category } = useParams()

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("items")
        setLoading(true)

        if (category) {
            const filterCategory = itemCollection.where('category', '==', category);
            filterCategory.get().then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    setProducts([])
                } else {
                    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                }

            }).catch((error) => {
                console.log("error buscando items", error);
            }).finally(() => {
                setLoading(false)
            })
        } else {
            itemCollection.orderBy("name").limit(12).get().then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    setProducts([])
                } else {
                    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                }
            }).catch((error) => {
                console.log("error buscando items", error);
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [category]);

    return (
        <div className="container text-center">
            {loading ?
                <Loader />
                :
                <ItemList products={products} category={category} />
            }
        </div>
    )
}

export default ItemListContainer;