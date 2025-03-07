import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-100">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ha ocurrido un error inesperado.</h1>
          <p className="mb-4">Estamos trabajando para solucionarlo. Por favor, recarga la página o vuelve al inicio.</p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700 transition"
          >
            Recargar Página
          </button>
          <button
            onClick={this.handleGoHome}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-700 transition"
          >
            Volver al Inicio
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
