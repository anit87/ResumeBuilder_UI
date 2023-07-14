import React, { useState, useEffect } from 'react'
import './Nav.css';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle';
import { lengthcartaction, AllCartCustItems } from '../../redux/action/Action';
import { useDispatch, useSelector } from 'react-redux';



const Nav = () => {
  const [xyz, setxyze] = useState('/package')
  const [checking, setChecking] = useState('')
  const [aboutcheck, setAboutcheck] = useState('')
  const [about, setAbout] = useState('/about')
  const [mobileview, setMobileview] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const cartlengthreducer = useSelector((state) => state.lengthcartreducer.datacartlength)
  // const ItemsCartlengthreducer = useSelector((state) => state.CartItemsLengthReducer.CartItemsLength)
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  console.log("nav " , cartlengthreducer );

  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const frontlogout = () => {
    localStorage.removeItem("frontemail");
    localStorage.removeItem("frontuserid");
  }

  const mobilemenu = () => {
    setMobileview(!mobileview)
  }

  useEffect(() => {
    if (location.pathname === '/linkedin') {
      setChecking('active')
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/process') {
      setAboutcheck('active')
    } else if (location.pathname === '/faq') {
      setAboutcheck('active')
    } else if (location.pathname === '/contactus') {
      setAboutcheck('active')
    }
  }, [location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("frontuserid") != null) {
      dispatch(lengthcartaction(localStorage.getItem("frontuserid")))
      dispatch(AllCartCustItems(localStorage.getItem("frontuserid")))
    }
  }, [dispatch])

  let email = localStorage.getItem("frontemail");
  let usrNme = email?.charAt(0).toUpperCase();

  return (
    <nav className='main_navbar' >
      <div className='upper_nav_div'>
      </div>
      <div className="container-fluid upper-padding">
        <div className="navbar navbar-expand-xl navbar-light ">
          <div className="container-fluid navbar_content " id='container_width'>
            <NavLink className="navbar-brand order-md-1 order-lg-1 order-xl-1" to="/">
              <img src='/assets/images/logo.jpg' alt='logo' className='img-fluid ' />
            </NavLink>
            <div className='wrappering_button_sign order-md-2 order-lg-2 order-xl-2'>
              <button className="custom-toggler navbar-toggler order-md-3 order-lg-3 order-xl-1 order-2" type="button"
                data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className='nav-wrapper order-md-2 order-lg-2 order-xl-2 order-1'>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse for_transition`} id="navbarSupportedContent">
                  <ul className="navbar-nav  mb-2 mb-lg-0 text-uppercase ">
                    <li className="nav-item ">
                      <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item dropdown setatic for-mobile-nav"  >
                      <NavLink className={`nav-link  dropdown-toggle ${checking}`} to={xyz} id="navbarDropdown" role="button"
                        aria-expanded="false" >
                        Package
                      </NavLink>
                      <ul className="dropdown-menu static" aria-labelledby="navbarDropdown">
                        <li ><NavLink className="dropdown-item" to="/linkedin">Linkedin</NavLink></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/books' className="nav-link">books</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/review' className="nav-link">reviews</NavLink>
                    </li>
                    <li className="nav-item dropdown setatic for-mobile-nav"
                    // onClick={()=>props.isNavigate && props.handlePackage(2)}
                    >
                      <NavLink className={`nav-link  dropdown-toggle ${aboutcheck}`} to={about} id="navbarDropdown" role="button"
                        aria-expanded="false">
                        about us
                      </NavLink>
                      <ul className="dropdown-menu static" aria-labelledby="navbarDropdown" >
                        <li><NavLink className="dropdown-item" to="/process">Our Process</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/faq">FAQ</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/contactus">Contact Us</NavLink></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/sample' className="nav-link">sample</NavLink>
                    </li>
                  </ul>
                </div>
                <div className='testing order-md-1 order-lg-1 order-xl-3'>
                  <ul>
                    <li className="nav-item">
                      <div className="d-flex btn__buy my_custom_nav_btn">
                        <NavLink to="/package"><button className="btn " type="submit">order now</button></NavLink>
                      </div>
                    </li>
                    <li className="nav-item dropdown setatic static_icon my-static_icon my-dash-icon hide-user-desktop">
                      {localStorage.getItem("frontuserid") == null ?
                        <NavLink to="/login" className="nav-link  my-customdrophidden" role="button" >
                          <FaUserCircle size={35} />
                        </NavLink>
                        :
                        email ?
                          <div className='nameTxt'>{usrNme}</div> :
                          <FaUserCircle size={35} />
                        // <FaUserCircle size={35} className='login-user' style={{ color: '#9f9f9f' }} />
                      }
                      {localStorage.getItem("frontuserid") == null ?
                        <ul className="dropdown-menu static login-my afterlogin2" aria-labelledby="navbarDropdown" >
                          <li><NavLink className="dropdown-item" to="/login">Log In</NavLink></li>
                          <li><NavLink className="dropdown-item" to="/register">Register</NavLink></li>
                          <li><NavLink className="dropdown-item" to="/package">Order Now</NavLink></li>
                        </ul>
                        :
                        <ul className="dropdown-menu static login-my afterlogin" aria-labelledby="navbarDropdown" >
                          {/* <li><NavLink className="dropdown-item" to="/login">My Account</NavLink></li> */}
                          <li><NavLink className="dropdown-item" to="/order">My Orders</NavLink></li>
                          <li><NavLink className="dropdown-item" to="/" onClick={frontlogout}>Log Out</NavLink></li>
                        </ul>
                      }
                    </li>
                    {/* ////////////////////////////////////////////////mobile button-user//////////////////////////////////////////// */}
                    <li className="nav-item dropdown static_icon my-static_icon my-dash-icon hide-user-mobile">
                      <NavLink to="#" className="nav-link mobileview dropdown-toggle  my-customdrophidden" role="button" onClick={mobilemenu}>
                        {email ? <div className='nameTxt'>{usrNme}</div> : <FaUserCircle size={35} />}
                        {/* <FaUserCircle size={35} /> */}
                      </NavLink>
                      {localStorage.getItem("frontuserid") == null ?
                        <ul className={`dropdown-menu ${mobileview ? 'mobilbuttonuser' : null} login-my afterlogin2`} aria-labelledby="navbarDropdown" >
                          <li><NavLink className="dropdown-item" to="/login">Log In</NavLink></li>
                          <li><NavLink className="dropdown-item" to="/register">Register</NavLink></li>
                          <li><NavLink className="dropdown-item" to="/package">Order Now</NavLink></li>
                        </ul>
                        :
                        <ul className={`dropdown-menu ${mobileview ? 'mobilbuttonuser' : null} login-my afterlogin2`} aria-labelledby="navbarDropdown" >
                          {/* <li><NavLink className="dropdown-item" to="/login">My Account</NavLink></li> */}
                          <li><NavLink className="dropdown-item" to="/order">My Orders</NavLink></li>
                          <li><NavLink className="dropdown-item" to="/" onClick={frontlogout}>Log Out</NavLink></li>
                        </ul>
                      }
                    </li>
                    {/* ////////////////////////////////////////////////mobile button-user////////////////////////////////////////////// */}
                    <li className='cart-icon'>
                      <NavLink to="/cart">
                        <i className="fa-solid fa-cart-shopping" />
                        <span id="_desktop_cart_count" className="site-header__cart-count">
                          {localStorage.getItem("frontuserid") == null ? <span id="CartCount">0</span> :
                            <span id="CartCount">{typeof cartlengthreducer == 'object' ? cartlengthreducer?.length : 0}</span>
                          }
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;