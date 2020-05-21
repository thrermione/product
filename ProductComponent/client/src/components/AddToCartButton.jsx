import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AddToCartButton = ({ productLimit, handleCartAddClick, cartQuantity }) => {
  const limitExceeded = cartQuantity >= productLimit;
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      handleCartAddClick();
    }, 2000);
  };

  return (
    <AddButton data-testid="addToCart" type="submit" onClick={onClick} disableButton={clicked || limitExceeded} disabled={clicked || limitExceeded}>
      {limitExceeded ? 'Limit exceeded' : 'Add to Bag'}
    </AddButton>

  );
};

AddToCartButton.propTypes = {
  productLimit: PropTypes.number,
  cartQuantity: PropTypes.number,
  handleCartAddClick: PropTypes.func,
};

AddToCartButton.defaultProps = {
  productLimit: 3,
  cartQuantity: 0,
  handleCartAddClick: () => {},
};

export default AddToCartButton;


const AddButton = styled.button`
  background-color: ${(prop) => (prop.disableButton ? 'rgb(224, 224, 224)' : 'rgb(253, 128, 36)')};
  border-color: ${(prop) => (prop.disableButton ? 'rgb(224, 224, 224)' : 'rgb(253, 128, 36)')};
  &:hover {
    background-color: ${(prop) => (prop.disableButton ? 'rgb(224, 224, 224)' : 'white')};
  };
  cursor: ${(prop) => (prop.disableButton ? 'not-allowed' : 'pointer')};
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.1875rem;
  color: rgb(0, 0, 0);
  padding: 0.9375rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-collapse: collapse;
  width: 100%;
  min-height: 3.125rem;
`;
