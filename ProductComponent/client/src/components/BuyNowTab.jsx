import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuantityToggler from './QuantityToggler';
import AddToCartButton from './AddToCartButton';
import AddToWishlistButton from './AddToWishlistButton';

const BuyNowTab = (props) => {
  const {
    productLimit,
    productAvailabilityOnline,
    themeName,
    cartQuantity,
    handleCartAddClick,
    quantity,
    handleChangeQuantity,
    handleBlur,
  } = props;

  return (
    <Container data-testid={`cartQuantity = ${cartQuantity}`}>
      <AvailablitityMessage availability={productAvailabilityOnline}>
        {productAvailabilityOnline
          ? (
            <span>
              Available now
            </span>
          )
          : (
            <span>
              Temporarily out of stock
            </span>
          )}
      </AvailablitityMessage>
      {productAvailabilityOnline && cartQuantity < productLimit
        ? (
          <QuantityToggler
            productLimit={productLimit}
            quantity={quantity}
            onChange={handleChangeQuantity}
            onBlur={handleBlur}
          />
        ) : null}
      <ButtonWrappers>
        {productAvailabilityOnline ? (
          <AddToCartButton
            productLimit={productLimit}
            handleCartAddClick={handleCartAddClick}
            cartQuantity={cartQuantity}
            productAvailabilityOnline={productAvailabilityOnline}
          />
        ) : null}
        <AddToWishlistButton />
      </ButtonWrappers>
      <ShopMore>
        Shop more like this:
        <ThemeName>{themeName}</ThemeName>
      </ShopMore>
    </Container>
  );
};

BuyNowTab.propTypes = {
  productLimit: PropTypes.number,
  cartQuantity: PropTypes.number,
  quantity: PropTypes.number,
  themeName: PropTypes.string,
  productAvailabilityOnline: PropTypes.number,
  handleCartAddClick: PropTypes.func,
  handleChangeQuantity: PropTypes.func,
  handleBlur: PropTypes.func,
};

BuyNowTab.defaultProps = {
  productLimit: 3,
  cartQuantity: 1,
  quantity: 1,
  themeName: '',
  productAvailabilityOnline: 1,
  handleCartAddClick: () => {},
  handleChangeQuantity: () => {},
  handleBlur: () => {},
};


export default BuyNowTab;

const Container = styled.div`
  display: block;
  width: 100%;
  padding-top: 1.125rem;
  border-top: 1px solid rgb(224, 224, 224);
`;

const AvailablitityMessage = styled.p`
  max-width: 100%;
  text-align: left;
  margin: 0px 0px 0.9375rem;
  color: ${(prop) => (prop.availability ? 'rgb(0, 133, 55)' : 'rgb(208, 2, 27)')};
  font-size: 0.875rem;
  line-height: 1.1875rem;
  font-weight: 700;
  text-transform: inherit;
`;

const ButtonWrappers = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1.125rem;
`;

const ShopMore = styled.div`
  width: 100%;
  margin-top: .9375rem;
`;

const ThemeName = styled.div`
  vertical-align: middle;
  margin-top: 0.3125rem;
  margin-right: 0.625rem;
  color: rgb(0, 109, 183);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
`;
