import { CREATED, NO_CONTENT, OK } from 'http-status';

import { IRoute, IResponse } from '../interfaces/route';
import { IUser } from '../interfaces/user';
import UserService from '../services/user.service';

interface IRecordController {
    list({ req, res, next }: IRoute): Promise<IResponse<IUser[]>>;
    create({ req, res, next }: IRoute): Promise<IResponse<IUser>>;
    destroy({ req, res, next }: IRoute): Promise<IResponse<void>>;
}

class UserController implements IRecordController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async list({ req, res, next }: IRoute): Promise<IResponse<IUser[]>> {
        try {
            const users = await this.userService.list();

            return res.status(OK).json({ data: users });
        } catch (error) {
            return next(error);
        }
    }

    public async create({ req, res, next }: IRoute): Promise<IResponse<IUser>> {
        try {
            const { name, email, role, password }: IUser = req.body;

            const user = await this.userService.create({
                name,
                email,
                role: role.toString(),
                active: true,
                password,
            });

            return res.status(CREATED).json({ data: user });
        } catch (error) {
            return next(error);
        }
    }

    public async destroy({ req, res, next }: IRoute): Promise<IResponse<void>> {
        try {
            const { id } = req.params;

            await this.userService.destroy(id);

            return res.status(NO_CONTENT).send();
        } catch (error) {
            return next(error);
        }
    }
}

export default UserController;
