import { marketActionType } from '../../actionType';

export const marketAction = {
    query:                                      data => ({ type: marketActionType.QUERY, data }),
    add:                                        data => ({ type: marketActionType.ADD, data }),
    delete:                                     data => ({ type: marketActionType.DELETE, data }),
    update:                                     data => ({ type: marketActionType.UPDATE, data }),
    dialog:                                     data => ({ type: marketActionType.DIALOG, data }),
    listLogin:                                  data => ({ type: marketActionType.LIST_LOADING, data }),
    dialogType:                                 data => ({ type: marketActionType.DIALOG_TYPE, data }),
    filterList:                                 data => ({ type: marketActionType.FILTER_LIST, data }),
    operateType:                                data => ({ type: marketActionType.OPERATE_TYPE, data }),
    newChange:                                  data => ({ type: marketActionType.NEW_CHANGE, data }),
    updateChange:                               data => ({ type: marketActionType.UPDATE_CHANGE, data }),
    emptyChange:                                data => ({ type: marketActionType.EMPTY_CHANGE, data }),
    addCover:                                   data => ({ type: marketActionType.ADD_COVER, data }),
    deleteCover:                                data => ({ type: marketActionType.DELETE_COVER, data }),
    emptyCover:                                 data => ({ type: marketActionType.EMPTY_CHANGE, data }),
    isNewPrompt:                                data => ({ type: marketActionType.IS_NEW_PROMPT, data })
};
