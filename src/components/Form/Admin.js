import React, { useState } from 'react';
import { Container,Typography, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from './Form';
import Pagination from '../PaginationAdmin';
import useStyles from './styles';
import Navbar from '../Navbar/Navbar';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Admin = () => {
    
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Listing
        </Typography>
      </Paper>
    );
  }
  return (
    <div className="site-wrap">
    <Navbar/>
    <div className="overlay" style={{backgroundImage: "url(./images/listingp.jpeg)"}} dat-aos="fade" >

<div className="container">
 <div className="row align-items-center justify-content-center text-center">

   <div className="col-md-10" data-aos="fade-up" data-aos-delay="400">
     
     
     <h1 style={{color: "white", fontWeight: "bolder"}}>Managing Listing</h1>
     
    

     
   </div>
 </div>
</div>
</div> 
      
        <div className="container">
        <div className="row">
                <div className="col-12">

          <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
   
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </div>
    </div>
    </div>
    </div>

  );
};

export default Admin;
