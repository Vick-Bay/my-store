import styled from "styled-components/macro";
import CustomButton from "../../components/custom-button/custom-button.component";

export const ProductItemContainer = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  height: 50vh;
  align-items: center;
  position: relative;
  &:hover {
    .image {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

export const AddButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const ProductFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

export const NameContainer = styled.span`
  width: 30%;
  margin-bottom: 15px;
`;

export const PriceContainer = styled.span`
  width: 20%;
`;

export const StockQuantityContainer = styled.span`
  width: 30%;
`;