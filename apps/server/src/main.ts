import express from 'express';
import * as path from 'path';
import userController from './controles/userController';
import { errorHandler } from './controles/errorController';

const PORT = process.env.PORT || 3333;

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/users', userController);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/api/users`);
});

server.on('error', console.error);
