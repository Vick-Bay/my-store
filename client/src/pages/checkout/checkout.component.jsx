import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import toast from "react-hot-toast";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import productService from "../../services/product.service";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles";

const CheckOutPage = ({ cartItems, total }) => {
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      for (const item of cartItems) {
        await productService.updateProductQuantity(
          item.quantity,
          item.product_id
        );
      }
      toast.success("Your order was successfully processed");
    } catch (err) {
      toast.error("Your order failed. An error has occurred. Please try again");
    }
  };

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.product_id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: ${total}</TotalContainer>
      <CustomButton onClick={handleSubmitOrder}>Submit Order</CustomButton>
    </CheckoutPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckOutPage);
