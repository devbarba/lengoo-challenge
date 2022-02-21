import { IAuthResponse } from '@interfaces/auth';
import { IRoute, IResponse } from '@interfaces/route';
import AuthService from '@services/auth.service';
import { OK } from 'http-status';

interface IAuthController {
    login({ req, res, next }: IRoute): Promise<IResponse<IAuthResponse>>;
}

class AuthController implements IAuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login({
        req,
        res,
        next,
    }: IRoute): Promise<IResponse<IAuthResponse>> {
        try {
            const { email, password } = req.body;

            const token = await this.authService.login({ email, password });

            return res.status(OK).json({ data: token });
        } catch (error) {
            return next(error);
        }
    }
}

export default AuthController;
