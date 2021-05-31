import supertest from 'supertest';
import { initApp } from './src/server';

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
});
