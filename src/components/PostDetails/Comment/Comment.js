import moment from 'moment';
import React from 'react';



export const Comment = ({comment}) => {
    return ( (comment) ? (
        <>
        
        <div className="d-block d-md-flex listing vertical">
            <div className="row">  
        
              <div className="col-lg-2" >
                
              <img style={{height: 40}} src="images/pers.jpg" alt="Image" className="img-fluid rounded"/>
  
              </div>
              <div className="col-lg-3" >
                <p>{comment.name}</p>
                <p>
                <span className="icon-star text-warning"></span>
                <span className="review">15 reviews</span></p>
              </div>
              <div className="col-lg-7" >
             
                <p className="mb-0">
                  <span className="icon-star text-warning"></span>
                  <span className="icon-star text-warning"></span>
                  <span className="icon-star text-warning"></span>
                  <span className="icon-star text-warning"></span>
                  <span className="icon-star text-warning"></span>
                  
                  {/* <span className="review">{moment(new Date(comment?.createdAt).toISOString()).fromNow()}</span> */}
                  <span className="review">{comment?.createdA}</span>
                </p>
                            
                  <p>{comment.comment}</p>
                  
                  
                  <li id="spacerev" className="social-icons" className="btn-outline" ><a   id="review" href="#"   className="fas fa-lightbulb">Useful</a> </li><li id="spacerev"><a id="review" href="#"  className="fas fa-grin-alt">Funny</a></li><li id="spacerev"><a id="review" href="#" className="fas fa-surprise">Cool</a> </li>
              
              
            </div>
          </div>
            </div>
                 
        </> ) : (<h3> There are no reviews yet!!</h3>)

    )
}