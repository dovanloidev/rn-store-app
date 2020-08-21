import {LOG_IN, LOG_OUT} from '../actionType';

export const loginAction = (user) => {
  return {
    type: LOG_IN,
    user,
  };
};

export const logoutAction = () => {
  return {
    type: LOG_OUT,
  };
};
