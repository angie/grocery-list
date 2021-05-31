import express from 'express';

export const initApp = (items = {}) => {
  const app = express();

  app.use(express.json());

  app.locals.items = items;

  app.get('/items', (_, res) => {
    res.send(app.locals.items);
  });

  return app;
};
