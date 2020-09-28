import React from 'react'

export default function Brief({ cartProps, priceTotal, state }) {

    function armarBrief() {
        const cartLines =
            cartProps.map((item, index) =>
                <div key={index} >
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center", marginBottom: "1rem" }}>
                        <div style={{ width: "20rem", textAlign: "initial" }}>
                            <strong>Artículo: {item.name}</strong>
                        </div>
                        <div style={{ width: "10rem" }}>X {item.count}</div>
                        <strong>${item.price * item.count}</strong>
                    </div>
                </div>
            )
        return (
            <div style={{ maxWidth: "43rem", margin: "auto" }}>
                <h4><u>Detalles de la compra</u></h4>
                <hr></hr>
                {cartLines}
                <hr></hr>
                {state?<div>Estado: <strong>{state}</strong></div>: null}
                <hr></hr>

                <h5> Total: <strong>${priceTotal}</strong> </h5>
            </div>
        )
    }

    return (
        <div>
            {cartProps ?
                armarBrief()
                :
                null
            }
        </div>
    )
}
