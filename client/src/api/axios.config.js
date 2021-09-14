import axios from "axios";
import { store } from "../redux/store";
import UserActionTypes from "../redux/user/user.types";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (req) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) req.headers["auth-token"] = token;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === "Token is not valid") {
      store.dispatch({ type: UserActionTypes.SIGN_OUT });
    }
    return Promise.reject(err);
  }
);

export default API;
