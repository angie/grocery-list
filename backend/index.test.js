import supertest from 'supertest';
import { initApp } from './src/server';

jest.mock('uuid', () => ({ v4: () => 'new-id' }));

const defaultItems = {
  1: { id: '1', label: 'cheese', isPurchased: false },
  2: { id: '2', label: 'apples', isPurchased: true },
};

let app;
let request;

beforeEach(() => {
  app = initApp(defaultItems);
  request = supertest(app);
});

describe('retrieving items', () => {
  it('should initialise app with an empty grocery list', async () => {
    const freshApp = initApp();

    const response = await supertest(freshApp).get('/items');
    expect(response.body).toEqual([]);
  });

  it('should return a grocery list', async () => {
    const response = await request.get('/items');
    expect(response.body).toEqual(Object.values(defaultItems));
  });
});

describe('adding new items', () => {
  it('should add a new item to the grocery list', async () => {
    const response = await request
      .post('/items')
      .set('content-type', 'application/json')
      .send({ label: 'washing up liquid' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 'new-id', label: 'washing up liquid', isPurchased: false });
    expect(response.headers.location).toEqual('http://localhost:3017/items/new-id');
  });

  it('should return an error if no label is provided for a new item', async () => {
    const response = await request.post('/items').set('content-type', 'application/json').send({});

    expect(response.statusCode).toBe(400);
  });
});

describe('updating items', () => {
  it('should update the purchased status of an existing item', async () => {
    const response = await request
      .put('/items/2')
      .set('content-type', 'application/json')
      .send({ isPurchased: false });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: '2', label: 'apples', isPurchased: false });
  });

  it('should return an error when attempting to update a non-existent item', async () => {
    const response = await request
      .put('/items/hello')
      .set('content-type', 'application/json')
      .send({ isPurchased: true });

    expect(response.statusCode).toBe(404);
  });

  it('should ignore unknown item properties', async () => {
    const response = await request
      .put('/items/1')
      .set('content-type', 'application/json')
      .send({ id: 'new-id', size: 'large' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(defaultItems['1']);
  });
});

describe('deleting items', () => {
  it('should delete an item by ID', async () => {
    const response = await request.delete('/items/1');

    expect(response.statusCode).toBe(204);
    expect(app.locals.items[1]).toBeUndefined();
  });

  it('should return an error when attempting to delete a non-existent item by ID', async () => {
    const response = await request.delete('/items/bobbins');

    expect(response.statusCode).toBe(404);
  });
});
