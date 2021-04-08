import { get } from './axios';

// import { HTTP_SERVER, } from '../constants/http.constant';
import { MAP_KEY, MAE_SERVER } from '../constants';

class MapService {
    // 地名转 经纬度
    transcoding(data) {
        return get(`${MAE_SERVER}/v3/geocode/geo`, {
            ...data,
            key: MAP_KEY.webServer
        });
    }

    // 经纬度 转 地名
    tranName(data) {
        return get(`${MAE_SERVER}/v3/geocode/regeo`, {
            ...data,
            key: MAP_KEY.webServer
        });
    }

}

const mapService = new MapService();

export default mapService;
