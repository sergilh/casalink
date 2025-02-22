const blockUserController = async (req, res) => {
	console.log(req.params);
	return res.send({
		status: 'ok',
		message: 'Hola',
	});
};

export default blockUserController;
