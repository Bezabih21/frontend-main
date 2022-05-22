import React, {useState} from "react";
import { useDispatch } from "react-redux";
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { createComment } from "../../../actions/comment";

import ReactStars from "react-rating-stars-component";
import { rate } from "../../../actions/posts";


export const PostComment = ({postId})=> {
    const ratingChanged = (newRating) => {
        setPostData({...postData, rating: +newRating});
      };

    const [postData, setPostData] = useState({name: '', comment: '', email: '', rating: 0});
    const dispatch = useDispatch();
    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComment( postId,postData));
        if(postData.rating > 0) {
            dispatch(rate( postId, postData.rating ));
        }
        // alert(postId);
        // console.log(postData);
    }
    const clear = (e) => {
        setPostData({name: '', comment: '', email: ''})
    }
    
    return(
        
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
               
                <TextField name="name" variant="outlined" label="Name" fullWidth onChange = {(e)=> setPostData({...postData, name : e.target.value})} value={postData.name}  /> 
                <TextField name="comment" variant="outlined" label="Comment" fullWidth onChange = {(e)=> setPostData({...postData, comment : e.target.value})} value={postData.comment}  /> 
                <TextField name="email" variant="outlined" label="E-mail" type='email' fullWidth onChange = {(e)=> setPostData({...postData, email : e.target.value})} value={postData.email}  /> 
                <div style={{display:'inline'}}>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={45}
                    activeColor="#ffd700"
  /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form> 
        </Paper>
    )

}