import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../actions/category';
import { createPost,updatePost,deletePost, getOwnPosts, uploadProductImage } from '../../../actions/posts';
import useStyles from './styles'
import FileBase from 'react-file-base64';
export default function Listings() {

    const [open, setOpen]= useState(false);
    const [formData, setFormData]= useState({
        companyName: "",
        description: "",
        map: "",
        phoneNumber: "",
        category: null,
    });
    const [currentListing, setCurrentListing]= useState(null);
    const [productImage, setProductImage]= useState(null);
    const [openImageForm, setOpenImageForm]= useState(false);

    const dispatch = useDispatch();
    const clear = () => {
      setCurrentListing(null);
      setFormData({
        companyName: "",
        logo:'',
        description: "",
        map: "",
        phoneNumber: "",
        category: null,
      });
      setOpen(false);
      setOpenImageForm(false);
    }
    const createPosts = () => {};
    const classes = useStyles();
    const editPost = () => {};
    const handleSubmit = (e) => {
        if(currentListing) {
          dispatch(updatePost(currentListing._id, formData));
        }else{
          dispatch(createPost(formData));
        }
        clear();
    };

    const handleUploadProductImage = (e) => {
        const formData = new FormData();
        formData.append('productImage', productImage);

        console.log(currentListing._id);
        dispatch(uploadProductImage(currentListing._id, formData));
        setOpenImageForm(false);
        //clear()
    }
    useEffect(() => {
        dispatch(getOwnPosts());
        dispatch(getCategories())
        // console.log("here");
    }, [dispatch])

    const posts = useSelector( state =>{
      console.log("client",state.posts.posts);
      return state.posts.posts
    });
    const categories = useSelector( state =>  state.category.categories);

    return (
        
        <div>
            <Container maxWidth="md" fixed>
                Listings 

                <Dialog
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="form-dialog-title"
          >
            
            <DialogTitle id="form-dialog-title"> Edit { (currentListing) && currentListing.companyName }</DialogTitle>
            <DialogContentText>
                To add a new category provied the name of the category and the
                font awesome class associated with it.
              </DialogContentText>
              
                <DialogContent>
                    {/* <form onSubmit={handleSubmit}> */}
              <TextField
                autoFocus
                margin="dense"
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formData.companyName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                type="text"
                fullWidth
              />
                   <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, logo: base64 })} /></div>

              <TextField
                margin="dense"
                id="map"
                type="map"
                value={formData.map || ""}
                name="map"
                onChange={(e) =>
                  setFormData({ ...formData, map: e.target.value })
                }
                label="Google map link"
                fullWidth
              />
              <TextField
                margin="dense"
                id="description"
                type="description"
                value={formData.description || ""}
                name="description"
                multiline
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                label="Descriptioin"
                fullWidth
              />
              <TextField
                margin="dense"
                id="phoneNumber"
                type="phoneNumber"
                value={formData.phoneNumber || ""}
                name="phoneNumber"
                multiline
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                label="Phone Number"
                fullWidth
              />
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                <Select
                native
                
                value={formData.category || ''}
                onChange={(e)=> {setFormData({...formData, category: e.target.value})}}
                inputProps={{
                    name: 'category',
                    id: 'category',
                }}
                >
                    {categories?.map(category => {

                       return <option value={category._id}>{category.name}</option>
                    })}
                </Select>
            </FormControl>
            
                    {/* </form> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => clear()} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openImageForm}
            onClose={(e) => setOpenImageForm(false)}
            aria-labelledby="form-dialog-title"
          >
            
            <DialogTitle id="form-dialog-title"> Add Product Image</DialogTitle>
            
              
                <DialogContent>
                    {/* <form onSubmit={handleSubmit}> */}
              <TextField
                autoFocus
                margin="dense"
                id="productImage"
                name="productImage"
                label="Product Image"
                // value={productImage || ""}
                onChange={(e) =>
                  setProductImage( e.target.files[0] )
                }
                type="file"
                fullWidth
              />
              
              
                    {/* </form> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => setOpenImageForm(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={ e => handleUploadProductImage(e, currentListing._id)} color="primary">
                submit
              </Button>
            </DialogActions>
          </Dialog>
                
                <span ><Typography align="right" onClick={e => setOpen(true)}>new</Typography></span>
            <TableContainer component={Paper} >
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">companyName</TableCell>
                            <TableCell align="right">Logo</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">image</TableCell>
                            <TableCell align="right">Map</TableCell>
                            <TableCell align="right">phoneNumber</TableCell>
                            <TableCell align="right">category</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">createdAt</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {posts?.map((post) => (
                            <TableRow key={post._id}>
                            <TableCell component="th" scope="row">
                                {/* {post?.productImage} */}
                            </TableCell>
                            <TableCell align="right">{post?.companyName}</TableCell>
                            <TableCell align="right"><img src={post.logo } style={{marginTop:8, marginRight: 12, position:"sticky", marginLeft: 12, width: 100, height: 100}}/></TableCell>
                            <TableCell align="right">{post?.location}</TableCell>
                            <TableCell align="right">{post?.description.substring(0, 30)+"..."}</TableCell>
                            <TableCell align="right"><ul>{post?.productImages?.map( img =>{
                                return <li> <img src={`http://localhost:5000/images/${img?.filename}`} alt="" height={50} width={50}/> <span>Delete</span></li>
                              })}</ul></TableCell>
                            <TableCell align="right">{post?.map}</TableCell>
                            <TableCell align="right">{post?.phoneNumber}</TableCell>
                            <TableCell align="right">{post?.category}</TableCell>
                            <TableCell align="right">{post?.averageRating}</TableCell>
                            <TableCell align="right">{post?.createdAt}</TableCell>
                            <TableCell align="right">
                                <Button onClick={(e) => dispatch(deletePost(post._id))} color="primary" >delete</Button>
                                |<Button onClick={(e) => { 

                                  setCurrentListing(post);
                                  setFormData(post);
                                  setOpen(true);
                                }} color="primary" >Edit</Button>
                                |<Button onClick={(e) =>{
                                    setOpenImageForm(true);
                                    setCurrentListing(post);
                                    console.log(post);
                                } } color="primary" >Add product image</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
           

        </div>
    )
}
