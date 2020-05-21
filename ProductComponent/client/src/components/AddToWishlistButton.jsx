import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart } from './SVGs';

const AddToWishlistButton = () => {
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const clickHandler = () => setAddedToWishlist(!addedToWishlist);

  return (
    <Container>
      <WishListButton type="submit" data-test="wishlist" onClick={clickHandler}>
        <Heart addedToWishlist={addedToWishlist}/>
        <WishListText>
          {addedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
        </WishListText>
      </WishListButton>
    </Container>
  );
};

export default AddToWishlistButton;

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(224, 224, 224);
  padding: 1.25rem 0px;
`;

const WishListButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0px;
  cursor: pointer;
  border-width: 0px;
`;

const WishListText = styled.span`
  color: inherit;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  font-weight: 700;
`;
