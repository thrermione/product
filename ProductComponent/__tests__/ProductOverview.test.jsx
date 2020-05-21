import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import ProductOverview, { getProduct } from '../client/src/components/ProductOverview';

jest.mock('axios');

describe('Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<ProductOverview />);
    expect(wrapper).toExist();
  });
});

describe('Data fetcher', () => {
  test('should fetch data from database on success', async () => {
    const data = { data: [{ chokingHazard: true }] };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getProduct(1)).resolves.toEqual(data);
  });

  test('should throw error on failure', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    await expect(getProduct(null)).rejects.toThrow(errorMessage);
  });
});
