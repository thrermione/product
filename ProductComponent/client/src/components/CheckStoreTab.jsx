import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StoreSearchForm from './StoreSearchForm';
import StoresContainer from './StoresContainer';

const CheckStoreTab = (props) => {
  const {
    stores, query, handleChangeQuery, handleSubmitQuery, hasSearched, handleChangeStore,
  } = props;

  return (
    <Container>
      {hasSearched
        ? <StoresContainer data-testid="storesContainer" stores={stores} handleChangeStore={handleChangeStore} />
        : (
          <StoreSearchForm
            data-testid="storeSearchForm"
            query={query}
            handleChangeQuery={handleChangeQuery}
            handleSubmitQuery={handleSubmitQuery}
          />
        )}
    </Container>
  );
};

CheckStoreTab.propTypes = {
  stores: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.string,
  hasSearched: PropTypes.bool,
  handleChangeQuery: PropTypes.func,
  handleSubmitQuery: PropTypes.func,
  handleChangeStore: PropTypes.func,
};

CheckStoreTab.defaultProps = {
  stores: [],
  query: '',
  hasSearched: false,
  handleChangeQuery: () => {},
  handleSubmitQuery: () => {},
  handleChangeStore: () => {},
};

export default CheckStoreTab;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding-top: 1.125rem;
  border-top: 1px solid rgb(224, 224, 224);
`;
