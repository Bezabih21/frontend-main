import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const getListings = () =>API.get('/admin/posts');


//
export const createComment = (postId, comment) =>  API.post(`/comment/${postId}`, comment);
export const deleteComment = ( commentId, postId) => API.delete(`comment/${commentId}/${postId}`);
export const editComment = (commentId, comment) => API.patch(`/comment/${commentId}`, comment);
export const rate = (listingId, rating) =>API.patch(`/posts/rate/${listingId}`,{"rating" : rating});
  
// ////

export const getUsers = () => API.get('/admin/users');
export const deleteUsers = (id) => API.delete(`/admin/users/${id}`);
export const editUsers = (id, user) => API.patch(`/admin/users/${id}`,user);
// 
export const getCategories = () => API.get('/admin/category');
export const deleteCategories = (id) => API.delete(`/admin/category/${id}`);
export const createCategory = (category) => API.post('/admin/category', category);
export const editCategory = (id, category) => API.patch(`/admin/category/${id}`, category);
// 

export const getOwnPosts = () => API.get(`/posts/own`);
export const uploadProductImage = (id, productImage) => API.patch( `/posts/productImage/${id}`,productImage, {headers: {
  'content-type': 'multipart/form-data'
}});
// 
export const signIn = (formData)=>{ 
       console.log(formData) 
             return API.post('/user/signin', formData)}

export const signUp = (formData)=>{
  
  console.log(formData)
    return API.post('/user/signup', formData)}

export const activateHandle=(token)=>API.get(`/activate/${token}`) 


export const postsByCategory = category => API.get(`/posts/category?catid=${category}`)
