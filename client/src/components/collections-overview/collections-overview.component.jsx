import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionItem from "../collection-item/collection-item.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(
      ({ name, price, product_id, image_url, stock_quantity }) => (
        <CollectionItem
          key={product_id}
          name={name}
          price={price}
          product_id={product_id}
          image_url={image_url}
          stock_quantity={stock_quantity}
        />
      )
    )}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
