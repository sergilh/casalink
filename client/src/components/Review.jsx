import AvatarIcon from './AvatarIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function Review({ score, nameReviewer, avatar, reviewText }) {
	return (
		<>
			<div className="flex bg-[#ff6666] p-3 md:w-[32%] hover:shadow-md transition-all duration-300">
				<div className="mr-3">
					<div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
						{avatar === 'null' ? (
							<AvatarIcon />
						) : (
							<img
								src={avatar}
								alt="avatar"
								className="w-12 h-12 rounded-full"
							/>
						)}
					</div>
				</div>
				<div>
					{/* Repetir el icono de estrella 'score' veces */}
					<div className="flex items-center">
						<div className="flex text-[#66ffff]">
							{[...Array(Number(score))].map((_, index) => (
								<span
									key={index}
									className="material-symbols-outlined text-sm"
								>
									<FontAwesomeIcon icon={faStar} fixedWidth />
								</span>
							))}
						</div>
						<span className="ml-2 text-xs font-bold text-[#eeeeee]">
							{nameReviewer}
						</span>
					</div>
					<p className="text-xs mt-1 text-[#dddddd]">{reviewText}</p>
				</div>
			</div>
		</>
	);
}

export default Review;
