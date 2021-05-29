import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/items', (_, res) => {
  res.send([{ id: '1', isPurchased: false, label: 'cheese' }]);
});

export default app;
