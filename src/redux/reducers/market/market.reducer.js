import { marketActionType } from '../../actionType';

function marketReducer(state = [], action) {
    switch(action.type) {
        case marketActionType.QUERY:
            return action.data;
        case marketActionType.ADD:
            return action.data;
        case marketActionType.DELETE:
            return action.data;
        case marketActionType.UPDATE:
            return action.data;
        default:
            return state;
    }
}

export {
    marketReducer
}
