/*para ver esta página provocando un error descomenta en RegisterPage.jsx justo antes del return y sigue la instrucción*/ 
import React from 'react';
import PropTypes from 'prop-types';
import personaje01 from '../assets/images/casalink-personaje-01.svg';

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
				<div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#e6dada] p-6">
					<img src={personaje01} alt="Error inesperado" className="w-64 mb-6" />
					<h1 className="text-4xl font-bold text-red-500">¡Ups! Algo salió mal.</h1>
					<p className="text-lg text-gray-600 mt-4">
						Parece que tenemos problemas técnicos. Prueba a recargar la página o vuelve al inicio.
					</p>
					<div className="flex gap-4 mt-6">
						<button
							onClick={this.handleReload}
							className="px-6 py-3 bg-gray-500 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition-all"
						>
							🔄 Recargar Página
						</button>
						<button
							onClick={this.handleGoHome}
							className="px-6 py-3 bg-[#ff6666] text-white rounded-full text-lg font-semibold hover:bg-[#66ffff] hover:text-[#000033] transition-all"
						>
							🏠 Volver al Inicio
						</button>
					</div>
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
