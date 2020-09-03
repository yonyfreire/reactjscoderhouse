import React from 'react';
import {NavLink} from "react-router-dom"
import {useCartContext} from "../../context/cartContext"
import './styles.css';

function CartIcon() {
  const {itemSize} = useCartContext();

    return (
        <div>
            <NavLink to="/cart">
            {itemSize>0 ? <span className="globoCart">{itemSize}</span>:null}
            <i className="fas fa-shopping-cart pointer" style={{color:"grey", padding:"1rem" }} ></i>
            </NavLink>
        </div>
    )
}

export default CartIcon
