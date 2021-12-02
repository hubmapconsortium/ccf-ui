import { createApp } from './lib/app';

const port = 3000;
const app = createApp();

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Started server on port ${port}`);
  }
});
