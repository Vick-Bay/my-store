import React from "react";
import { connect } from "react-redux";

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

const CollectionItem = ({
  name,
  price,
  image_url,
  stock_quantity,
  addItem,
}) => {
  return (
    <CollectionItemContainer>
      {console.log(image_url)}
      <BackgroundImage className="image" imageUrl={image_url} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>Rs {price}</PriceContainer>
        <StockQuantityContainer>
          In Stock: {stock_quantity}
        </StockQuantityContainer>
      </CollectionFooterContainer>
      <AddButton inverted>Add to cart</AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
