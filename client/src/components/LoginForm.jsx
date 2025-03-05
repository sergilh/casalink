// eslint-disable-next-line react/prop-types
function Button({ value }) {
	return (
		<button
			// eslint-disable-next-line no-undef
			onClick={() => preventDefault(e)}
			className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#66ffff] transform hover:-translate-y-1 hover:shadow-lg"
		>
			{value}
		</button>
	);
}

// eslint-disable-next-line react/prop-types
function Input({ type, id, name, label, placeholder, autofocus }) {
	return (
		<label className="text-gray-500 block mt-3">
			{label}
			<input
				autoFocus={autofocus}
				type={type}
				id={id}
				name={name}
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
					<Input
						type="email"
						id="email"
						name="email"
						label="Correo Electrónico"
						placeholder="me@example.com"
						autofocus={true}
					/>
					<Input
						type="password"
						id="password"
						name="password"
						label="Password"
						placeholder="••••••••••"
					/>
					<Button value="Login" />
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
