import { get, post } from './axios';

import { HTTP_SERVER } from '../constants/http.constant';

class MarketService {
    add(data) {
        return post(`${HTTP_SERVER}/api/management/newMarket`, data);
    }

    query(data = {}) {
        return get(`${HTTP_SERVER}/api/management/queryMarket`, {});
    }

    search(data) {
        return get(`${HTTP_SERVER}/api/management/searchMarket`, {});
    }

    delete(data = {}) {
        return post(`${HTTP_SERVER}/api/management/deleteMarket`, data);
    }

    update(data) {
        return post(`${HTTP_SERVER}/api/management/updateMarket`, {});
    }
}

const marketService = new MarketService();

export default marketService;
