import express from 'express';
import * as path from 'path';
import { errorHandler } from './controles/errorController';
import userRouter from './router/userRouter';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/users', userRouter);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    statusCode: 404,
  });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/api/users`);
});

server.on('error', console.error);
