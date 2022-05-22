import { CREATE_COMMENT, DELETE_COMMENT } from "../constants/actionTypes";

export default (state = { isLoading: true, comments: [] }, action) => {
    switch (action.type) {
      // case ''
      case CREATE_COMMENT:
        return { ...state, comments: [...state.comments, action.payload] };


      case DELETE_COMMENT:
        return { ...state, comments: state.comments.filter( c => c._id !== action.payload.commentId)}
      default:
          return state;
    }
  };