import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionItem from "../collection-item/collection-item.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map((item) => (
      <CollectionItem key={item.product_id} item={item} />
    ))}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
