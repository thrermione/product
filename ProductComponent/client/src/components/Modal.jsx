import React, { useState } from 'react';
import styled from 'styled-components';
import { OutOfStockSymbol } from './SVGs';

const Modal = ({ show, handleClick }) => (
  <Container show={show}>
    <ModalPointer />
    <ButtonWrapper>
      <Button onClick={handleClick}>
        <OutOfStockSymbol black />
      </Button>
    </ButtonWrapper>
    <MessageContainer>
      <NoticeWrapper>
        <StyledSpan>Notice:</StyledSpan>
      </NoticeWrapper>
      <MessageWrapper>
        <Message>
          The green check mark indicates that this item is currently available in this location. Items sell at varying rates and this is not a guarantee that the item will remain in stock for an extended period of time. If you want to ensure availability, visit the store soon or call ahead and speak with a Brick Specialist.
        </Message>
      </MessageWrapper>
    </MessageContainer>
  </Container>
);

export default Modal;

const Container = styled.div`
  top: -190px;
  left: -233px;
  display: ${(prop) => (prop.show ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 24px 0px;
  background-color: rgb(255, 255, 255);
  max-width: 95vw;
  max-height: 95vh;
  padding: 0px 0px 0.75rem;
  position: absolute;
  z-index: 1;
`;

const ModalPointer = styled.div`
  transform: translate(0px, 0px);
  position: absolute;
  width: 0px;
  height: 0px;
  top: 0px;
  bottom: 0px;
  left: 100%;
  right: unset;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent transparent rgb(255, 255, 255);
  border-image: initial;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  padding: 0px 1.5625rem;
`;

const Button = styled.button`
  border: white;
  z-index: 3;
  position: absolute;
  right: 0px;
  top: 0px;
  color: inherit;
  width: 1.875rem;
  height: 1.875rem;
  justify-content: center;
  align-items: center;
  display: flex;
  background: transparent;
  cursor: pointer;
`;

const MessageContainer = styled.div`
  padding: 1.562rem;
  overflow: auto;
`;

const NoticeWrapper = styled.span`
  text-transform: capitalize;
  padding: 1.125rem 0px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
`;

const StyledSpan = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
`;

const MessageWrapper = styled.div`
  width: 16.97rem;
`;

const Message = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  width: 20rem;
  max-width: 100%;
`;
