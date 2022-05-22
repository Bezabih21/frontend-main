import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CategoryFragment from '../Fragments/CategoryFragment'
import {Category, Group, Home, PowerOff, Receipt} from '@material-ui/icons';
import ListingFragment from '../Fragments/ListingFragment'
import UsersFragment from '../Fragments/UsersFragment'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import * as actionType from '../../../constants/actionTypes';
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [fragment,setfragment] = useState("HOME")

  const loadFragmnet=()=>{

    switch(fragment){
   
    case "CATEGORY":
      return <CategoryFragment/>
    case "LISTING":
        return <ListingFragment/>
    case "USERS":
          return <UsersFragment/>
    default: 
    break;


    }


  }
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();

  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
              Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
        
    
              <ListItem button onClick={e=>setfragment("CATEGORY")}>
                <ListItemIcon>
                    <Category/>  
             </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button onClick={e=>setfragment("LISTING")}>
                <ListItemIcon>
                    <Receipt/>  
             </ListItemIcon>
                <ListItemText primary="Listings" />
              </ListItem>

              <ListItem button onClick={e=>setfragment("USERS")}>
                <ListItemIcon>
                    <Group/>  
             </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>

              <ListItem button >
                <ListItemIcon>
                    <PowerOff/>  
             </ListItemIcon>
                <ListItemText primary="Logout" onClick={logout} />
              </ListItem>
          </List>
          <Divider />
         
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {loadFragmnet()}
      </main>
    </div>
  );
}