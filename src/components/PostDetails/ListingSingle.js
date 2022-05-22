import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import { Comment } from './Comment/Comment';
import { PostComment } from './Comment/PostComment';
import Navbar from '../Navbar/Navbar';
import Category from '../Home/Category';
import { getCategories } from '../../actions/category';
import image1 from "../../images/hero_1.jpg";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/js/bootstrap.min.js';
const ListingSingle = () => {
  const { post, posts, isLoading, comments} = useSelector((state) =>{
    console.log(state);
    return state.posts
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  useEffect(() => {
    dispatch(getCategories());
  },[dispatch])
  const { categories} = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none' }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);


  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  return(
<div className="site-wrap">
<Navbar/>

<div className="overlay" style={{backgroundImage: "url(./images/listingp.jpeg)"}} dat-aos="fade" >

<div className="container">
 <div className="row align-items-center justify-content-center text-center">

   <div className="col-md-10" data-aos="fade-up" data-aos-delay="400">
     
     
     <h1 style={{color: "white", fontWeight: "bolder"}}>Login/Register</h1>
     
    

     
   </div>
 </div>
</div>
</div> 
      
        <div className="container">
        <div className="row">
                <div className="col-12">
                   
                </div>
            </div>

        <div className="row">
          <aside>
          
            <div className="signup">
              <div  className="d-block d-md-flex listing vertical" >
               <div style={{borderColor: "129, 121, 121", borderRadius:5, backgroundColor: "white" , height: 480 }}>
               
                   
                 
               
                 <img src={post.logo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} style= {{width: 250}} alt="Image" className="img-fluid mb-3"/>
                 
               
                 <div className="product-information"> <h4 style={{fontWeight: "bolder"}}>Contact Info</h4><br/><i className="fa fa-location-arrow">  Addis Ababa,ET</i>                  <br/>
                   <a href="tell:011 116022"><i className="fa fa-phone" style={{paddingTop:4}}>  011 116022</i></a> <br/>
                   <a href="tell:091 120130"><i className="fa fa-phone" style={{paddingTop:4}}>  091 120130</i></a> 
                   <br/>
             <div className="grand_social">
             <ul className="social-icons">
                 <li>
                     <a target="_blank" href="#">
                         <i className="fa fa-facebook"></i>
                     </a>
                 </li>
                     <li>
                         <a target="_blank" href="#">
                             <i className="fa fa-twitter"> </i>
                         </a>
                     </li>
                 <li>
                     <a target="_blank" href="#">
                         <i className="fa fa-google-plus">              </i>
                     </a>
                 </li>
                     <li >
                         <a  target="_blank" href="#">
                             <i className="fa fa-pinterest">            </i>
                         </a>
                     </li>
                 <li>
                     <a target="_blank" href="#">
                         <i className="fa fa-linkedin">              </i>
                     </a>
                 </li>
                     <li>
                         <a target="_blank" href="#">
                             <i className="fa fa-dribbble">             </i>
                         </a>
                     </li>
             </ul>
             
             
             
             </div></div>
             
               </div>
             
            </div>
          </div>
         
          </aside>
          
          <div className="section1">
            
            <div id="ratnav" style={{zIndex: 100 }}  className="signup">
              <div  className="d-block d-md-flex listing vertical">
                <div  style={{marginLeft: 15, backgroundColor: "white"}}>
                  
                  
                  <a style={{float: "right", marginRight: 50, marginTop: 25}} href="#" className="bookmark"><span style={{color: "red"}} className="icon-heart"></span></a>
                  <h3  style={{paddingTop: 25 }}>{post.companyName.substring(0, 30)}</h3>
                  
                  <p style={{paddingBottom: 5}} className="mb-0">
                    <span className={(post.averageRating > 0) ? "icon-star text-warning" : "icon-star text-silver"}></span>
                    <span className={(post.averageRating > 1) ? "icon-star text-warning" : "icon-star text-silver"}></span>
                    <span className={(post.averageRating > 2) ? "icon-star text-warning" : "icon-star text-silver"}></span>
                    <span className={(post.averageRating > 3) ? "icon-star text-warning" : "icon-star text-silver"}></span>
                    <span className={(post.averageRating > 4) ? "icon-star text-warning" : "icon-star text-silver"}></span>
                    
                    <span className="review">({post.averageRating} )({post.ratingCount} Reviews)</span>
                  </p>
                  {/* {(user & user.role == "CLIENT") && ( */}
                    <ul className="topside">
                    <li>  <a href="#" data-target="#mymodel" data-toggle="modal"><span className="fa fa-comments" ></span>Leave a review</a></li> 
                </ul>
                  {/* )} */}
                     
   
                 
                </div>
                </div>
                
            </div> 
            <div  className="modal" id="mymodel">
              <div className="modal-dialog">
                  <div className="modal-content">
                  <div className="modal-header">
                  <h3>Insert Review</h3>
        
                  </div>

                  
                  <div className="modal-body">

                    <PostComment postId={id} />

                  </div>


                  </div>

              </div>
           </div>

            <div className="d-block d-md-flex listing vertical">
            <div  style={{marginLeft: 15, backgroundColor: "white"}}>
              <h4 ><span className="fa fa-bars"></span> Business Detail </h4>
              <p style={{fontSize: 15, fontFamily: "Cambria, Cochin, Georgia, Times, serif"}}>
              
              {post.description}
              </p>


            </div>
            </div>
            <div  className="d-block d-md-flex listing vertical" >
              <div className="row">
              
                <div className="col-lg-12">
                <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2473.8125647286365!2d38.813686603437226!3d9.01936035739818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8551e70d4e55%3A0x261206bdb30d4986!2sCentury%20Mall!5e0!3m2!1sen!2set!4v1630778040924!5m2!1sen!2set"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
              </div>
            
              </div>
            </div>
            <h4 style={{textAlign: "center"}} >  Products</h4>
            <Carousel fade={true} pause={false}>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
     
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={image1}
          alt="Third slide"
        />
      
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={image1}
          alt="Third slide"
        />
  
      </Carousel.Item>
    </Carousel>
    <div style={{marginTop:10}} className="d-block d-md-flex listing vertical">
      <div style={{marginLeft:15}}>
    <h4 style={{textAlign: "center"}} > Services</h4>
                  <h6>car importer and export</h6>
                  <h6>car interrior part</h6>
                  </div>
       </div>        
            {post.comments.map( comment => {
              console.log(comment);
              return (
                <div  className="row">
                  <Comment comment={comment} />
              </div>
            )}
            )}
              
           {/* <h1>coments: {JSON.stringify(comments)}</h1> */}
          </div>
          
          <section className="d-none d-md-block">

            
            <div className="d-block d-md-flex listing vertical">
        
              <h2 style={{fontWeight: "bolder", textAlign: "center"}}>Directories</h2>
            
          
         <Category categories={categories} />
            </div>
          
    
          </section>

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

             All rights reserved |&copy; Ethio BUSINESS ONLINE BUSINESS DIRECTORY.

            </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
        </div>
    )
       }

    export default ListingSingle;

