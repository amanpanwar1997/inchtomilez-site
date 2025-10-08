import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { ColorfulIcon } from './ColorfulIcon';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Send to error tracking service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="max-w-2xl w-full">
            <div className="glass-premium p-8 md:p-12 rounded-lg border border-white/20 shadow-cinematic text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <ColorfulIcon
                  icon={AlertCircle}
                  color="red"
                  animation="pulse-glow"
                  size={64}
                  className="mx-auto"
                />
              </div>

              {/* Error Heading */}
              <h1 className="heading-lg mb-4">Oops! Something went wrong</h1>
              
              <p className="body-lg mb-8">
                We're sorry for the inconvenience. An unexpected error has occurred.
              </p>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="glass-subtle p-6 rounded-lg mb-8 text-left">
                  <p className="heading-sm mb-3 text-red-600">Error Details:</p>
                  <pre className="body-sm text-gray-700 overflow-auto max-h-48 whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <p className="heading-sm mt-4 mb-3 text-red-600">Stack Trace:</p>
                      <pre className="body-xs text-gray-600 overflow-auto max-h-48 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn-award"
                >
                  <RefreshCw className="h-5 w-5" />
                  Try Again
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="btn-outline-award"
                >
                  <Home className="h-5 w-5" />
                  Go to Homepage
                </button>
              </div>

              {/* Help Text */}
              <p className="body-sm mt-8 text-gray-500">
                If this problem persists, please contact support at{' '}
                <a href="mailto:info@inchtomilez.com" className="text-black hover:underline">
                  info@inchtomilez.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
