import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  RATE,
  GET_LISTING,
  GET_OWN_POSTS,
  UPLOAD_PRODUCT_IMAGE,
  FETCH_BY_CATEGORY,
  ERROR,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAllListings = () => async (dispatch) => {
  try {
    const { data } = await api.getListings();
    dispatch({ type: GET_LISTING, payload: data });
  } catch (error) {}
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);
    console.log("get posts", data);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.response);
  }
};

export const rate = (listingId, rating) => async (dispatch) => {
  try {
    const { data } = await api.rate(listingId, rating);
    console.log(rating);

    dispatch({ type: RATE, payload: data });
  } catch (error) {}
};

export const getOwnPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getOwnPosts();
    dispatch({ type: GET_OWN_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const uploadProductImage = (id, productImage) => async (dispatch) => {
  try {
    console.log(productImage);
    const { data } = await api.uploadProductImage(id, productImage);
    dispatch({ type: UPLOAD_PRODUCT_IMAGE, payload: data });
  } catch (error) {}
};

export const postsByCategory = (category) => async (dispatch) => {
  try {
    const {data} = await api.postsByCategory(category);

    console.log('catsearch', data);
    dispatch({ type: FETCH_BY_CATEGORY, payload: data });

  } catch (error) {
    dispatch({type:ERROR, payload: error.response.data.message}) 
  }
}