import generateErrorUtil from '../../utils/generateErrorUtil.js';
//import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
//import bcrypt from 'bcrypt';

const usersLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            generateErrorUtil('Faltan campos', 404);
        }

        //const user = await selectUserByEmailModel(email);

        //let isPassValid;

        res.send({
            status: 'ok',
            message: 'Usuario logueado',
        });
    } catch (err) {
        next(err);
    }
};

export default usersLoginController;
