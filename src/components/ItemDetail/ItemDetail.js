import React, { useState } from 'react';
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import ItemCount from "../ItemCount/ItemCount";
import { Modal } from 'react-bootstrap';
import './styles.css';

function ItemDetail({ id, name, description, stock, image, price }) {
    const [count, setCount] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { addItem } = useCartContext();
    const handleShow = () => setShow(true);

    async function addAndModal() {
        setLoading(true)
        await addItem({ id, name, description, price, count, image })
        setLoading(false)
        handleShow()
    }

    return (
        <>
            {loading ? <Loader /> : null}
            {
                id ?
                    <>
                        <div className="text-left p-3"><Link to="/" className="text-decoration-none p-3 "><small><i class="fas fa-angle-double-left mr-1"></i>Volver al catalogo</small></Link></div>
                        <div className="row" style={{ backgroundColor: "#e2dfd84a", margin: "0" }}>
                            <div className="col-md-7 img-detailContainer">
                                <img alt={"img" + id} src={"../image/items/" + image}></img>
                            </div>
                            <div className="col-md-5  detailItemContainer">
                                <div>
                                    <h1 className="titulo" >{name}</h1>
                                    <div class="precios"> <span class="precio venta"><span class="sim">UYU</span> <span class="monto">{price}</span></span> </div>
                                    <div className=" mt-3">
                                        <ItemCount initial={1} min={1} max={stock} count={count} setCount={setCount} />
                                    </div>
                                    <button type="button" className="w-100 btn btn-dark" onClick={() => addAndModal()} >Agregar al Carrito</button>
                                    <div className="description"><p><strong>DESCRIPCION:</strong><br /><br /> {description}</p></div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <h2 className="mt-5">Ups... no existe el producto seleccionado</h2>
                        <Link to="/"><button type="button" className="btn btn-dark ">Volver a la pagina de inicio</button></Link>
                    </>
            }

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <div className="text-center align-items-center">
                        <img className="w-75 m-auto" alt={"img" + id} src={"../image/items/" + image}></img>
                        <h3 className="m-3">Articulo agregado correctamente</h3></div>
                    <hr></hr>
                    <div className="text-center d-flex justify-content-around">
                        <Link to="/" type="button" className="btn btn-success"><i class="fas fa-home"></i> Seguir Comprando</Link>
                        <Link to="/cart" type="button" className="btn btn-info"><i class="fas fa-shopping-cart "></i>   Ir al Carro</Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}



export default ItemDetail;