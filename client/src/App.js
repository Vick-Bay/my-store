import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import ProductDetails from "./pages/product/product.component";
import SignInAndSignUpPage from "./components/sign-in-and-signup/sign-in-and-sign-up.component";
import CheckOutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.action";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;

    if (localStorage.getItem("token")) {
      checkUserSession();
    }
  }

  render() {
    return (
      <div>
        <Toaster position="top-right" />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route exact path="/products/:id/" component={ProductDetails} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
