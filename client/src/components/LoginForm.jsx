// Componente de Botón reutilizable
// eslint-disable-next-line react/prop-types
function Button({ value, disabled, onClick }) {
	return (
		<button
			type="submit"
			disabled={disabled}
			onClick={onClick}
			className={`w-full py-3 px-4 text-white font-bold rounded cursor-pointer transition duration-300 ${
				disabled
					? 'bg-gray-400 cursor-not-allowed'
					: 'bg-[#ff6666] hover:bg-[#E05555]'
			}`}
		>
			{value}
		</button>
	);
}

// Componente de Input reutilizable
function Input({
	type,
	id,
	name,
	label,
	placeholder,
	value,
	onChange,
	autofocus,
}) {
	return (
		<label className="block text-gray-500 mt-3">
			{label}
			<input
				autoFocus={autofocus}
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="w-full px-4 py-3 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-500"
				required
			/>
		</label>
	);
}

// Formulario de Login
function LoginForm({ formValues, handleChange, handleLoginUser, loading }) {
	return (
		<section className="flex h-screen items-center justify-center bg-gray-100 px-4 overflow-hidden">
			<div className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold text-center text-gray-700">
					Iniciar Sesión
				</h2>

				<form className="space-y-4" onSubmit={handleLoginUser}>
					{/* Email */}
					<Input
						type="email"
						id="email"
						name="email"
						label="Correo Electrónico"
						placeholder="ejemplo@email.com"
						value={formValues.email}
						onChange={handleChange}
						autofocus={true}
					/>

					{/* Contraseña */}
					<Input
						type="password"
						id="password"
						name="password"
						label="Contraseña"
						placeholder="********"
						value={formValues.password}
						onChange={handleChange}
					/>

					{/* Botón de Login */}
					<Button
						value={loading ? 'Cargando...' : 'Iniciar Sesión'}
						disabled={loading}
					/>
				</form>

				{/* Link de Registro */}
				<p className="text-sm text-center text-gray-500">
					¿No tienes una cuenta?{' '}
					<a
						href="/register"
						className="text-blue-500 hover:underline"
					>
						Regístrate
					</a>
				</p>
			</div>
		</section>
	);
}

export default LoginForm;
