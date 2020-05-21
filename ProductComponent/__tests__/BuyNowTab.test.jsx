import React from 'react';
import { shallow, mount } from 'enzyme';
import BuyNowTab from '../client/src/components/BuyNowTab';
import QuantityToggler from '../client/src/components/QuantityToggler';
import AddToCartButton from '../client/src/components/AddToCartButton';

describe('BuyNowTab', () => {
  test('should render tab if product is available online', () => {
    const fakePropValue = 1;

    const wrapper = mount(<BuyNowTab
      productAvailabilityOnline={fakePropValue}
      productLimit={3}
    />);
    expect(wrapper.contains('Available now')).toBe(true);
    expect(wrapper.find(QuantityToggler).length).toBe(1);
    expect(wrapper.contains('Limit 3')).toBe(true);
    expect(wrapper.find(AddToCartButton).length).toBe(1);
  });

  test('should display out of stock message if product is unavailable online', () => {
    const fakePropValue = 0;

    const wrapper = shallow(<BuyNowTab productAvailabilityOnline={fakePropValue} />);
    expect(wrapper.contains('Temporarily out of stock')).toBe(true);
    expect(wrapper.contains('Available now')).toBe(false);
    expect(wrapper.find(QuantityToggler).length).toBe(0);
    expect(wrapper.contains('Limit 3')).toBe(false);
    expect(wrapper.find(AddToCartButton).length).toBe(0);
  });
});
