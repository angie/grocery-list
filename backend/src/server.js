import express from 'express';
import { v4 as uuidv4 } from 'uuid';

export const initApp = (items = {}) => {
  const app = express();

  app.use(express.json());

  app.locals.items = items;

  app.get('/items', (_, res) => {
    res.send(app.locals.items);
  });

  app.post('/items', (req, res) => {
    const id = uuidv4();
    const { body } = req;

    if (!body.label) {
      return res.sendStatus(400);
    }

    const newItem = { id, label: body.label, isPurchased: false };

    app.locals.items[id] = newItem;

    return res.status(201).location(`http://localhost:3017/items/${id}`).send(newItem);
  });

  return app;
};
