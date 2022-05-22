import * as api from '../api/index.js';
import { GET_CATEGORIES, DELETE_CATAGORIES, CREATE_CATEGORY, EDIT_CATEGORY } from '../constants/actionTypes.js';



export const getCategories = () => async (dispatch) => {
    try {
        const {data} = await api.getCategories();

        console.log("action",data);

        dispatch({type: GET_CATEGORIES, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const deleteCategories = id => async (dispatch) =>{
    try {
        await api.deleteCategories(id);
        dispatch({type: DELETE_CATAGORIES, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const editCategory =  (id, category) => async (dispatch) => {
    try {
        const {data} = await api.editCategory(id, category);
        // console.log("edit",data);
        dispatch({ type:EDIT_CATEGORY, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const createCategory =  (category) => async (dispatch) => {
    try {
        // console.log(category);
        const { data } = await api.createCategory(category);
        // console.log(data);
        dispatch({ type:CREATE_CATEGORY, payload:data});    
    } catch (error) {
        console.error(error);
    }
}