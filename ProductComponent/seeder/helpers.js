const {
  mockStores, mockThemes, mockFeatured, mockNames,
} = require('./exampleData.js');
const {
  getRandomInt, getRandomRating, getRandomPrice, getRandomBoolean,
} = require('./randomizers');

const createStoreInventory = (max) => {
  const storeList = [];
  for (let i = 0; i < mockStores.length; i += 1) {
    const { name, address } = mockStores[i];
    for (let j = 1; j <= max; j += 1) {
      const productId = j;
      const store = [name, address, productId, getRandomBoolean()];
      storeList.push(store);
    }
  }
  return storeList;
};

const createRandomProducts = (max) => {
  const productList = [];
  for (let i = 1; i <= max; i += 1) {
    const name = mockNames[getRandomInt(0, mockNames.length - 1)];
    const price = getRandomPrice(10, 300);
    const reviewCount = getRandomInt(0, 100);
    const rating = getRandomRating(0, 5);
    const theme = mockThemes[getRandomInt(0, mockThemes.length - 1)];
    const featured = mockFeatured[getRandomInt(0, mockFeatured.length - 1)];
    const chokingHazard = getRandomBoolean();
    const productLimit = getRandomInt(3, 7);
    const availabilityOnline = getRandomBoolean();

    productList.push(
      [
        name,
        price,
        reviewCount,
        rating,
        theme.name,
        theme.themeURL,
        featured,
        chokingHazard,
        productLimit,
        theme.productURL,
        availabilityOnline,
      ],
    );
  }
  return productList;
};

module.exports = {
  createStoreInventory,
  createRandomProducts,
};
