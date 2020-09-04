import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"
import ItemList from "../ItemList/ItemList";
import Data from "../../remote/remote";
import './styles.css';

function ItemListContainer() {
    const [products, setProducts] = useState ([]);
    const [loading, setLoading] = useState ([true]);
    const { category } = useParams()


    function getProducts() {
        setLoading(true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    Data
                );
            }, 500);
        });
    }

    useEffect(()=>{
        getProducts().then(resp =>{
            if (category) {
             setProducts(resp.filter(resp => resp.category === category))
             setLoading(false)
            } else {
                setProducts(resp)
                setLoading(false)
            }
        })
    }, [category]);
    
    return (
        <div className="container text-center">
            {loading ? <i style={{fontSize:"4rem", marginTop:"2rem", color:"#17a2b8"}} className="fas fa-spinner fa-spin"></i> : 
            <ItemList products={products} category={category}/>
            }
        </div>
    )
}

export default ItemListContainer;