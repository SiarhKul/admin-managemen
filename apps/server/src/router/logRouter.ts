import express from 'express';
import logger from '../utils/logger';

const router = express.Router();

// Endpoint to receive client-side logs
router.post('/', (req, res) => {
  try {
    const logData = req.body;

    // Forward the log to our logger
    logger.info('Client Log', {
      clientLog: logData,
      source: 'client',
    });

    res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Failed to process client log', { error });
    res.status(500).json({ success: false, error: 'Failed to process log' });
  }
});

export default router;
