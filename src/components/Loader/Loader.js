import React from 'react'

function Loader() {
    return (
        <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background:" #ffffffa6", position:" absolute", width: "100vw", zIndex: 3000, top: 0, left:0}}>
            <i style={{ fontSize: "4rem", color: "#00000078" }} className="fas fa-spinner fa-spin"></i>
        </div>
    )
}

export default Loader
