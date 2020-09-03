import React, { useContext, useState } from 'react';

export const cartContext = React.createContext();

export const useCartContext = () => useContext(cartContext);

export function CartProvider({ value, children }) {
  const [cart, setCart] = useState(value || []);
  const [itemSize, setItemCant] = useState(0);

  ///Agrego Item nuevo al carro /////
  async function addItem(newItem) {
    let exist = 0 // cuando newItem existe en el cart, se setea 1////
    let count=0 // contador de articulos ///
    var newCart = []
    /// si el carro ya tiene algun item, ingreso a este if/////
    if (cart.length > 0) {
      cart.forEach(element => {
        /// recorro el cart, si el newItem existe, sumo los count y hago push al newCart///
        if (element.id === newItem.id) {
          exist = 1
          element.count = element.count + newItem.count
          newCart.push(element);
        } else {
          newCart.push(element);
        }
      });
      setCart(newCart);
    }

    /// si el newItem no existe, se suma al newCart///
    if (exist===0) {
      newCart.push(newItem)
      setCart(newCart);
    }
    /// recorro y sumo los count///
    newCart.map((item) => {
      count= count + item.count
      return setItemCant(count)
    })
  };

  function cleanCart() {
    setCart([]);
  }


  function removeItemCart(item) {
    const x = cart.filter(cart => item.id !== cart.id)
    let count = 0
    x.map((item) => {
     return count= count + item.count
    })
    setItemCant(count)
    setCart(x)

  }


  return <cartContext.Provider value={{ cart, addItem, quantity: cart.length, cleanCart, itemSize, removeItemCart }}>
    {children}
  </cartContext.Provider>
}