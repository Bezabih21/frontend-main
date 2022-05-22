import * as api from '../api/index.js';
import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from '../constants/actionTypes.js';


export const createComment = (postId, comment) => async (dispatch) => {

    try {

        // console.log(postId);
        const { data } = await api.createComment(postId, comment);
        dispatch({type: CREATE_COMMENT, payload: {data, postId}});
    } catch (error) {
        console.log(error)
    }

}

export const deleteComment = (commentId, postId) => async(dispatch) => {
    try {
        
        await api.deleteComment(commentId, postId);
        dispatch({type: DELETE_COMMENT, payload:commentId})
        
    } catch (error) {
        console.log(error);
    }
}

export const editComment = (commentId, comment) => async(dispatch) => {
    try {

        const {data} = await api.editComment(commentId, comment);
        dispatch({type: EDIT_COMMENT, payload:data});
        
    } catch (error) {
        console.log(error);
    }
} 