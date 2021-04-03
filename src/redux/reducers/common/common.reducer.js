import { commonActionType } from "../../actionType";
import { administrationModule } from '../../../moduls';
import { ADMINISTRATION } from '../../../constants';


function commonProvinceReducer(state = [], action) {
    switch (action.type) {
        case commonActionType.QUERY_PROVINCE:
            return action.data;
        default:
            return state;
    }
}

function commonCityReducer(state = [], action) {
    switch (action.type) {
        case commonActionType.QUERY_CITY:
            return action.data;
        default:
            return state;
    }
}

function commonCountyReducer(state = [], action) {
    switch (action.type) {
        case commonActionType.QUERY_COUNTY:
            return action.data;
        default:
            return state;
    }
}

function administrationFilterReducer(state = administrationModule, action) {
    switch (action.type) {
        case commonActionType.SELECT_PROVINCE:
            const copyProvinceState = JSON.parse(JSON.stringify(state));
            copyProvinceState[ADMINISTRATION.CITY].value.code = '';
            copyProvinceState[ADMINISTRATION.CITY].value.name = '';
            copyProvinceState[ADMINISTRATION.COUNTY].value.code = '';
            copyProvinceState[ADMINISTRATION.COUNTY].value.name = '';

            const cityFilter = action.data.city.filter(arr => arr.provinceCode === action.data.code);
            copyProvinceState[ADMINISTRATION.PROVINCE].value.code = action.data.code;
            copyProvinceState[ADMINISTRATION.PROVINCE].value.name = action.data.name;
            copyProvinceState[ADMINISTRATION.CITY].data = [...cityFilter[0].children];

            return copyProvinceState;
        case commonActionType.SELECT_CITY:
            const copyCityState = JSON.parse(JSON.stringify(state));
            copyCityState[ADMINISTRATION.COUNTY].value.code = '';
            copyCityState[ADMINISTRATION.COUNTY].value.name = '';

            const cityFilterArr = action.data.county.filter(arr => arr.provinceCode === action.data.provinceCode);
            const countyFilter = cityFilterArr[0].children.filter(arr => arr.cityCode === action.data.cityCode);
            copyCityState[ADMINISTRATION.CITY].value.code = action.data.cityCode;
            copyCityState[ADMINISTRATION.CITY].value.name = action.data.name;
            copyCityState[ADMINISTRATION.COUNTY].data = [...countyFilter[0].children];

            return copyCityState;
        case commonActionType.SELECT_COUNTY:
            const copyCountyState = JSON.parse(JSON.stringify(state));
            copyCountyState[ADMINISTRATION.COUNTY].value.code = action.data.option.value;
            copyCountyState[ADMINISTRATION.COUNTY].value.name = action.data.option.children;

            return copyCountyState;

        case commonActionType.EMPTY_ADMINISTRATION:
            return administrationModule;
        default:
            return state;
    }
}


export {
    commonProvinceReducer, commonCityReducer, commonCountyReducer,
    administrationFilterReducer
}
