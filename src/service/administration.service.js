import { get } from './axios';

import { HTTP_SERVER } from '../constants/http.constant';

class AdministrationService {
    province() {
        return get(`${HTTP_SERVER}/api/common/administration/province`, {});
    }
}

const administrationService = new AdministrationService();

export default administrationService;