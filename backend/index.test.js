import supertest from 'supertest';
import { initApp } from './src/server';

jest.mock('uuid', () => ({ v4: () => 'new-id' }));

describe('backend tests', () => {
  const defaultItems = {
    1: { id: '1', label: 'cheese', isPurchased: false },
    2: { id: '2', label: 'apples', isPurchased: true },
  };

  it('should return a grocery list', async () => {
    const app = initApp(defaultItems);
    const request = supertest(app);

    const response = await request.get('/items');
    expect(response.body).toEqual(defaultItems);
  });

  it('should add a new item to the grocery list', async () => {
    const app = initApp(defaultItems);
    const request = supertest(app);

    const response = await request
      .post('/items')
      .send({ label: 'washing up liquid' })
      .set('content-type', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 'new-id', label: 'washing up liquid', isPurchased: false });
    expect(response.headers.location).toEqual('http://localhost:3017/items/new-id');
  });
});
