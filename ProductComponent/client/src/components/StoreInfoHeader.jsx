import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './Modal';

const StoreInfoHeader = ({ handleChangeStore }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container>
      <InfoButtonContainer data-test="closestStoreText">
        Closest Store
        <InfoButtonWrapper>
          <InfoButton data-test="infoButton" type="button" onClick={handleClick}>i</InfoButton>
        </InfoButtonWrapper>
        <Modal show={show} handleClick={handleClick} />
      </InfoButtonContainer>
      <ChangeStoreButton data-test="changeStoreButton" type="button" onClick={handleChangeStore}>
        <ChangeStoreText>Change Store Location</ChangeStoreText>
      </ChangeStoreButton>
    </Container>
  );
};

export default StoreInfoHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

export const InfoButton = styled.button`
  width: 1.125rem;
  height: 1.125rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(117, 117, 117);
  border-image: initial;
  border-radius: 100%;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  &:hover {
    color: rgb(0, 109, 183);
    border-color: rgb(0, 109, 183);
  };
`;

const InfoButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InfoButtonWrapper = styled.span`
  font-size: 0.75rem;
  line-height: 1.125rem;
  margin-left: 0.3125rem;
`;

const ChangeStoreButton = styled.button`
  display: inline-block;
  width: auto;
  border-collapse: collapse;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.1875rem;
  color: rgb(0, 109, 183);
  padding: 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 0px;
  background: transparent;
`;

const ChangeStoreText = styled.span`
  font-size: 1rem;
  line-height: 1.5625rem;
  font-weight: 400;
  cursor: pointer;
`;

StoreInfoHeader.propTypes = {
  handleChangeStore: PropTypes.func,
};

StoreInfoHeader.defaultProps = {
  handleChangeStore: () => {},
};
