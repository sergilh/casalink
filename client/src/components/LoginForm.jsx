// Componente de Botón reutilizable
// eslint-disable-next-line react/prop-types
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Componente de Botón reutilizable
function Button({ value, disabled }) {
	return (
		<button
			type="submit"
			disabled={disabled}
			className={`w-full py-2 text-white font-semibold rounded-full transition duration-300 ${
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
	showPasswordToggle,
}) {
	const isPasswordField = name === 'password'; // Verifica si el input es de tipo contraseña
	return (
		<label className="block text-gray-500 relative">
			{label}
			<div className="relative">
				<input
					autoFocus={autofocus}
					type={type}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full px-4 py-2 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-500 pr-10"
					required
				/>
				{/* Botón para mostrar/ocultar contraseña */}
				{isPasswordField && showPasswordToggle && (
					<button
						type="button"
						onClick={showPasswordToggle}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						{type === 'password' ? (
							<EyeIcon className="h-5 w-5" />
						) : (
							<EyeSlashIcon className="h-5 w-5" />
						)}
					</button>
				)}
			</div>
		</label>
	);
}

// Formulario de Login con opción de mostrar contraseña
function LoginForm({ formValues, handleChange, handleLoginUser, loading }) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<section className="flex flex-grow items-center justify-center bg-gray-100 px-4">
			<article className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
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

					{/* Contraseña con opción de mostrar */}
					<Input
						type={showPassword ? 'text' : 'password'}
						id="password"
						name="password"
						label="Contraseña"
						placeholder="********"
						value={formValues.password}
						onChange={handleChange}
						showPasswordToggle={() =>
							setShowPassword(!showPassword)
						}
						isPassword={true}
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
					.
				</p>
				<p className="text-sm text-center text-gray-500">
					Si necesitas recuperar tu contraseña, puedes hacerlo{' '}
					<a
						href={`/recover-password?email=${formValues.email}`}
						className="text-blue-500 hover:underline"
					>
						aquí
					</a>
					.
				</p>
			</article>
		</section>
	);
}

export default LoginForm;
