import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyNavbar from "./components/Navbar";
import Home from './components/Home';
import Footer from './components/Footer';
import './style.css';
import Register from './components/Register';
import Login from './components/Login';
import { Card } from 'react-bootstrap';
import Cart from './components/Cart';
import Pizza from './components/Pizza';

function App() {

  return (
    <>
      <MyNavbar />
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
      <Pizza />
      <Footer />

    </>
  )
}

export default App
