import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SearchButton } from './SVGs';

const StoreSearchForm = ({ query, handleSubmitQuery, handleChangeQuery }) => (
  <div>
    <StyledMessage>Enter your address to find a store near you.</StyledMessage>
    <form onSubmit={handleSubmitQuery}>
      <SearchWrapper>
        <SearchBarWrapper>
          <StyledLabel tabIndex="-1">
            <StyledInput
              type="text"
              data-testid="queryChange"
              value={query}
              onChange={handleChangeQuery}
            />
            <EnterText tabIndex="-1">
              Enter a city and state or zip code
            </EnterText>
          </StyledLabel>
        </SearchBarWrapper>
        <SearchButton />
      </SearchWrapper>
    </form>
  </div>
);

StoreSearchForm.propTypes = {
  query: PropTypes.string,
  handleChangeQuery: PropTypes.func,
  handleSubmitQuery: PropTypes.func,
};

StoreSearchForm.defaultProps = {
  query: '',
  handleChangeQuery: () => {},
  handleSubmitQuery: () => {},
};

export default StoreSearchForm;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const SearchBarWrapper = styled.div`
  flex: 1 1 0%;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  color: rgb(44, 44, 44);
  height: 3.45rem;
  background: rgb(255, 255, 255);
  padding: 1.125rem 1.25rem 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(224, 224, 224);
  border-image: initial;
  font-size: 16px;
`;

const EnterText = styled.span`
  position: absolute;
  top: 0.9375rem;
  left: 1.25rem;
  transform-origin: left top;
  transform: translate(0px, 0px);
  color: rgb(117, 117, 117);
  font-size: 1em;
  white-space: nowrap;
  transition: all 0.1s ease-in-out 0s;
  &${StyledInput}:focus {
    transform: translate(1px, -0.4375rem);
    font-size: 0.8em;
  };
`;

const StyledMessage = styled.p`
  font-size: .875rem;
  line-height: 1.1875rem;
  font-weight: 400;
  margin-top: 0px;
`;
