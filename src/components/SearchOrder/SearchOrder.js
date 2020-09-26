import React, { useEffect, useState } from 'react'
import { getFirestore } from "../../firebase";
import Loader from "../Loader/Loader";
import Brief from "../Brief/Brief";


export default function SearchOrder() {
    const [dato, setDato] = useState([]);
    const [msje, setMsje] = useState("");
    const [loading, setLoading] = useState(false);
    const [idOrderSearch, setIdOrderSearch] = useState();

    function searchOrder() {
        setLoading(true)
        const db = getFirestore();
        const orders = db.collection("orders");
        const Order = orders.doc(idOrderSearch ? idOrderSearch : "dsadsa")
        Order.get().then((doc) => {
            if (!doc.exists) {
                console.log("no hay item")
                setDato([])
                setMsje("Numero de orden no encontrada, prueba nuevamente")
                return
            }
            setMsje("")
            setDato(doc.data())
        }).catch((error) => {
            console.log("error buscando items", error);
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="text-center mt-5 container col-md-4">
            {loading ? <Loader /> : null}
            <input onChange={(e) => setIdOrderSearch(e.target.value)} value={idOrderSearch} class="text-center form-control mr-sm-2" type="search" placeholder="Ingresa el número de orden" aria-label="Search" />
            <button onClick={() => searchOrder()} class="btn btn-outline-success w-100 mt-3" type="submit">Search</button>
            <div className="mt-5">
                <Brief state={dato.state} cartProps={dato.items} priceTotal={dato.total}></Brief>
                <strong className="text-danger">{msje}</strong>
            </div>
        </div>
    )
}
