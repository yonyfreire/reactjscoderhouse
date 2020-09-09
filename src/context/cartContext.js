import React, { useContext, useState, useEffect } from 'react';

export const cartContext = React.createContext();

export const useCartContext = () => useContext(cartContext);

export function CartProvider({ value, children }) {
  const [cart, setCart] = useState(value || []);
  const [itemSize, setItemCant] = useState(0);


  useEffect(() => {
    let count = 0
    
    cart.forEach(item => {
      count= count + item.count
     })
     setItemCant(count)
  }, [cart])

  ///Agrego Item nuevo al carro /////
  function addItem(newItem) {
    let exist = 0 // cuando newItem existe en el cart, se setea 1////
    var newCart = []
    /// si el carro ya tiene algun item, ingreso a este if/////
    if (cart.length > 0) {
      cart.forEach(element => {
        /// recorro el cart, si el newItem existe, sumo los count y hago push al newCart///
        if (element.id === newItem.id) {
          exist = 1
          element.count = element.count + newItem.count
          element.AcumulatedPrice = element.price * element.count

          newCart.push(element);
        } else {
          newCart.push(element);
        }
      });
      /// si el newItem no existe, se suma al newCart///
      if (exist===0) {
        newItem.AcumulatedPrice = newItem.price * newItem.count
        
        newCart.push(newItem)
      }

    }else{
      newItem.AcumulatedPrice = newItem.price * newItem.count
      newCart.push(newItem)
    }

      setCart(newCart);
  };

  function cleanCart() {
    setCart([]);
  }

  function removeItemCart(item) {
    const x = cart.filter(cart => item.id !== cart.id)
    setCart(x)

  }


  const priceTotal = cart.reduce((prev, next) => prev + next.AcumulatedPrice, 0);
  // function priceTotal(){
  //   return cart.reduce((prev, next) => prev + next.price, 0);
  // }

  return <cartContext.Provider value={{ cart, addItem, quantity: cart.length, cleanCart, itemSize, removeItemCart, priceTotal }}>
    {children}
  </cartContext.Provider>
}