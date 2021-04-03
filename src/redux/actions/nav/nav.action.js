import { menuActionType } from '../../actionType';

export const menuAction = {
    queryProvince:                               data => ({ type: menuActionType.QUERY_PROVINCE, data }),
    queryCity:                                   data => ({ type: menuActionType.QUERY_CITY, data }),
    queryCounty:                                 data => ({ type: menuActionType.QUERY_COUNTY, data })
}
