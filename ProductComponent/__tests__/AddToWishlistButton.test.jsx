import React from 'react';
import { shallow } from 'enzyme';
import AddToWishlistButton from '../client/src/components/AddToWishlistButton';

describe('Add to wishlist button', () => {
  test("should say 'Added to Wishlist' after being clicked on", () => {
    const wrapper = shallow(<AddToWishlistButton />);
    wrapper.find('[data-test="wishlist"]').simulate('click');
    expect(wrapper.contains('Add to Wishlist')).toBe(false);
    expect(wrapper.contains('Added to Wishlist')).toBe(true);
  });

  test("should display 'Add to Wishlist' after being clicked on twice", () => {
    const wrapper = shallow(<AddToWishlistButton />);
    wrapper.find('[data-test="wishlist"]').simulate('click');
    wrapper.find('[data-test="wishlist"]').simulate('click');
    expect(wrapper.contains('Add to Wishlist')).toBe(true);
    expect(wrapper.contains('Added to Wishlist')).toBe(false);
  });
});
