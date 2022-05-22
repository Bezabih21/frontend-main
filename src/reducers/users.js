import { DELETE_USERS, EDIT_USER, GET_USERS} from "../constants/actionTypes";

export default (state = { isLoading: true, users: [] }, action) => {
    switch (action.type) {
      
      case GET_USERS:
        return { ...state, users: action.payload };
      case DELETE_USERS:
        return {...state, users: state.users.filter(user => String(user._id) !== action.payload)};

      case EDIT_USER:
        // console.log("paylosd",action.payload);
        return {...state, users: state.users.map(user => (user._id === action.payload._id) ? action.payload : user  )}
      default:
          return state;
    }
  };