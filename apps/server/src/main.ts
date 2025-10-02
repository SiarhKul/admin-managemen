import express from 'express';
import * as path from 'path';
import { errorHandler } from './controles/errorController';
import userRouter from './router/userRouter';
import roleRouter from './router/roleRouter';
import logRouter from './router/logRouter';
import logger, { requestLogger, errorLogger } from './utils/logger';

const PORT = process.env.PORT || 3333;

const app = express();

// Add logging middleware
app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter);
app.use('/api/logs', logRouter);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    statusCode: 404,
  });
});

app.use(errorHandler);
app.use(errorLogger);

const server = app.listen(PORT, () => {
  logger.info(`Server started`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
  });
});

server.on('error', (err) => {
  logger.error('Server error', { error: err.message, stack: err.stack });
});
