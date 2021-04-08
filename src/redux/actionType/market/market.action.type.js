import {isLoginPromptModule} from "../../../moduls";

export const marketActionType = {
    QUERY:                                              'query',
    ADD:                                                'add',
    DELETE:                                             'delete',
    UPDATE:                                             'update',
    DIALOG:                                             'dialog',
    SELECT_CITY:                                        'selectCity',
    SELECT_COUNTY:                                      'selectCounty',
    SELECT_PROVINCE:                                    'selectProvince',
    SELECT_EMPTY:                                       'selectEmpty',
    NEW_IPT:                                            'newIpt',
    IS_NEW_PROMPT:                                      'isNewPrompt',
    LIST_LOADING:                                       'listLoading',
    UPDATE_CHANGE:                                      'updateChange',
    DELETE_CHANGE:                                      'deleteChange',
    EMPTY_CHANGE:                                       'emptyChange',
    DIALOG_TYPE:                                        'dialogType',
    MAP_LNG_LAT:                                        'mapLnglat',
    MAP_SEARCH_ADDRESS:                                 'mapSearchAddress',

    // SELECT_COUNTY_EMPTY:                                'selectCountyEmpty',
    FILTER_LIST:                                        'filterList',
    OPERATE_TYPE:                                       'operateType',
    NEW_CHANGE:                                         'newChange',
    ADD_COVER:                                          'addCover',
    DELETE_COVER:                                       'deleteCover',
    EMPTY_COVER:                                        'emptyCover',

};
