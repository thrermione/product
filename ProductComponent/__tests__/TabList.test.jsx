import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import axios from 'axios';
import TabList from '../client/src/components/TabList';
import BuyNowTab from '../client/src/components/BuyNowTab';
import CheckStoreTab from '../client/src/components/CheckStoreTab';

jest.mock('axios');

describe('TabList', () => {
  test('should display the Buy Now tab when you click the button', () => {
    const wrapper = shallow(<TabList />);
    wrapper.find('.CheckStore').simulate('click');
    wrapper.find('.BuyNow').simulate('click');
    expect(wrapper.find(CheckStoreTab).exists()).toBe(false);
    expect(wrapper.find(BuyNowTab).exists()).toBe(true);
  });

  test('should display the Check Store tab when you click the button', () => {
    const wrapper = shallow(<TabList />);
    wrapper.find('.CheckStore').simulate('click');
    expect(wrapper.find(CheckStoreTab).exists()).toBe(true);
    expect(wrapper.find(BuyNowTab).exists()).toBe(false);
  });

  test('should display the Check Store tab when you click the button twice', () => {
    const wrapper = shallow(<TabList />);
    wrapper.find('.CheckStore').simulate('click');
    expect(wrapper.find(CheckStoreTab).exists()).toBe(true);
    expect(wrapper.find(BuyNowTab).exists()).toBe(false);
    wrapper.find('.CheckStore').simulate('click');
    expect(wrapper.find(CheckStoreTab).exists()).toBe(true);
    expect(wrapper.find(BuyNowTab).exists()).toBe(false);
  });

  test('Buy Now tab should maintain cart data between tab switches', async () => {
    const { getByTestId, getByText } = render(<TabList productLimit={5} />);
    const options = { timeout: 2000 };

    fireEvent.click(getByTestId('addToCart'));
    await waitFor(() => expect(getByTestId('cartQuantity = 1')).toBeInTheDocument(), options);
    fireEvent.click(getByText('Check Store Stock'));
    fireEvent.click(getByText('Buy Now'));
    await waitFor(() => expect(getByTestId('cartQuantity = 1')).toBeInTheDocument());
  });

  test('Check Store tab should stay in searched state between tab switches', async () => {
    const { getByTestId, getByText, queryByTestId } = render(<TabList productLimit={6} />);
    const options = { timeout: 2000 };
    axios.get.mockResolvedValue({ data: [] });

    fireEvent.click(getByText('Check Store Stock'));
    expect(getByTestId('queryChange')).toBeInTheDocument();
    expect(queryByTestId('addToCart')).toBeNull();
    fireEvent.change(getByTestId('queryChange'), { target: { value: 94117 } });
    fireEvent.click(getByTestId('queryClick'));
    await waitFor(() => expect(queryByTestId('queryChange')).toBeNull(), options);
    expect(getByTestId('noStore')).toBeInTheDocument();
    fireEvent.click(getByText('Buy Now'));
    fireEvent.click(getByText('Check Store Stock'));
    expect(getByTestId('noStore')).toBeInTheDocument();
  });
});
