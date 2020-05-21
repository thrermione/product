import React from 'react';
import { shallow } from 'enzyme';
import StoreInfo from '../client/src/components/StoreInfo';

describe('Store info', () => {
  let wrapper;
  beforeEach(() => {
    const store = { storeName: 'test', storeAddress: 'test', productAvailability: true };
    wrapper = shallow(<StoreInfo store={store} />);
  });

  test('should display product availability', () => {
    expect(wrapper.find('[data-test="availability"]').exists()).toBe(true);
  });

  test('should display store name', () => {
    expect(wrapper.find('[data-test="storeName"]').exists()).toBe(true);
  });

  test('should display store address', () => {
    expect(wrapper.find('[data-test="storeAddress"]').exists()).toBe(true);
  });

  test('should display distance', () => {
    expect(wrapper.find('[data-test="distance"]').exists()).toBe(true);
  });
});
