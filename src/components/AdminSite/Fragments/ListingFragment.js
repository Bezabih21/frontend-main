import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllListings, getPosts } from '../../../actions/posts';
const Listings = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllListings());
    }, [dispatch])
    
    const posts = useSelector( (state) =>  state.posts.posts);
    
    return (
        

        <div>
            <Container maxWidth="md" fixed>
            <TableContainer component={Paper} >
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Creator</TableCell>
                            <TableCell align="right">Logo</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Description</TableCell>
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
                                {post?.companyName}
                            </TableCell>
                            <TableCell align="right">{post?.creator}</TableCell>
                            <TableCell align="right"><img src={post.logo } style={{marginTop:8, marginRight: 12, position:"sticky", marginLeft: 12, width: 100, height: 100}}/></TableCell>
                            <TableCell align="right">{post?.location}</TableCell>
                            <TableCell align="right">{post?.description}</TableCell>
                            <TableCell align="right">{post?.map}</TableCell>
                            <TableCell align="right">{post?.phoneNumber}</TableCell>
                            <TableCell align="right">{post.category?.name}</TableCell>
                            <TableCell align="right">{post?.averageRating}</TableCell>
                            <TableCell align="right">{post?.createdAt}</TableCell>
                            <TableCell align="right"><Button onClick={(e) => dispatch(deletePost(post._id))} color="primary" >delete</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
           

        </div>
    )


}

export default Listings;
