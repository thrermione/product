import React from 'react';
import { shallow } from 'enzyme';
import StoreInfoHeader from '../client/src/components/StoreInfoHeader';

describe('Store Info Header', () => {
  describe('Display children', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<StoreInfoHeader />);
    });
    test('should display an info button', () => {
      expect(wrapper.find('[data-test="infoButton"]').exists()).toBe(true);
    });
    test('should display "Closest Store" text', () => {
      expect(wrapper.find('[data-test="closestStoreText"]').exists()).toBe(true);
    });
    test('should display a "Change Store Location" button', () => {
      expect(wrapper.find('[data-test="changeStoreButton"]').exists()).toBe(true);
    });
  });

  describe('Functions', () => {
    const onClickMock = jest.fn();

    test('should call an onClick handler when "Change Store Location" button is clicked', () => {
      const wrapper = shallow(<StoreInfoHeader handleChangeStore={onClickMock} />);
      wrapper.find('[data-test="changeStoreButton"]').simulate('click');
      expect(onClickMock).toHaveBeenCalled();
    });
  });
});
