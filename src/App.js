import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import { CartProvider } from "./context/cartContext";
import { FilterProvider } from "./context/filterContext";
import { UserProvider } from "./context/userContext";
import NavBar from "./containers/NavBar.jsx";
import Footer from "./components/Footer/Footer"
import Home from "./containers/Home.jsx";
import Cart from "./components/Cart/Cart"
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {

  return (
    <UserProvider value={[]}>
      <FilterProvider value={[]}>
        <CartProvider value={[]}>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/item/:id">
                <ItemDetailContainer />
              </Route>
              <Route path="/categories/:category">
                <ItemListContainer />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
            </Switch>
            <Footer/>
          </BrowserRouter>
        </CartProvider>
      </FilterProvider>
    </UserProvider>
  );
}

export default App;
