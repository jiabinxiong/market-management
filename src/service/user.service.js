import { post } from './axios';
import qs from 'qs';

import { HTTP_SERVER } from '../constants/http.constant';

class UserService {
    login(data) {
        return post(`${HTTP_SERVER}/api/user/management/login`, data);
    }
}

const userService = new UserService();

export default userService;
