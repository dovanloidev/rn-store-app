import {
  ADD_TO_CART,
  DELETE_TO_CART,
  ADD_TO_CART_LOCAL,
  RESET_TO_CART,
} from '../actionType';
import AsyncStorage from '@react-native-community/async-storage';

export const AddCartLocalAction = (cart) => {
  return {
    type: ADD_TO_CART_LOCAL,
    cart,
  };
};

export const AddCartAction = (item, cartCurrent) => {
  let newProduct = [];
  newProduct.push(item);
  if (cartCurrent.cart) {
    cartCurrent.cart.map((item) => {
      newProduct.push(item);
    });
  }
  AsyncStorage.setItem('cart', JSON.stringify(newProduct));
  return {
    type: ADD_TO_CART,
    cart: newProduct,
  };
};

export const DeleteCartAction = (item, cartCurrent) => {
  let newProduct = cartCurrent.cart.filter((value) => value._id !== item._id);
  AsyncStorage.setItem('cart', JSON.stringify(newProduct));
  return {
    type: DELETE_TO_CART,
    cart: newProduct,
  };
};
export const resetCartAction = () => {
  return {
    type: RESET_TO_CART,
  };
};
