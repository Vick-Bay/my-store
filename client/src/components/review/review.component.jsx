import React from "react";
import { connect } from "react-redux";

//import { addItem } from "../../redux/cart/cart.action";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { ReviewContainer, UserReviewContainer } from "./review.styles";

const ProductReview = () => {
  return (
    <ReviewContainer>
      <UserReviewContainer>
        <p>User and time</p>
        <p>User Review</p>
      </UserReviewContainer>
      <UserReviewContainer>
        <p>User and time</p>
        <p>User Review</p>
      </UserReviewContainer>
      <UserReviewContainer>
        <p>User and time</p>
        <p>User Review</p>
      </UserReviewContainer>
      <FormInput />
      <CustomButton />
    </ReviewContainer>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   addItem: (item) => dispatch(addItem(item)),
// });

//export default connect(null, mapDispatchToProps)(ProductReview);

export default ProductReview;
