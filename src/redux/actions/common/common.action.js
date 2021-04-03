import { commonActionType } from '../../actionType';

export const commonAction = {
    queryProvince:                               data => ({ type: commonActionType.QUERY_PROVINCE, data }),
    queryCity:                                   data => ({ type: commonActionType.QUERY_CITY, data }),
    queryCounty:                                 data => ({ type: commonActionType.QUERY_COUNTY, data }),
    filterCity:                                  data => ({ type: commonActionType.FILTER_CITY, data }),
    filterCounty:                                data => ({ type: commonActionType.FILTER_COUNTY, data }),
    selectProvince:                              data => ({ type: commonActionType.SELECT_PROVINCE, data }),
    selectCity:                                  data => ({ type: commonActionType.SELECT_CITY, data }),
    selectCounty:                                data => ({ type: commonActionType.SELECT_COUNTY, data }),
    emptyAdministration:                         data => ({ type: commonActionType.EMPTY_ADMINISTRATION, data })
}
