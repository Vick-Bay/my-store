import authService from "../../services/auth.service";
import UserActionTypes from "./user.types";
import toast from "react-hot-toast";

export const emailSignInStart = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: UserActionTypes.EMAIL_SIGN_IN_START });
    const response = await authService.login(email, password);
    localStorage.setItem("token", JSON.stringify(response.token));
    dispatch({
      type: UserActionTypes.SIGN_IN_SUCCESS,
      payload: response,
    });
    toast.success("Logged in");
    dispatch(checkUserSession());
  } catch (error) {
    dispatch(signInFailure());
    toast.error("Failed to log in ");
  }
};

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => async (dispatch) => {
  try {
    const response = await authService.getCurrentUser();
    dispatch({
      type: UserActionTypes.CHECK_USER_SESSION,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UserActionTypes.AUTH_ERROR,
    });
    toast.error("An error with your session has occurred");
  }
};

export const signOutStart = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch({
      type: UserActionTypes.SIGN_OUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UserActionTypes.AUTH_ERROR,
    });
    toast.error("An error with your session has occurred");
  }
};

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
