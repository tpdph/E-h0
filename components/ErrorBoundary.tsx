import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4">
          <div className="max-w-md w-full">
            <div className="bg-[var(--bg-secondary)] rounded-lg p-8 shadow-lg border border-[var(--border-primary)]">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                Something went wrong
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">
                An error occurred while rendering this component. Please try refreshing the page.
              </p>
              <pre className="bg-[var(--bg-tertiary)] p-4 rounded-md text-sm text-[var(--text-tertiary)] overflow-auto mb-6">
                {this.state.error?.message}
              </pre>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary w-full"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
