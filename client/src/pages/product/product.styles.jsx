import styled from "styled-components/macro";
import CustomButton from "../../components/custom-button/custom-button.component";

export const ProductItemContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  height: 50vh;
  align-items: center;
  button {
    display: flex;
  }
`;

export const AddButton = styled(CustomButton)`
  width: 40%;
  opacity: 0.7;
  display: none;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
`;

export const NameContainer = styled.span`
  margin-bottom: 15px;
  font-weight: bold;
`;

export const PriceContainer = styled.span`
  margin-bottom: 15px;
  font-weight: bold;
`;

export const StockQuantityContainer = styled.span`
  margin-bottom: 15px;
  font-weight: bold;
`;

export const Description = styled.span`
  margin-bottom: 15px;
  font-weight: bold;
`;
