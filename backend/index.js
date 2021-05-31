import { initApp } from './src/server';

const app = initApp();

app.listen(3017, () => console.log('backend started'));
