import React, { useContext, useState, useEffect } from 'react';
import { getFirestore } from "../firebase"

export const filterContext = React.createContext();

export const useFilterContext = () => useContext(filterContext);

export function FilterProvider({ value, children }) {
  const [category, setCategory] = useState(value || []);

  useEffect(() => {
    const db = getFirestore();
    const itemCollection = db.collection("categories")
    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("no results")
      } else {
        setCategory(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      }
    }).catch((error) => {
      console.log("error buscando items", error);
    }).finally(() => {
    })
  }, []);

  return <filterContext.Provider value={{ category }}>
    {children}
  </filterContext.Provider>
}