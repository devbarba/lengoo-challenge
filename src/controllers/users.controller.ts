import { OK } from 'http-status';
import { IUser } from 'src/interfaces/user';
import UserService from 'src/services/user.service';

import { IRoute, IResponse } from '../interfaces/route';

interface IRecordController {
    list({ req, res, next }: IRoute): Promise<IResponse<IUser[]>>;
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
}

export default UserController;
