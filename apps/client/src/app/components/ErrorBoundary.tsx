import React from 'react';
import logger from '../../utils/logger';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('Unhandled React error boundary', {
      error: error.message,
      stack: error.stack,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  renderTopBanner() {
    if (!this.state.hasError) return null;

    const message = this.state.error?.message || 'Something went wrong.';

    return (
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          background: '#fff1f0',
          color: '#cf1322',
          borderBottom: '1px solid #ffa39e',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ fontWeight: 600 }}>Application Error:</span>
        <span style={{ marginLeft: 8, flex: 1 }}>{message}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={this.handleReset} style={{ padding: '6px 10px' }}>
            Dismiss
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '6px 10px' }}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          {this.renderTopBanner()}
          <div style={{ padding: '16px' }}>
            <h2>Something went wrong.</h2>
            <p>Please try dismissing this message or reload the page.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.renderTopBanner()}
        {this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
