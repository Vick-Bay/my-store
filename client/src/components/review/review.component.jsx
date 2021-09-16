import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import reviewService from "../../services/review.service.js";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  ReviewContainer,
  UserReviewContainer,
  ReviewTitle,
  ReviewWrapper,
  UserReviewName,
  UserReviewContent,
} from "./review.styles";

const ProductReview = ({ productId, currentUser }) => {
  const [reviews, setReviews] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    fetchReviews(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchReviews = async (productId) => {
    setIsLoadingReviews(true);
    const { data: reviews } = await reviewService.getReviews(
      currentUser.user_id,
      productId
    );
    setReviews(reviews);
    setIsLoadingReviews(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    reviewService
      .addReview(currentUser.user_id, productId, newReview)
      .then(() => {
        toast.success("Review added successfully");
        setNewReview("");
      })
      .catch((error) => {
        toast.error("You cannot add a second review to the same product");
        setNewReview("");
      });
    await fetchReviews(productId);
  };

  return (
    <ReviewContainer>
      <ReviewTitle>Reviews</ReviewTitle>
      {isLoadingReviews ? (
        <p>Loading Reviews..</p>
      ) : (
        <ReviewWrapper>
          {reviews?.reviews.map((review, id) => (
            <UserReviewContainer key={id}>
              <UserReviewName
                style={{ fontSize: "0.8rem", fontWeight: "bold" }}
              >
                {review.name}
              </UserReviewName>
              <UserReviewContent>{review.content}</UserReviewContent>
            </UserReviewContainer>
          ))}
        </ReviewWrapper>
      )}
      <form onSubmit={handleSubmit}>
        <FormInput
          name="review"
          value={newReview}
          handleChange={(e) => setNewReview(e.target.value)}
          label="Leave a review"
          required
        />
        <CustomButton type="submit"> Submit a review </CustomButton>
      </form>
    </ReviewContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ProductReview);
