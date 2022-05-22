import { Container, Table, TableBody, TableContainer, TableCell,Button, Paper, TableHead, TableRow, Typography, Dialog, DialogContentText, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategories, createCategory , editCategory } from '../../../actions/category';



const Category = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])
    const initial = {name: '', faicon: ''};
    const[currentCategory, setCurrentCategory] = useState(null);
    const[formData, setFormData] = useState(initial);
    const [open, setOpen] = useState(false);
    
    const {categories} =  useSelector( state => state.category);

    const handleDelete =  (e, id) => dispatch(deleteCategories(id));
    const handleEdit = (e, category) => { 
      setCurrentCategory(category);
      setFormData({name: category.name, faicon:category.fa_icon});
      setOpen(true);
    }
    
    const handleSubmit = (e) => {
      if (!currentCategory) {
        // console.log(formData);
        dispatch(createCategory(formData));
      }else{
        // console.log(currentCategory._id, formData);
        dispatch(editCategory(currentCategory._id, formData))
      }
      setOpen(false);
    }
    const handleNew = (e) => {
      setFormData(initial);
      setCurrentCategory(null);
      setOpen(true);
    }

    return (
      <div>
        <Container maxWidth="md" fixed>
          <h1> Categories</h1>
          <Typography align="right" onClick={(handleNew)}>
            new
          </Typography>
          <Dialog
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="form-dialog-title"
          >
            
            <DialogTitle id="form-dialog-title"> {currentCategory ? `Edit ${currentCategory?.name}` : "Add New Category" }</DialogTitle>
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
                value={formData.faicon || ""}
                name="faicon"
                onChange={(e) =>
                  setFormData({ ...formData, faicon: e.target.value })
                }
                label="Font Awesome class"
                type="text"
                fullWidth
              />
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

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Font awesome class</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell component="th" scope="row">
                      {category?.name}
                    </TableCell>
                    <TableCell align="right">{category?.fa_icon}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={(e) => handleDelete(e, category._id)}
                        color="primary"
                      >
                        delete
                      </Button>{" "}
                      <Button
                        onClick={(e) => handleEdit(e, category)}
                        color="primary"
                      >           
                        edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );


}

export default Category;


