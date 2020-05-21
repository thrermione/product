import React from 'react';
import styled from 'styled-components';

const SafetyWarning = () => (
  <Container className="safety-warning">
    <SafetyImage className="warning-icon" />
    <SafetyMessage className="warning-message">
      Warning!
      <br />
      Choking Hazard.
      <br />
      Small parts.
    </SafetyMessage>
  </Container>
);

export default SafetyWarning;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 1.25rem;
    padding-left: 0px;
`;

const SafetyImage = styled.div`
    width: 3.75rem;
    height 55px;
    margin: 0px 1.125rem 0px 0px;
    background: url(https://legofec.s3-us-west-1.amazonaws.com/safetyImage.png);
    background-position: center center;
`;

const SafetyMessage = styled.span`
  max-width: 8.49rem;
  font-size: .875rem;
  line-height: 1.1875rem;
  font-weight: 500;
`;
