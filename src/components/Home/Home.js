import React,{Component,useState, useEffect} from "react"
import {Link, Route, useHistory, useLocation} from "react-router-dom"



import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionTypes';
import HomePosts from "../Posts/HomePosts";

import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';

import useStyles from './styles';

import {getCategories} from '../../actions/category';

import { getPostsBySearch, postsByCategory } from '../../actions/posts';

import Pagination from '../Pagination';
import Navbar from "../Navbar/Navbar";
import Category from "./Category";


/*className Home extends Component {
  constructor(){
    super()
    this.state={
      lisdata:companyData
    }
  }*/
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const Home =()=>{
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const descriptionQuery=query.get('descriptionQuer');
    const [search, setSearch] = useState('');
    const [description, setSearchh] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [currentId, setCurrentId] = useState(0);
    const [category, setCategory] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
 /* const newlist= this.state.lisdata.map(item => {
    return <ListingCard key={item.id} product={item}/>
  })*/
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const searchPost = () => {
    if (search.trim() ) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/`);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    if (category) {
      dispatch(postsByCategory(category));
    }
  },[dispatch, category])
  const { categories} = useSelector((state) => state.category);

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


  
     return(
      
       

        <div className="site-wrap">
            <Navbar/>
<div className="site-blocks-cover overlay" style={{backgroundImage: "url(./images/hero_2.jpg)"}}>
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">

          <div style={{paddingBottom: 200}} className="col-md-12">
           

            <div className="form-search-wrap" data-aos="fade-up" data-aos-delay="200">
              <form method="post">
              <div  style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                  
                  <div className="col-lg-12 mb-4 mb-xl-0 col-xl-5">
                    <div >
                   
                      <TextField onKeyDown={handleKeyPress} name="search" style={{  backgroundColor: 'white',}} variant="filled" label="Company Name" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                   
                    </div>
                    
                  </div>
              
                  <div className="">
                  <Button onClick={searchPost}  variant="contained" color="secondary">Search</Button>
                  </div>
                  
                </div>
              </form>
            </div>
             

          </div>
        </div>
      </div>
    </div> 
    <div className="site-section " style={{backgroundColor:"white"}}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-9 text-center border-primary">
            <h2 className="font-weight-light text-primary">Add your business to Ethio Business in 3 steps</h2>
            <p className="color-black-opacity-5">See The Steps</p>
          </div>
        </div>
        <div className="row mb-1 align-items-stretch">
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div className="h-entry">
              <i className="fa fa-user" style={{ marginLeft: 100, fontSize: 100}}></i>
              <h2 className="font-size-regular">1. Claim Your Listing Account</h2>
              
              <p>If you have an existing account login to have access to the listing area or claim your FREE listing account. If your business has multiple location or if you have multiple business you can able to add them using one account.</p>
            </div> 
          </div>
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div className="h-entry">
              <i className="fa fa-list" style={{ marginLeft: 100, fontSize:100}}></i>
              <h2 className="font-size-regular">2. Complete your listing Profile</h2>
             
              <p>Adding comprehensive information about your business helps you tell the best story about your business. You can add your business detail, photos of your product & services, services offered and list the various ways customers can reach your business.</p>
            </div> 
          </div>
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div className="h-entry">
              <i className="fa fa-desktop" style={{marginLeft: 100,  fontSize: 100}}></i>
              <h2 className="font-size-regular">3. Publicize Your Listing</h2>
              <p>Your business listing, products and services will reach thousands of potential business owners and individuals’ who visited our business directory. Your business listing will remain found in our website and throughout the glob instantly.</p>
            </div>
          </div>

        </div>
      </div>
    </div> 
    <div className="site-section">
      <div className="container">
        <div className="row">
           <div className="col-lg-3 " >
             <div className="jumbotron">
      
        
            <h2 style={{fontWeight:"bolder"}} >Directories</h2>
          
          <Category categories={categories} setCategory={setCategory} />
         
        
    </div>
    </div>
       
        
        <div className="col-lg-7">
          
           <div>
           <HomePosts setCurrentId={setCurrentId} />
           </div>
           {(!searchQuery ) && (
           <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
            <br/>
  
        
          
      
        </div>
      <div className="col-lg-2">
      <div id="content">
        
        <img src={"images/ads2.jpg"} alt="Image" className="img-fluid" style= {{paddingBottom: 5, borderStyle: "groove", borderRadius: 3, height: 600}}/>  
        
       
      </div>
    </div>
        </div>
      </div>
    
    </div>

       
       
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-100">
            <div className="row">
              <div className="col-md-6">
                <h2 className="footer-heading mb-4">About</h2>
                <p>Hi, We're Ethio Business Online Business Directoy,We help people discover your business.</p>
              </div>

              <div className="col-md-3">
                <h2 className="footer-heading mb-3">Navigations</h2>
                <ul className="list-unstyled">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Business Listing</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h2 className="footer-heading mb-3">Follow Us</h2>
                <a href="#" className="pl-0 pr-3"><span className="icon-facebook"></span></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-twitter"></span></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-instagram"></span></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></a>
              </div>
            </div>
          </div>

        </div>
        <div className="row pt-5  text-center">
          <div className="col-md-12">
            <div className="border-top pt-5">
            <p>

             All rights reserved |&copy; 2021 Ethio BUSINESS ONLINE BUSINESS DIRECTORY.

            </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
       
       
        </div>
         );
        
    }


export default Home;