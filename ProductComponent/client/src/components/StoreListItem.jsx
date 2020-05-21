import React from 'react';
import styled from 'styled-components';
import { InStockSymbol, OutOfStockSymbol } from './SVGs';

const StoreListItem = ({ store, index, changeStore }) => {
  const { storeName, productAvailability, id } = store;

  return (
    <Container>
      <Availability data-test="availability" id={index} onClick={changeStore}>
        {productAvailability ? (
          <InStockSymbol />
        ) : (
          <OutOfStockSymbol />
        )}
      </Availability>
      <Info>
        <StoreName data-test="storeName" id={index} onClick={changeStore}>{storeName}</StoreName>
      </Info>
      <Distance data-test="distance" id={index} onClick={changeStore}>{`${id} mi`}</Distance>
    </Container>
  );
};

export default StoreListItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 2.25rem;
  padding: 0.9rem 1.125rem;
  border-width: 1px;
  border-style: solid solid solid;
  border-color: rgb(224, 224, 224) rgb(224, 224, 224) rgb(224, 224, 224);
  border-top: 0px;
  background: rgb(255, 255, 255);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 0px 0.9375rem;
`;

const StoreName = styled.div`
  font-weight: 500;
`;

const Distance = styled.div`
  white-space: nowrap;
  font-weight: 700;
`;

const Availability = styled.div``;
