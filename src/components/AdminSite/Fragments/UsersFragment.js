import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers, deleteUsers , createUsers, editUsers} from '../../../actions/users';


const Users = () => {
    const init = {name: '', email: '', role:'', verified: false };
    const classes = useStyles();
    const dispatch = useDispatch();
    const {users} =  useSelector( state => state.users )
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const [formData, setFormData] = useState(init);
    const [currentUser, setCurrentUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleDelete = (e, id)=> {
        dispatch(deleteUsers(id));
    }
    const handleEdit = (e, user) => { 
        // console.log(user);
        setCurrentUser(user);
        // console.log("cu", currentUser);
        setFormData({name: user.name, email: user.email, role:user.role, verified: user.verified })
        setOpen(true);
      }
      
      const handleSubmit = (e) => {
        dispatch(editUsers(currentUser._id, formData))
        
        setOpen(false);
      }
    return (


        <div>
            <Container maxWidth="md" fixed>
                  Users Fragment
                  <Dialog
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="form-dialog-title"
          >
            
            <DialogTitle id="form-dialog-title"> Edit { (currentUser) && currentUser.name }</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add a new category provied the name of the category and the
                font awesome class associated with it.
              </DialogContentText>
              

              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                fullWidth
              />
              <TextField
                //   autoFocus
                margin="dense"
                id="faclass"
                type="email"
                value={formData.email || ""}
                name="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                label="Font Awesome class"
                fullWidth
              />
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="age-native-simple">Verified</InputLabel>
                <Select
                native
                
                value={formData.verified || false}
                onChange={(e)=> {setFormData({...formData, verified: e.target.value})}}
                inputProps={{
                    name: 'verified',
                    id: 'verified',
                }}
                >
                <option value={false}>Unverified</option>
                <option value={true}>Verified</option>
                </Select>
            </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="age-native-simple">Role</InputLabel>
                <Select
                native
                value={formData.role || "CLIENT"}
                onChange={(e)=> {setFormData({...formData, role: e.target.value})}}
                inputProps={{
                    name: 'role',
                    id: 'role',
                }}
                >
                <option value="CLIENT">Client</option>
                <option value="ADMIN">Admin</option>
                <option value="BUSINESS"> BUSINESS</option>
                </Select>
            </FormControl>


            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                submit
              </Button>
            </DialogActions>
          </Dialog>

                  <TableContainer component={Paper} >
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Verified</TableCell>
                            <TableCell align="right"> Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user._id}>
                            <TableCell component="th" scope="row">
                                {user?.name}
                            </TableCell>
                            <TableCell align="right">{user?.email}</TableCell>
                            <TableCell align="right">{user?.role}</TableCell>
                            <TableCell align="right">{user?.verified?.toString()}</TableCell>
                            <TableCell align="right"><Button onClick={(e) =>handleDelete(e, user._id)} color="primary" >delete</Button>| <Button onClick={(e) =>handleEdit(e, user)} color="primary" >edit</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            
            
           
            
        </div>
    )


}

export default Users;
