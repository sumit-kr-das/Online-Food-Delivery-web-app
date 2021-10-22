import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';
import Products from './components/Products';
import './App.css';


const App = () => {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
