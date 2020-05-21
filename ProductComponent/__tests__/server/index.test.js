/* eslint-disable jest/no-test-callback */
import supertest from 'supertest';

import server from '../../server/index';
import db from '../../db/index';

const request = supertest(server);

describe('API tests', () => {
  afterAll(async (done) => {
    db.connection.end();
    done();
  });

  it('should get a product from the database', async (done) => {
    const product = {
      id: 1,
      productName: 'Fantastic Steel Bacon',
      price: 230.99,
      reviewCount: 88,
      rating: 4,
      themeName: 'DC Super Heroes',
      themeImageUrl: 'https://legofec.s3-us-west-1.amazonaws.com/themes/dc.png',
      featured: 'New',
      chokingHazard: 1,
      productLimit: 6,
      productImageUrl: 'https://legofec.s3-us-west-1.amazonaws.com/products/dc.png',
      productAvailabilityOnline: 0,
    };
    const res = await request.get(`/product/${product.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toEqual(product);
    done();
  });

  it('should get a list of stores with a product\'s availability from the database', async (done) => {
    const stores = [
      {
        id: 1,
        storeName: 'LEGO Store University Town Center',
        storeAddress: '4545 La Jolla Village Dr University Town Center Space H23, San Diego, CA 92122',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 101,
        storeName: 'LEGO Store Ontario Mills',
        storeAddress: '1 Mills Cir #631, Ontario, CA 91764',
        productId: 1,
        productAvailability: 0,
      },
      {
        id: 201,
        storeName: 'LEGO Store Fashion Valley',
        storeAddress: 'Fashion Valley, 7007 Friars Rd Space 965A, San Diego, CA 92108',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 301,
        storeName: 'LEGOLAND California Hotel LEGO Gift Shop',
        storeAddress: '5885 The Crossings Dr, Carlsbad, CA 92008',
        productId: 1,
        productAvailability: 0,
      },
      {
        id: 601,
        storeName: 'LEGO Store Disneyland Resort',
        storeAddress: 'Downtown Disney District, 1585 S, Disneyland Dr, Anaheim, CA 92802',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 701,
        storeName: 'LEGO Store South Coast Plaza',
        storeAddress: '3333 Bristol Street South Coast Plaza Space 1042, Costa Mesa, CA 92626',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 801,
        storeName: 'LEGO Store Glendale Galleria',
        storeAddress: '2130 Glendale Galleria, Glendale, CA 91210',
        productId: 1,
        productAvailability: 0,
      },
      {
        id: 1001,
        storeName: 'LEGO Store Stoneridge',
        storeAddress: '1444 Stoneridge Mall Space D117A, Pleasanton, CA 94588',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 1101,
        storeName: 'LEGO Store Hillsdale Shopping Center',
        storeAddress: '341 E Sailer Dr, San Mateo, CA 94403',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 1401,
        storeName: 'LEGO Store Mission Viejo',
        storeAddress: '555 The, Shops At Mission Viejo Space 428B, Mission Viejo, CA 92691',
        productId: 1,
        productAvailability: 0,
      },
      {
        id: 1501,
        storeName: 'LEGO Store San Francisco',
        storeAddress: '865 Market St Space C41, San Francisco, CA 94103',
        productId: 1,
        productAvailability: 1,
      },
      {
        id: 1601,
        storeName: 'LEGO Store Westfield Topanga',
        storeAddress: '6600 Topanga Canyon Blvd, Canoga Park, CA 91303',
        productId: 1,
        productAvailability: 0,
      },
    ];

    const res = await request.get(`/product/${stores[0].productId}/find-store?q=CA`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(stores);
    expect(res.body.length).toEqual(12);
    expect(res.body.filter((store) => store.productId === 1).length).toEqual(12);
    done();
  });

  it('should respond with a 404 to a product request if product is not found', async (done) => {
    const res = await request.get('/product/null');
    expect(res.statusCode).toEqual(404);
    done();
  });

  it('should respond with a 404 to a find-store request if product is not found', async (done) => {
    const res = await request.get('/product/null/find-store');
    expect(res.statusCode).toEqual(404);
    done();
  });
});
