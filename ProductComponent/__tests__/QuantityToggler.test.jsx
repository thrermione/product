import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { shallow, mount } from 'enzyme';
import QuantityToggler from '../client/src/components/QuantityToggler';
import TabList from '../client/src/components/TabList';

describe('Quantity Toggler', () => {
  describe('Input quantity', () => {
    let wrapper;
    beforeEach(() => {
      const fakePropValue = 1;
      wrapper = mount(
        <TabList
          productAvailabilityOnline={fakePropValue}
          productLimit={7}
        />,
      );
    });
    test('should change input quantity when value is inputted', () => {
      wrapper.find('[data-testid="input"]').first().simulate('change', { target: { value: 5 } });
      expect(wrapper.find('[value=5]').length).toBeTruthy();
      expect(wrapper.find('[value=3]').length).toEqual(0);
    });

    test('should change input to 1 if input value is less than 1', () => {
      wrapper.find('[data-testid="input"]').first().simulate('focus');
      wrapper.find('[data-testid="input"]').first().simulate('change', { target: { value: -1 } });
      wrapper.find('[data-testid="input"]').first().simulate('blur');
      expect(wrapper.find('[value=1]').length).toBeTruthy();
      expect(wrapper.find('[value=-1]').length).toEqual(0);
    });

    test('should change input to the difference of cart quantity and limit if input value is greater than limit', () => {
      wrapper.find('[data-testid="input"]').first().simulate('focus');
      wrapper.find('[data-testid="input"]').first().simulate('change', { target: { value: 10 } });
      wrapper.find('[data-testid="input"]').first().simulate('blur');
      expect(wrapper.find('[value=7]').length).toBeTruthy();
      expect(wrapper.find('[value=10]').length).toEqual(0);
    });

    test('should increase input quantity by 1 when increase button is clicked', () => {
      wrapper.find('[data-test="increase"]').first().simulate('click');
      expect(wrapper.find('[value=2]').length).toBeTruthy();
      expect(wrapper.find('[value=3]').length).toEqual(0);
    });

    test('should decrease input quantity by 1 when decrease button is clicked', () => {
      wrapper.find('[data-test="increase"]').first().simulate('click');
      wrapper.find('[data-test="increase"]').first().simulate('click');
      wrapper.find('[data-test="decrease"]').first().simulate('click');
      expect(wrapper.find('[value=2]').length).toBeTruthy();
      expect(wrapper.find('[value=3]').length).toEqual(0);
    });

    test('should add input quantity to cart quantity when add to cart button is clicked', async () => {
      const fakePropValue = 1;
      const { getByTestId, queryByTestId } = render(<TabList
        productAvailabilityOnline={fakePropValue}
        productLimit={7}
      />);
      const options = { timeout: 2000 };

      fireEvent.change(getByTestId('input'), { target: { value: 5 } });
      fireEvent.click(getByTestId('addToCart'));
      await waitFor(() => expect(getByTestId('cartQuantity = 5')).toBeInTheDocument(), options);
      await waitFor(() => expect(queryByTestId('cartQuantity = 3')).toBeNull());
    });
  });

  describe('Button disabling', () => {
    test('should disable decrease button if quantity equals 1', () => {
      const wrapper = shallow(<QuantityToggler
        quantity={1}
      />);
      expect(wrapper.find('[data-test="decrease"]').prop('disabled')).toBe(true);
    });
    test('should disable increase button if quantity equals product limit', () => {
      const wrapper = shallow(<QuantityToggler
        quantity={3}
        productLimit={3}
      />);
      expect(wrapper.find('[data-test="increase"]').prop('disabled')).toBe(true);
    });
  });
});
