const AvatarIcon = () => {
	return (
		<div
			id="avatar-wrapper"
			className="relative overflow-clip w-30 h-30 bg-[#e6dada] rounded-full"
		>
			<div
				id="avatar-head"
				className="w-12 h-12 bg-[#000033] rounded-full mx-auto m-2"
			></div>
			<div
				id="avatar-body"
				className="w-30 h-30 bg-[#000033] rounded-full"
			></div>
		</div>
	);
};

export default AvatarIcon;
