import React, { useContext, useState, useEffect } from 'react';
import Data from "../remote/remote"
export const filterContext = React.createContext();

export const useFilterContext = () => useContext(filterContext);

export function FilterProvider({ value, children }) {
  const [category, setCategory] = useState(value || []);

  function filtroRepetidos(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getFilterCategory() {
    return new Promise((resolve, reject) => {
      resolve(
        Data
      );
    });
  }

  useEffect(() => {
    getFilterCategory().then(resp => {
      let datafilter = []
      resp.map((item) => {
        return datafilter = [...datafilter, item.category]
      })
      var SinRepetidos = datafilter.filter(filtroRepetidos)
      setCategory(SinRepetidos)
    })
  }, []);

  return <filterContext.Provider value={{ category }}>
    {children}
  </filterContext.Provider>
}