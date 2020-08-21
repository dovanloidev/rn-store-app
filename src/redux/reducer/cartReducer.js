import {
  ADD_TO_CART,
  ADD_TO_CART_LOCAL,
  DELETE_TO_CART,
  RESET_TO_CART,
} from '../actionType';

const initialSate = {
  cart: [],
};

const cartReducer = (state = initialSate, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: action.cart,
      };
    case ADD_TO_CART_LOCAL:
      return {
        cart: action.cart,
      };
    case DELETE_TO_CART:
      return {
        cart: action.cart,
      };
    case RESET_TO_CART:
      return {
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
