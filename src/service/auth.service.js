import { http } from './axios';
import userService  from './user.service';
import { message } from 'antd';
import Cookies from 'js-cookie';

const TOKEN = 'token';
class AuthService {
    constructor() {
        this.token = undefined;
        this.account = undefined;
    }

    setTokenToHeader(req) {
        if(this.token) {
            req.headers["Authorization"] = `${this.token}`;
        } else {
            req.headers["Authorization"] = `${Cookies.get(TOKEN)}`;
        }

        return req;
    }

    login(props, userConstant) {
        userService.login({
            ...props.loginReducer,
            role: 0
        }).then((data) => {
            if(data.data.code !== 0) {
                message.error(userConstant.loginRegister.error, 2)
            } else {
                this.token = data.data.token;
                Cookies.set(TOKEN, data.data.token);
                props.history.push('home');
            }

            props.visibleLoginBtnAction(false);
        });
    }
}

const authService = new AuthService();
export default authService;
