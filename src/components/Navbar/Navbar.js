import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
// import { Link } from 'react-router-dom';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  let HomeURL='/posts';
  let UploadURL='/admin';
  let AutURL='/auth';
  let AdminURL='/adminDashboard';
  let ClientURL= '/clientDashboard';

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div>
    <div className="site-mobile-menu">
             <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
               <span className="icon-close2 js-menu-toggle"></span>
              </div>
             </div>
            <div className="site-mobile-menu-body"></div>
           </div>
           <header className="site-navbar container py-0 " role="banner">
             

  <div id="hom" className="row align-items-center">
    <div className="col-6 col-xl-2">
      <h1 className="mb-0 site-logo">
          <a href={HomeURL} className="text-white mb-0">
              <img src="images/Logo1.png" style={{width:250}}/>
          </a></h1>
    </div>
   
    <div className="col-12 col-md-10 d-none d-xl-block">
      <nav className="site-navigation position-relative text-right" role="navigation">

        <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
          {/* you can see admin page with out login on below link*/}
          <li>
          {/* <a  style={{marginRight:3}}  href={AdminURL}> Manage</a> */}
      
             
    
          <a href="">About</a>
          </li>
        {user?.result ? (
          
          <li  >
           
            {(JSON.parse(localStorage.getItem('profile')).result.role == 'BUSINESS') && (
              <a href={ClientURL}> Manage Business</a>
            )}
              
          <a  href={AutURL} onClick={logout} className="text-white mb-0">
               Logout
          </a>

      
       
          </li>
         
        ) : (
        
          <li>
         <a href={AutURL} className="cta"><span className="bg-primary text-white rounded">
              Sign In</span>
          </a>
   
          </li>
        )}
    

         
        </ul>
      </nav>
    </div>


    <div className="d-inline-block d-xl-none ml-auto py-3 col-6 text-right" style={{position: "relative", top: 3}}>
      <a href="#" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3"></span></a>
    </div>

  </div>


</header>
    </div>
   
  );
};

export default Navbar;