import AvatarIcon from './AvatarIcon';
import { FaStar } from 'react-icons/fa';
const { VITE_API_URL } = import.meta.env;

const OwnersInfo = ({ ownerInfo }) => {
	return (
		<div className="flex flex-row justify-between items-center h-full gap-4">
			<p className="text-gray-600 text-md lg:text-xl">
				Sobre{' '}
				<a
					className="underline font-bold text-[#ff6666] hover:text-[#000033] transition-colors"
					href={`/user/${ownerInfo.ownerId}`}
				>
					{ownerInfo.ownerName} {ownerInfo.lastName}
				</a>
				:
			</p>
			<p className="text-gray-600 text-md lg:text-xl">
				{ownerInfo.totalReviews} reseñas con un promedio de{' '}
				{ownerInfo.averageRating} estrellas.
			</p>
			<a href={`/user/${ownerInfo.ownerId}`}>
				<div
					id="user-avatar"
					className="flex items-center justify-center"
				>
					{ownerInfo.avatarUrl ? (
						<div
							id="avatar-wrapper"
							className="relative overflow-clip size-18 bg-[#e6dada] rounded-full cursor-pointer"
						>
							<img
								src={`${VITE_API_URL}/static/uploads/avatars/${ownerInfo.avatarUrl}`}
								alt={`Avatar de ${ownerInfo.ownerName} ${ownerInfo.lastName}`}
								className="size-18 rounded-full object-cover"
							/>
						</div>
					) : (
						<AvatarIcon />
					)}
					{ownerInfo.isDocsVerified ? (
						<div className="size-4 absolute">
							<FaStar className="relative -right-6 -top-7 h-8 w-8 items-center justify-center text-amber-400 text-xs" />
						</div>
					) : (
						''
					)}
				</div>
			</a>
		</div>
	);
};

export default OwnersInfo;
