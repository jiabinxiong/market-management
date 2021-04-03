import { marketActionType } from '../../actionType';
import { DIALOG_TYPE, MARKET_OPERATE_TYPE } from '../../../constants';
import { newMarketModule, marketNewPromptModule } from '../../../moduls';

function marketReducer(state = [], action) {
    switch(action.type) {
        case marketActionType.QUERY:
            return action.data;
        case marketActionType.ADD:
            const copyAddState = JSON.parse(JSON.stringify(state));
            copyAddState.unshift(action.data);
            return copyAddState;
        case marketActionType.DELETE:
            const copyState = JSON.parse(JSON.stringify(state));
            return copyState.filter((v, i) => v._id !== action.data);
        case marketActionType.UPDATE:
            return action.data;
        default:
            return state;
    }
}

function marketNewUpdateChangeReducer(state = newMarketModule, action) {
    switch (action.type) {
        case marketActionType.NEW_CHANGE:
            const copyNewChangeState = JSON.parse(JSON.stringify(state));
            copyNewChangeState[action.data.type] = action.data.v;
            return copyNewChangeState;
        case marketActionType.EMPTY_CHANGE: // 清空
            return action.data;
        default:
            return state;
    }
}

function marketNewDialogReducer(state = false, action) {
    switch(action.type) {
        case marketActionType.DIALOG:
            return action.data;
        default:
            return state;
    }
}

function marketListLoadingReducer(state = true, action) {
    switch(action.type) {
        case marketActionType.LIST_LOADING:
            return action.data;
        default:
            return state;
    }
}

function marketDialogTypeReducer(state = DIALOG_TYPE.pop ,action) {
    switch (action.type) {
        case marketActionType.DIALOG_TYPE:
            return action.data;
        default:
            return state;
    }
}

function marketListFilterReducer(state = newMarketModule, action) {
    switch (action.type) {
        case marketActionType.FILTER_LIST:
            return action.data;
        default:
            return state;
    }
}

function marketOperateTypeReducer(state = MARKET_OPERATE_TYPE.DELETE, action) {
    switch (action.type) {
        case marketActionType.OPERATE_TYPE:
            return action.data;
        default:
            return state;
    }
}

function marketCoverUploadReducer(state = [], action) {
    switch(action.type) {
        case marketActionType.ADD_COVER:
            const copyCoverAdd = JSON.parse(JSON.stringify(state));
            copyCoverAdd.push(action.data);
            return copyCoverAdd;
        case marketActionType.DELETE_COVER:
            const copyCoverDelete = JSON.parse(JSON.stringify(state));
            copyCoverDelete.splice(action.data, 1)
            return copyCoverDelete;
        case marketActionType.EMPTY_CHANGE:
            return action.data;
        default:
            return state;
    }
}

function marketNewPromptReducer(state = marketNewPromptModule, action) {
    switch(action.type) {
        case marketActionType.IS_NEW_PROMPT:
            const copyPrompt = JSON.parse(JSON.stringify(state));
            return {
                ...copyPrompt,
                ...action.data,
            };
        default:
            return state;
    }
}

export {
    marketReducer,
    marketNewDialogReducer,
    marketListLoadingReducer,
    marketDialogTypeReducer,
    marketListFilterReducer,
    marketOperateTypeReducer,
    marketNewUpdateChangeReducer,
    marketCoverUploadReducer,
    marketNewPromptReducer
}
