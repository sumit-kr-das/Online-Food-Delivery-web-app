import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart';
import About from './components/About';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import './App.css';

import { cartContext } from './CartContext';
import { useState, useEffect } from 'react';

const App = () => {
  const [cart, setCart] = useState({});

  //fetch from local storage
  useEffect(()=>{
    const cart = window.localStorage.getItem('cart');
    setCart(JSON.parse(cart))
  },[]);

  useEffect(()=>{
    window.localStorage.setItem('cart',JSON.stringify(cart));
  },[cart]);

  return (
    <Router>
      <cartContext.Provider value={{cart, setCart}}>
        <Navigation/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/products" exact component={Products} />
          <Route path="/products/:_id" component={SingleProduct} />
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
        </Switch>
      </cartContext.Provider>
    </Router>
  );
}

export default App;
