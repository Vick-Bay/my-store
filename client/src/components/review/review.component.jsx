import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import reviewService from "../../services/review.service.js";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { ReviewContainer, UserReviewContainer } from "./review.styles";

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingReviews(true);
      const { data: reviews } = await reviewService.getReviews(productId);
      setReviews(reviews);
      console.log(reviews);
      setIsLoadingReviews(false);
    }
    fetchData();
  }, [productId]);

  return (
    <ReviewContainer>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Reviews</p>
      {isLoadingReviews ? (
        <p>Loading Reviews..</p>
      ) : (
        <div>
          {reviews?.reviews.map((review, id) => (
            <UserReviewContainer key={id}>
              <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                {review.name}
              </p>
              <p>{review.content}</p>
            </UserReviewContainer>
          ))}
        </div>
      )}
      <form>
        <FormInput name="review" value="review" label="review" required />
        <CustomButton type="submit"> Submit a review </CustomButton>
      </form>
    </ReviewContainer>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   addItem: (item) => dispatch(addItem(item)),
// });

//export default connect(null, mapDispatchToProps)(ProductReview);

export default ProductReview;
