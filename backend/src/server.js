import express from 'express';
import { v4 as uuidv4 } from 'uuid';

export const initApp = (items = {}) => {
  const app = express();

  app.use(express.json());

  app.locals.items = { ...items };

  app.get('/items', (_, res) => {
    res.send(Object.values(app.locals.items));
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

  app.delete('/items/:id', (req, res) => {
    const {
      params: { id },
    } = req;

    if (!app.locals.items[id]) {
      return res.sendStatus(404);
    }

    delete app.locals.items[id];

    return res.sendStatus(204);
  });

  return app;
};
