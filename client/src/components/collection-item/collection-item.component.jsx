import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { addItem } from "../../redux/cart/cart.action";

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  StockQuantityContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
  const history = useHistory();
  const toProduct = (product_id) => history.push(`products/${product_id}`);

  const addToCart = async (e) => {
    e.stopPropagation();
    await addItem(item);
  };

  return (
    <CollectionItemContainer onClick={() => toProduct(item.product_id)}>
      <BackgroundImage className="image" imageUrl={item.image_url} />
      <CollectionFooterContainer>
        <NameContainer>{item.name}</NameContainer>
        <PriceContainer>Rs {item.price}</PriceContainer>
        <StockQuantityContainer>
          In Stock: {item.stock_quantity}
        </StockQuantityContainer>
      </CollectionFooterContainer>
      <AddButton inverted onClick={(e) => addToCart(e)}>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
