import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import BuyNowTab from './BuyNowTab';
import CheckStoreTab from './CheckStoreTab';

const TabList = (props) => {
  const {
    productLimit, productAvailabilityOnline, themeName, productId,
  } = props;
  const [tab, setTab] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleChangeStore = () => setHasSearched(false);

  const handleTabClick = () => setTab(!tab);

  const handleCartAddClick = () => setCartQuantity(Number(cartQuantity + quantity));

  const handleChangeQuantity = (newQuantity) => setQuantity(newQuantity);

  const handleBlur = (newQuantity) => {
    if (newQuantity < 1) {
      setQuantity(1);
    } else if (newQuantity > productLimit) {
      setQuantity(productLimit - cartQuantity);
    }
  };
  const handleChangeQuery = (e) => setQuery(e.target.value);

  const getStores = async (id, searchQuery) => {
    try {
      return await axios.get(`/product/${id}/find-store?q=${searchQuery}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    getStores(productId, query)
      .then(({ data }) => {
        setStores(data);
        setHasSearched(true);
        setQuery('');
      })
      .catch((error) => {
        const errorCode = error.message.split(' ').pop();
        if (errorCode === '404') {
          setStores([]);
          setHasSearched(true);
          console.log('Store not found');
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <>
      <Tabs>
        <BuyNowButtonContainer clicked={tab}>
          <TabButton className="BuyNow" onClick={tab ? null : handleTabClick}>Buy Now</TabButton>
        </BuyNowButtonContainer>
        <CheckStoreButtonContainer clicked={tab}>
          <TabButton className="CheckStore" onClick={tab ? handleTabClick : null}>Check Store Stock</TabButton>
        </CheckStoreButtonContainer>
      </Tabs>
      {tab
        ? (
          <BuyNowTab
            data-testid="buyNowTab"
            cartQuantity={cartQuantity}
            handleCartAddClick={handleCartAddClick}
            productLimit={productLimit}
            productAvailabilityOnline={productAvailabilityOnline}
            themeName={themeName}
            handleChangeQuantity={handleChangeQuantity}
            quantity={Number(quantity)}
            handleBlur={handleBlur}
          />
        )
        : (
          <CheckStoreTab
            data-testid="checkStoreTab"
            stores={stores}
            query={query}
            hasSearched={hasSearched}
            handleChangeQuery={handleChangeQuery}
            handleSubmitQuery={handleSubmitQuery}
            handleChangeStore={handleChangeStore}
          />
        )}
    </>
  );
};

const Tabs = styled.ul`
  display: flex;
  align-items: stretch;
  list-style: none;
  padding: initial;
  margin-bottom: auto;
`;

const CheckStoreButtonContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 1.1875rem;
  color: rgb(0, 0, 0);
  margin-right: 1.125rem;
  border-top-color: rgb(0, 109, 183);
  border-right-color: rgb(0, 109, 183);
  border-left-color: rgb(0, 109, 183);
  text-decoration: none;
  border-bottom: ${(prop) => (!prop.clicked ? '2px solid rgb(0, 109, 183)' : '2px solid transparent')};
  padding-bottom: 1.125rem;
`;

const BuyNowButtonContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 1.1875rem;
  color: rgb(0, 0, 0);
  margin-right: 1.125rem;
  text-decoration: none;
  border-bottom: ${(prop) => (prop.clicked ? '2px solid rgb(0, 109, 183)' : '2px solid transparent')};
  padding-bottom: 1.125rem;
`;

const TabButton = styled.button`
  background: transparent;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  padding: 0px;
  cursor: pointer;
  box-shadow: none;
  border-width: 0px;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    color: rgb(0, 109, 183);
  }
`;

TabList.propTypes = {
  productLimit: PropTypes.number,
  productAvailabilityOnline: PropTypes.number,
  themeName: PropTypes.string,
  productId: PropTypes.number,
};

TabList.defaultProps = {
  productLimit: 3,
  productAvailabilityOnline: 1,
  themeName: '',
  productId: 1,
};

export default TabList;
