import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { addItem } from "../../redux/cart/cart.action";
import productService from "../../services/product.service";
import ProductReview from "../../components/review/review.component";

import {
  ProductItemContainer,
  ProductFooterContainer,
  StockQuantityContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./product.styles";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: product } = await productService.getProduct(id);
      setProduct(product);
    }
    fetchData();
  }, [id]);
  console.log(product);
  return (
    <ProductItemContainer>
      <BackgroundImage className="image" imageUrl={product.image_url} />
      <ProductFooterContainer>
        <NameContainer>{product.name}</NameContainer>
        <PriceContainer>Rs {product.price}</PriceContainer>
        <StockQuantityContainer>
          In Stock: {product.stock_quantity}
        </StockQuantityContainer>
      </ProductFooterContainer>
      <AddButton inverted>Add to cart</AddButton>
      <ProductReview />
    </ProductItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(ProductDetails);
