import React, { useContext, useState, useEffect } from 'react';
import Data from "../remote/remote";
import { getFirestore } from "../firebase"

export const filterContext = React.createContext();

export const useFilterContext = () => useContext(filterContext);

export function FilterProvider({ value, children }) {
  const [category, setCategory] = useState(value || []);

  function filtroRepetidos(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    const db = getFirestore();
        const itemCollection = db.collection("categories")
        itemCollection.get().then((querySnapshot) => {
        // let datafilter = []
          if (querySnapshot.size === 0) {
              console.log("no results")
          }else{

            setCategory(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

          //   querySnapshot.docs.map((item) => {
          //     return datafilter = [...datafilter, item.data().category]
          //   })
          //   var SinRepetidos = datafilter.filter(filtroRepetidos)
          //   setCategory(SinRepetidos)
          // }
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