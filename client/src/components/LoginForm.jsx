<<<<<<< HEAD
// eslint-disable-next-line react/prop-types
function Button({ value }) {
	return (
		<button
			// eslint-disable-next-line no-undef
			onClick={() => preventDefault(e)}
			className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#66ffff] transform hover:-translate-y-1 hover:shadow-lg"
=======
// Componente de Botón reutilizable
// eslint-disable-next-line react/prop-types
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
>>>>>>> 39015f5 (actualizado loginPage)
		>
			{value}
		</button>
	);
}

<<<<<<< HEAD
// eslint-disable-next-line react/prop-types
function Input({ type, id, name, label, placeholder, autofocus }) {
	return (
		<label className="text-gray-500 block mt-3">
			{label}
=======
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
		<label className="block text-gray-500">
			{label}
			<input
				autoFocus={autofocus}
				type={type}
				id={id}
				name={name}
<<<<<<< HEAD
				placeholder={placeholder}
				className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
			/>
		</label>
	);
}

function LoginForm() {
	return (
		<div className="bg-[#eeeeee] flex justify-center items-center h-dvp py-16 flex-grow w-screen">
			<div className=" border-t-8 border-[#ff6666] bg-white p-12 shadow-2xl w-96">
				<h1 className="font-bold text-center block text-2xl">Log In</h1>
				<form>
=======
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="w-full px-4 py-2 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-500"
				required
			/>
		</label>
	);
}

// Formulario de Login
function LoginForm({ formValues, handleChange, handleLoginUser, loading }) {
	return (
		<section className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
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
<<<<<<< HEAD
						placeholder="me@example.com"
=======
						placeholder="ejemplo@email.com"
						value={formValues.email}
						onChange={handleChange}
>>>>>>> 39015f5 (actualizado loginPage)
						autofocus={true}
					/>

					{/* Contraseña */}
					<Input
						type="password"
						id="password"
						name="password"
<<<<<<< HEAD
						label="Password"
						placeholder="••••••••••"
					/>
					<Button value="Login" />
				</form>
			</div>
		</div>
=======
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
			</article>
		</section>
>>>>>>> 39015f5 (actualizado loginPage)
	);
}

export default LoginForm;
