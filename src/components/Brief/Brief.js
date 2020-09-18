import React from 'react'

export default function Brief({ cartProps, priceTotal }) {


    function armarBrief() {
        const cartLines =
            cartProps.map((item, index) =>
                <div key={index} >
                    <hr></hr>
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        {/* <div className="column1" ><img style={{ width: "100%" }} alt={"imageCartItem" + index} src={"../image/items/" + item.image} /></div> */}
                        <div className="column2">
                            <div className="itemTitle">Articulo: {item.name}</div>
                            {/* <div className="UnitPrice">Unidad: ${item.price}</div> */}
                        </div>
                        <div className="column3">X {item.count}</div>
                        <div className="column4">${item.price * item.count}</div>
                    </div>
                </div>
            )
        return (

            <div style={{ maxWidth: "43rem", margin: "auto" }}>
                {cartLines}
                <hr></hr>
                <h5> Total: <strong>${priceTotal}</strong> </h5>
            </div>
        )

    }




    return (
        <div>
            {armarBrief()}
        </div>
    )
}
