import React from 'react';
import { shallow } from 'enzyme';
import StoresContainer from '../client/src/components/StoresContainer';
import StoreDisplay from '../client/src/components/StoreDisplay';
import StoreInfoHeader from '../client/src/components/StoreInfoHeader';

describe('Stores Container', () => {
  test('it should render the Store Display if there are stores', () => {
    const stores = [{ storeData: 'fakeData' }];

    const wrapper = shallow(<StoresContainer stores={stores} />);

    expect(wrapper.find(StoreDisplay).exists()).toBe(true);
  });

  test('it should display a message if there are no stores', () => {
    const stores = [];

    const wrapper = shallow(<StoresContainer stores={stores} />);

    expect(wrapper.find('[data-testid="noStore"]').exists()).toBe(true);
  });

  test('it should render the StoreInfoHeader', () => {
    const wrapper = shallow(<StoresContainer />);
    expect(wrapper.find(StoreInfoHeader).exists()).toBe(true);
  });
});
