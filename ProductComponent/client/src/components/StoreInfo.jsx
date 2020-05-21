import React from 'react';
import styled from 'styled-components';
import { InStockSymbol, OutOfStockSymbol } from './SVGs';

const StoreInfo = ({ store }) => {
  const {
    storeName, storeAddress, productAvailability, id,
  } = store;

  return (
    <Container>
      <Availability data-test="availability">
        {productAvailability ? (
          <InStockSymbol />
        ) : (
          <OutOfStockSymbol />
        )}
      </Availability>
      <Info>
        <StoreName data-test="storeName">{storeName}</StoreName>
        <AvailabilityMessage>{productAvailability ? 'In Stock at this time' : 'Out of Stock'}</AvailabilityMessage>
        <StoreAddress data-test="storeAddress">{storeAddress}</StoreAddress>
      </Info>
      <Distance data-test="distance">{`${id} mi`}</Distance>
    </Container>
  );
};

export default StoreInfo;

const Container = styled.div`
  display: flex;
  padding-top: 1.125rem;
  padding-bottom: 1.125rem;
  margin-bottom: 1.125rem;
  border-bottom: 1px solid rgb(224, 224, 224);
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

const StoreAddress = styled.div`
  color: rgb(117, 117, 117);
  margin-bottom: 0.625rem;
  font-size: 0.9375rem;
  max-width: 9.375rem;
`;

const Distance = styled.div`
  white-space: nowrap;
  font-weight: 700;
  padding-left: .25rem;
  padding-right: .25rem;
`;

const Availability = styled.div`
  padding-left: .25rem;
  padding-right: .25rem;
`;

const AvailabilityMessage = styled.div`
  color: rgb(117, 117, 117);
  font-size: 0.75rem;
  font-weight: 500;
`;
