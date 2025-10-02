// Client-side logging utility
class Logger {
  private service: string;

  constructor(service: string = 'admin-management-client') {
    this.service = service;
  }

  private formatMessage(level: string, message: string, meta?: any) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      ...meta,
    });
  }

  private sendToServer(level: string, message: string, meta?: any) {
    // Send logs to server endpoint for centralized logging
    fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: this.formatMessage(level, message, meta),
    }).catch((err) => {
      console.error('Failed to send log to server:', err);
    });
  }

  info(message: string, meta?: any) {
    const formatted = this.formatMessage('info', message, meta);
    console.log(formatted);
    this.sendToServer('info', message, meta);
  }

  warn(message: string, meta?: any) {
    const formatted = this.formatMessage('warn', message, meta);
    console.warn(formatted);
    this.sendToServer('warn', message, meta);
  }

  error(message: string, meta?: any) {
    const formatted = this.formatMessage('error', message, meta);
    console.error(formatted);
    this.sendToServer('error', message, meta);
  }

  debug(message: string, meta?: any) {
    const formatted = this.formatMessage('debug', message, meta);
    console.debug(formatted);
    this.sendToServer('debug', message, meta);
  }
}

export default new Logger();
