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
import { clearCart } from "../../redux/cart/cart.action";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles";

const CheckOutPage = ({ cartItems, total, clearCart }) => {
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      for (const item of cartItems) {
        await productService.updateProductQuantity(
          item.quantity,
          item.product_id
        );
      }
      await clearCart();
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
          <span>Unit Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.product_id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: Rs {total}</TotalContainer>
      <CustomButton onClick={handleSubmitOrder}>Submit Order</CustomButton>
    </CheckoutPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
