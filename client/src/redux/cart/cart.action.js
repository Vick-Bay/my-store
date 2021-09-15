import cartService from "../../services/cart.service";
import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => async (dispatch) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,

  //   try {
  //   dispatch({ type: CartActionTypes.ADD_ITEM });
  //   const response = await cartService.addToCart(email, password);
  //   localStorage.setItem("token", JSON.stringify(response.token));
  //   dispatch({
  //     type: UserActionTypes.SIGN_IN_SUCCESS,
  //     payload: response,
  //   });
  //   toast.success("Logged in");
  //   dispatch(checkUserSession());
  // } catch (error) {
  //   dispatch(signInFailure());
  //   toast.error("Failed to log in ");
  // }
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});
