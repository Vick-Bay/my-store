import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addItem } from "../../redux/cart/cart.action";
import productService from "../../services/product.service";
import ProductReview from "../../components/review/review.component";

import {
  ProductItemContainer,
  StockQuantityContainer,
  AddButton,
  Image,
  NameContainer,
  Description,
  PriceContainer,
} from "./product.styles";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchData(id);
  }

  fetchData = async (id) => {
    const { data: product } = await productService.getProduct(id);
    this.setState({
      isLoaded: true,
      product: product,
    });
  };

  handleAddToCart = async () => {
    const { addItem } = this.props;
    const { product } = this.state;
    addItem(product);
  };

  render() {
    const { product, isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading... </div>;
    } else {
      return (
        <ProductItemContainer>
          <Image className="image" src={product.image_url} />
          <NameContainer>{product.name}</NameContainer>
          <PriceContainer>Rs {product.price}</PriceContainer>
          <StockQuantityContainer>
            In Stock: {product.stock_quantity}
          </StockQuantityContainer>
          <Description>{product.description}</Description>
          <AddButton onClick={this.handleAddToCart}>Add to cart</AddButton>
          <ProductReview productId={product.product_id} />
        </ProductItemContainer>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProductDetails));
