import {LOG_IN, LOG_OUT} from '../actionType';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        logged: true,
        user: action.user,
      };
    case LOG_OUT:
      return {
        logged: false,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
