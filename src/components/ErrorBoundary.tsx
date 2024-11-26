import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onError: (error: Error, errorInfo: string) => void;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error, errorInfo.componentStack || '');
  }

  public render() {
    return this.props.children;
  }
}