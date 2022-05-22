import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { getPost, likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const HomePost = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();


  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/${post._id}`);
  };

  return (
    <div>
       <ButtonBase
    component="span"
    name="test"
    className={classes.cardAction}
    onClick={openPost}
  >
<div style={{borderColor: "rgb(129, 121, 121)", borderRadius:5, backgroundColor:"white" }}>
            
<img src={post.logo } className="img-thumbnail rounded-circle" style={{marginTop:8, marginRight: 12, position:"sticky", marginLeft: 12, width: 180, height: 180, float:"left"}}/>



<div className="text p-4" >
<h3 className="h5 text-black" style={{fontWeight: 'bold'}}>{post.companyName.substring(0, 30)}</h3>

<span style={{fontWeight: "bolder", fontSize: "small"}} className="category ">Listed in :</span>
<br/>
<p className="mb-0" style={{fontSize: "small", fontFamily: '"Arial", Helvetica , sansSerif'}} >{post.description.substring(0, 150)}</p>
<br/>
<div style={{fontSize:"medium"}} className="row" >
<div className="fa fa-location-arrow "style={{marginRight: 15}}> Addis Ababa, ET</div> <div className="fa fa-phone" style={{marginRight: 15}}>{post.phoneNumber}</div> <div className="fa fa-globe"><a href="#">Visit website</a></div>
</div> 
</div>

</div>
</ButtonBase>
<br/>
</div>
  )}

  export default HomePost;