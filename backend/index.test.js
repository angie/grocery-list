import supertest from 'supertest';
import { initApp } from './src/server';

jest.mock('uuid', () => ({ v4: () => 'new-id' }));

const defaultItems = {
  1: { id: '1', label: 'cheese', isPurchased: false },
  2: { id: '2', label: 'apples', isPurchased: true },
};

let request;

beforeEach(() => {
  const app = initApp(defaultItems);
  request = supertest(app);
});

describe('backend tests', () => {
  it('should return a grocery list', async () => {
    const response = await request.get('/items');
    expect(response.body).toEqual(defaultItems);
  });

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
