import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from '../Components/Cart';
import { useCart } from './ContextReducer';
function Navbar() {
  const items = useCart();
  // Check if the user is logged in based on the token in local storage
  const isLoggedIn = !!localStorage.getItem("token");

  //console.log("Token:", localStorage.getItem("token"));
   const [CartView,setCartView]=useState(false)
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fs-0.5 fst-italic" to="/">Haji Tikka Delights</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 active" aria-current="page" to="/">Home</Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link fs-5 active" aria-current="page" to="/MyOrder">My Orders</Link>
                </li>
              )
             }
            </ul>

            {isLoggedIn ? ( 
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}
                >My Cart {""}
                 <Badge pill bg="danger">{items.length}</Badge>
                </div>

                {CartView ? <Modal onClose={()=>{setCartView(false)}}><Cart></Cart> </Modal>:null }
               
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={() => {
                    // Remove the token from local storage to logout the user
                    localStorage.removeItem("token");
                    // Refresh the page to update the navigation links
                    window.location.reload();
                  }}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-success mx-1" to="/Login">LogIn</Link>
                <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
