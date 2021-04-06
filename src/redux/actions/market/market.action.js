import { marketActionType } from '../../actionType';

export const marketAction = {
    query:                                      data => ({ type: marketActionType.QUERY, data }),
    add:                                        data => ({ type: marketActionType.ADD, data }),
    delete:                                     data => ({ type: marketActionType.DELETE, data }),
    update:                                     data => ({ type: marketActionType.UPDATE, data }),
    selectCity:                                 data => ({ type: marketActionType.SELECT_CITY, data }),
    selectCounty:                               data => ({ type: marketActionType.SELECT_COUNTY, data }),
    selectProvince:                             data => ({ type: marketActionType.SELECT_PROVINCE, data }),
    selectEmpty:                                data => ({ type: marketActionType.SELECT_EMPTY, data }),
    newIpt:                                     data => ({ type: marketActionType.NEW_IPT, data }),
    isNewPrompt:                                data => ({ type: marketActionType.IS_NEW_PROMPT, data }),
    updateChange:                               data => ({ type: marketActionType.UPDATE_CHANGE, data }),
    emptyChange:                                data => ({ type: marketActionType.EMPTY_CHANGE, data }),
    dialogType:                                 data => ({ type: marketActionType.DIALOG_TYPE, data }),
    // selectCountyEmpty:                          data => ({ type: marketActionType.SELECT_COUNTY_EMPTY, data }),

    dialog:                                     data => ({ type: marketActionType.DIALOG, data }),
    listLoading:                                data => ({ type: marketActionType.LIST_LOADING, data }),
    filterList:                                 data => ({ type: marketActionType.FILTER_LIST, data }),
    operateType:                                data => ({ type: marketActionType.OPERATE_TYPE, data }),
    newChange:                                  data => ({ type: marketActionType.NEW_CHANGE, data }),
    addCover:                                   data => ({ type: marketActionType.ADD_COVER, data }),
    deleteCover:                                data => ({ type: marketActionType.DELETE_COVER, data }),
    emptyCover:                                 data => ({ type: marketActionType.EMPTY_COVER, data }),
};
