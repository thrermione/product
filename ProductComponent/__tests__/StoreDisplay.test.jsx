import React from 'react';
import { shallow } from 'enzyme';
import StoreDisplay from '../client/src/components/StoreDisplay';
import StoreInfo from '../client/src/components/StoreInfo';
import StoreListItem from '../client/src/components/StoreListItem';

describe('Store Display', () => {
  test('it should render store info', () => {
    const stores = [{
      storeName: 'LEGO Store University Town Center',
      storeAddress: '4545 La Jolla Village Dr University Town Center Space H23, San Diego, CA 92122',
      productAvailability: true,
    }];

    const wrapper = shallow(<StoreDisplay stores={stores} />);

    expect(wrapper.find(StoreInfo).exists()).toBe(true);
  });

  test('it should render a select store button', () => {
    const stores = [{ fakeData: 'fakeData' }];

    const wrapper = shallow(<StoreDisplay stores={stores} />);

    expect(wrapper.find('[data-test="selectStore"]').exists()).toBe(true);
  });

  test('it should render 3 store list items after clicking select store button', () => {
    const stores = [{ fakeData: 'fakeData' }, { fakeData: 'fakeData' }, { fakeData: 'fakeData' }, { fakeData: 'fakeData' }];

    const wrapper = shallow(<StoreDisplay stores={stores} />);

    wrapper.find('[data-test="selectStore"]').simulate('click');
    expect(wrapper.find(StoreListItem).length).toEqual(3);
  });
});
