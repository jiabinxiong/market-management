import { menuActionType } from '../../actionType';

function menuReducer(state = [], action) {
    switch (action.type) {
        case menuActionType.QUERY_PROVINCE:
            return action.data;
        case menuActionType.QUERY_CITY:
            return action.data;
        case menuActionType.QUERY_COUNTY:
            return action.data;
        default:
            return state;
    }
}

export {
    menuReducer
}
