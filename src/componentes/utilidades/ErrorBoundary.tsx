import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100 text-slate-800 p-6 text-center border-2 border-red-500 rounded-xl">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error cargando 3D</h2>
          <p className="text-sm">Hubo un problema al cargar los recursos (posible bloqueo de texturas).</p>
          <p className="text-xs mt-2 text-slate-500 font-mono">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
