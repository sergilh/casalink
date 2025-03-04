import casalinkMonocromeLogoLightBG from '../assets/images/brand/casalink-logotipo-scnd-mono-1080x400.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div>
			{/* Footer */}
			<footer className="bg-[#000033] md:p-8 p-16">
				<div className="flex flex-col items-center md:items-start justify-between gap-12 max-w-5xl mx-auto md:flex-row">
					<div className="flex flex-col gap-8 w-full justify-between md:gap-4 items-center md:flex-row md:max-w-[40%]">
						<div className="w-full">
							{/* Logo */}
							<h3>
								<img
									src={casalinkMonocromeLogoLightBG}
									className="w-auto md:h-16 opacity-25"
									alt="Casalink"
								/>
							</h3>
						</div>
						<div className="flex items-center justify-between w-full px-3 text-[#000033] ">
							<a
								href="https://www.facebook.com/CasaLink.app"
								className="bg-white/25 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 aspect-square overflow-hidden"
							>
								<FontAwesomeIcon
									icon={faFacebookF}
									transform={'grow-8 down-5 right-2'}
									fixedWidth
								/>
							</a>
							<a
								href="https://www.instagram.com/casalink.app/"
								className="bg-white/25 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 aspect-square overflow-hidden"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									transform={'grow-12 up-1'}
									fixedWidth
								/>
							</a>
							<a
								href="https://www.linkedin.com/company/casalink-app/"
								className="bg-white/25 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 aspect-square overflow-hidden"
							>
								<FontAwesomeIcon
									icon={faLinkedinIn}
									transform={'grow-8'}
									fixedWidth
								/>
							</a>
						</div>
					</div>

					<div className="flex justify-between w-full  md:flex-row md:gap-4 flex-col gap-8 md:text-xs md:max-w-[40%]">
						<div>
							<h3 className="font-bold text-gray-300 mb-2">
								Sobre CasaLink
							</h3>
							<ul className="text-gray-300 space-y-1">
								<li>
									<Link
										to="/about"
										className="hover:underline transition-all duration-300"
									>
										Acerca de nosotros
									</Link>
								</li>
								<li>
									<Link
										to="/terms-and-conditions"
										className="hover:underline transition-all duration-300"
									>
										Términos y condiciones
									</Link>
								</li>
							</ul>
						</div>

						<div className="md:text-right text-left">
							<h3 className="font-bold text-gray-300 mb-2">
								Ayuda
							</h3>
							<ul className="text-gray-300 space-y-1">
								<li>
									<Link
										to="/help#faq"
										className="hover:underline transition-all duration-300"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										to="/help#support"
										className="hover:underline transition-all duration-300"
									>
										Ayuda y Soporte
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="text-xs text-white/25 text-right flex flex-col place-content-end">
						<footer>&copy; Casalink 2025.</footer>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
