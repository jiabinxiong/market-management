import { post } from './axios';

import { HTTP_SERVER } from '../constants/http.constant';

class UploadService {
    image(data) {
        return post(`${HTTP_SERVER}/api/upload`, data, {
                headers:{'Content-Type': 'multipart/form-data; charset=UTF-8'}
            }
        );
    }
}

const uploadService = new UploadService();

export default uploadService;
