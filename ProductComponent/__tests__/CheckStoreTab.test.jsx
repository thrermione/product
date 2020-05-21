import React from 'react';
import { shallow } from 'enzyme';
import CheckStoreTab from '../client/src/components/CheckStoreTab';
import StoresContainer from '../client/src/components/StoresContainer';
import StoreSearchForm from '../client/src/components/StoreSearchForm';

describe('Check store tab', () => {
  test('it should render the stores container component when hasSearched is true', () => {
    const wrapper = shallow(<CheckStoreTab hasSearched={false} />);

    expect(wrapper.find(StoresContainer).exists()).toBe(false);
    expect(wrapper.find(StoreSearchForm).exists()).toBe(true);
    wrapper.setProps({ hasSearched: true });
    expect(wrapper.find(StoresContainer).exists()).toBe(true);
    expect(wrapper.find(StoreSearchForm).exists()).toBe(false);
  });
});
