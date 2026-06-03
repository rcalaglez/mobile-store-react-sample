import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-medium text-neutral-900">
            Algo salió mal
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Ha ocurrido un error inesperado.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              Reintentar
            </button>
            <a
              href="/"
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
