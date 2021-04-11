export const MARKET_OPERATE_TYPE = {
    NEW:    'new',
    DELETE: 'delete',
    UPDATE: 'update'
};

export const MARKET_CHANGE_TYPE = {
    LOGO: 'logo',
    NAME: 'name',
    PROVINCE: 'province',
    COVER: 'cover',
    SUMMARY: 'summary',
    HANG_OUT: 'hangOut',
    BUS: 'bus',
    SUBWAY: 'subway',
    OPEN_TIME: 'openTime',
    PHONE: 'phone',
    HTTP: 'http',
    ADDRESS: 'address'
};

export const MARKET_DIALOG_TYPE = {
    NEW: 'new',
    UPDATE: 'update',
    DELETE: 'delete'
};

export const MARKET_NEW_PROMP_TYPE = {
    NAME: {
        NULL: '市场名称不能为空',
        MAX_LENGTH: '市场名称不能超过30个字'
    },
    PROVINCE: {
        NULL: '请选择省/直辖市',
        CITY_NULL: '请选择市',
        COUNTY_NULL: '请选择县/街道'
    },
    COVER: {
        NULL: '市场封面不能为空',
        MAX_LENGTH: '市场封面个数不能超过5张'
    },
    SUMMARY: {
        NULL: '市场简介不能为空',
        MAX_LENGTH: '市场简介不能超过200个字'
    },
    ADDRESS: {
        NULL: '地址不能为空',
        PROMP: '请点击搜索',
        SEARCH_NULL: '没有搜索到相关的地址',
        MAX_LENGTH: '市场地址不能超过100个字'
    },
    HANG_OUT: {
        MAX_LENGTH: '闲逛须知不能超过100个字'
    },
    BUS: {
        MAX_LENGTH: '公交路线不能超过100个字'
    },
    SUBWAY: {
        MAX_LENGTH: '地铁路线不能超过100个字'
    },
    OPEN_TIME: {
        MAX_LENGTH: '市场开放时间不能超过100个字'
    },
    PHONE: {
        MAX_LENGTH: '市场电话不能超过100个字'
    },
    HTTP: {
        MAX_LENGTH: '市场名称不能超过100个字'
    }
}
