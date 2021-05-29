import supertest from 'supertest';
import app from './src/server';

describe('backend tests', () => {
  it('should return a grocery list', async () => {
    const request = supertest(app);

    const response = await request.get('/items');
    expect(response.body).toEqual([{ id: '1', label: 'cheese', isPurchased: false }]);
  });
});
