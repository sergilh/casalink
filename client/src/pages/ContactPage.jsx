import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';

const { VITE_API_URL, REACT_APP_EMAIL_API_KEY, REACT_APP_RECAPTCHA_SITE_KEY } =
	import.meta.env;

const ContactPage = () => {
	const [captchaValue, setCaptchaValue] = useState(null);
	const [formData, setFormData] = useState({
		to: '',
		captcha: '',
		text: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!captchaValue) {
			toast.error('Por favor verifica el captcha');
			return;
		}

		try {
			const response = await fetch(
				`${VITE_API_URL}/api/admin/send-email`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': REACT_APP_EMAIL_API_KEY, // API Key
					},
					body: JSON.stringify({
						...formData,
						captcha: captchaValue,
					}),
				}
			);

			const result = await response.json();

			if (response.ok) {
				toast.success('Correo enviado con éxito');
				setFormData({ to: '', captcha: '', text: '' });
				setCaptchaValue(null);
			} else {
				toast.error(result.error || 'Error al enviar el correo');
			}
		} catch (error) {
			toast.error(`Error en la conexión ${error}.`);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				name="to"
				placeholder="Correo"
				value={formData.to}
				onChange={handleChange}
				required
			/>
			<textarea
				name="text"
				placeholder="Tu mensaje"
				value={formData.text}
				onChange={handleChange}
				required
			/>
			<ReCAPTCHA
				sitekey={REACT_APP_RECAPTCHA_SITE_KEY}
				onChange={setCaptchaValue}
			/>
			<button type="submit">Enviar</button>
		</form>
	);
};

export default ContactPage;
