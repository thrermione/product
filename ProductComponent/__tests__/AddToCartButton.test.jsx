import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import AddToCartButton from '../client/src/components/AddToCartButton';
import TabList from '../client/src/components/TabList';
import QuantityToggler from '../client/src/components/QuantityToggler';

describe('AddToCartButton', () => {
  test('should remove components except add to cart button when cart limit is reached', async () => {
    const fakePropValue = 1;
    const { getByTestId, queryByText, queryByTestId } = render(
      <TabList productLimit={1} productAvailabilityOnline={fakePropValue} />,
    );
    const options = { timeout: 2000 };

    fireEvent.click(getByTestId('addToCart'));
    await waitFor(() => expect(queryByText('Limit 1')).toBeNull(), options);
    await waitFor(() => expect(queryByTestId('input')).toBeNull(), options);
    await waitFor(() => expect(getByTestId('addToCart')).toBeInTheDocument(), options);
  });

  test('should show components if cart limit is not reached', () => {
    const fakePropValue = 1;
    const wrapper = mount(<TabList productLimit={5} productAvailabilityOnline={fakePropValue} />);

    wrapper.find('[data-testid="addToCart"]').first().simulate('click');
    wrapper.find('[data-testid="addToCart"]').first().simulate('click');
    expect(wrapper.contains('Limit 5')).toBe(true);
    expect(wrapper.find(QuantityToggler).length).toBe(1);
    expect(wrapper.find(AddToCartButton).length).toBe(1);
  });

  test('should render the limit exceeded button when limit is reached', async () => {
    const options = { timeout: 2000 };
    const fakePropValue = 1;
    const { getByTestId, getByText } = render(
      <TabList productLimit={1} productAvailabilityOnline={fakePropValue} />
    );

    fireEvent.click(getByTestId('addToCart'));
    await waitFor(() => expect(getByTestId('addToCart')).toBeInTheDocument(), options);
    await waitFor(() => expect(getByText('Limit exceeded')).toBeInTheDocument(), options);
  });
});
