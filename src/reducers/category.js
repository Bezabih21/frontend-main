import { CREATE_CATEGORY, DELETE_CATAGORIES, EDIT_CATEGORY, GET_CATEGORIES } from "../constants/actionTypes";

export default (state = { isLoading: true, categories: [] }, action) => {
    switch (action.type) {
      // case ''
    case GET_CATEGORIES:
        return { ...state,categories: action.payload };

    case DELETE_CATAGORIES:
        return {...state, categories: state.categories.filter(cat => String(cat._id) !== action.payload)}; 

    case CREATE_CATEGORY:
      return {...state, categories: [...state.categories, action.payload]};

    case EDIT_CATEGORY:
      return {...state, categories: state.categories.map(c => (c._id === action.payload._id) ? action.payload : c)};

      default:
          return state;
    }
  };