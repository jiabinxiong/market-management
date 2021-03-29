import { marketActionType } from '../../actionType';

export const marketAction = {
    query:                                      data => ({ type: marketActionType.QUERY, data }),
    add:                                        data => ({ type: marketActionType.ADD, data }),
    delete:                                     data => ({ type: marketActionType.DELETE, data }),
    update:                                     data => ({ type: marketActionType.UPDATE, data })
};
