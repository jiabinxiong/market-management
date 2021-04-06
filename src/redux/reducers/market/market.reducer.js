import { marketActionType } from '../../actionType';
import { DIALOG_TYPE, MARKET_OPERATE_TYPE, ADMINISTRATION , MARKET_CHANGE_TYPE, MARKET_DIALOG_TYPE} from '../../../constants';
import { newMarketModule, marketNewPromptModule, administrationFilterModule } from '../../../moduls';

function marketListReducer(state = [], action) {
    switch (action.type) {
        case marketActionType.QUERY:
            return action.data;
        case marketActionType.ADD:
            const copyAddState = JSON.parse(JSON.stringify(state));
            copyAddState.push(action.data);
            return copyAddState;
        case marketActionType.UPDATE:
            const copyUpdateState = JSON.parse(JSON.stringify(state));
            const index = copyUpdateState.findIndex((data, index) => action.data._id === data._id )

            copyUpdateState.splice(index, 1, action.data);

            return copyUpdateState;
        default:
            return state;
    }
}

function addMarketDialogReducer(state = false, action) {
    switch (action.type) {
        case marketActionType.DIALOG:
            return action.data;
        default:
            return state;
    }
}

function marketListLoadingReducer(state = true, action) {
    switch (action.type) {
        case marketActionType.LIST_LOADING:
            return action.data;
        default:
            return state;
    }
}

function administrationSelectReducer(state = administrationFilterModule, action) {
    switch (action.type) {
        case marketActionType.SELECT_PROVINCE:
            const copyState = JSON.parse(JSON.stringify(state));
            const cityFilter = action.data.obj.filter(arr => arr.provinceCode === action.data.option.value);
            copyState.city = cityFilter[0].children;

            return copyState;
        case marketActionType.SELECT_CITY:
            const copyCityState = JSON.parse(JSON.stringify(state));
            const cityFilterArr = action.data.obj.filter(arr => arr.provinceCode === action.data.provinceCode);
            const countyFilter = cityFilterArr[0].children.filter(arr => arr.cityCode === action.data.option.value);
            copyCityState.county = countyFilter[0].children;

            return copyCityState;

        case marketActionType.SELECT_EMPTY:
            const copyStateAll = JSON.parse(JSON.stringify(state));
            return copyStateAll;

        case marketActionType.SELECT_COUNTY:
            return [];
        default:
            return state;
    }
}

function marketNewIptReducer(state = newMarketModule, action) {
    switch(action.type) {
        case marketActionType.NEW_IPT:
            const copyNewState = JSON.parse(JSON.stringify(state));
            if(action.data.type === ADMINISTRATION.PROVINCE) {
                copyNewState.administration[ADMINISTRATION.CITY] = {};
                copyNewState.administration[ADMINISTRATION.COUNTY] = {};
            } else if (action.data.type === ADMINISTRATION.CITY) {
                copyNewState.administration[ADMINISTRATION.COUNTY] = {};
            }

            if(action.data.type === ADMINISTRATION.PROVINCE || action.data.type === ADMINISTRATION.CITY || action.data.type === ADMINISTRATION.COUNTY) {
                copyNewState.administration[action.data.type].code = action.data.v.value;
                copyNewState.administration[action.data.type].name = action.data.v.children;
            } else if (action.data.type === MARKET_CHANGE_TYPE.COVER) {
                if(Object.prototype.toString.call(action.data.v) === '[object String]') {
                    copyNewState[action.data.type].push(action.data.v);
                } else if(Object.prototype.toString.call(action.data.v) === '[object Array]') {
                    copyNewState[action.data.type] = action.data.v;
                }

            } else {
                copyNewState[action.data.type] = action.data.v;
            }

            return copyNewState;
        case marketActionType.UPDATE_CHANGE:
            return action.data
        case marketActionType.EMPTY_CHANGE:
            return newMarketModule;
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


function marketDialogTypeReducer(state = MARKET_DIALOG_TYPE.NEW, action) {
    switch(action.type) {
        case marketActionType.DIALOG_TYPE:
            return action.data;
        default:
            return state;
    }
}



export {
    marketNewPromptReducer, marketListReducer, marketListLoadingReducer, marketDialogTypeReducer,
    addMarketDialogReducer, administrationSelectReducer, marketNewIptReducer
}

// function marketReducer(state = [], action) {
//     switch(action.type) {
//         case marketActionType.QUERY:
//             return action.data;
//         case marketActionType.ADD:
//             const copyAddState = JSON.parse(JSON.stringify(state));
//             copyAddState.unshift(action.data);
//             return copyAddState;
//         case marketActionType.DELETE:
//             const copyState = JSON.parse(JSON.stringify(state));
//             return copyState.filter((v, i) => v._id !== action.data);
//         case marketActionType.UPDATE:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketNewUpdateChangeReducer(state = newMarketModule, action) {
//     switch (action.type) {
//         case marketActionType.NEW_CHANGE:
//             const copyNewChangeState = JSON.parse(JSON.stringify(state));
//             copyNewChangeState[action.data.type] = action.data.v;
//             return copyNewChangeState;
//         case marketActionType.UPDATE_CHANGE:
//             return action.data;
//         case marketActionType.EMPTY_CHANGE: // 清空
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketNewDialogReducer(state = false, action) {
//     switch(action.type) {
//         case marketActionType.DIALOG:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketListLoadingReducer(state = true, action) {
//     switch(action.type) {
//         case marketActionType.LIST_LOADING:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketDialogTypeReducer(state = DIALOG_TYPE.pop ,action) {
//     switch (action.type) {
//         case marketActionType.DIALOG_TYPE:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketListFilterReducer(state = newMarketModule, action) {
//     switch (action.type) {
//         case marketActionType.FILTER_LIST:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketOperateTypeReducer(state = MARKET_OPERATE_TYPE.DELETE, action) {
//     switch (action.type) {
//         case marketActionType.OPERATE_TYPE:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketCoverUploadReducer(state = [], action) {
//     switch(action.type) {
//         case marketActionType.ADD_COVER:
//             const copyCoverAdd = JSON.parse(JSON.stringify(state));
//             copyCoverAdd.push(...action.data);
//             return copyCoverAdd;
//         case marketActionType.DELETE_COVER:
//             const copyCoverDelete = JSON.parse(JSON.stringify(state));
//             copyCoverDelete.splice(action.data, 1)
//             return copyCoverDelete;
//         case marketActionType.EMPTY_COVER:
//             return action.data;
//         default:
//             return state;
//     }
// }
//
// function marketNewPromptReducer(state = marketNewPromptModule, action) {
//     switch(action.type) {
//         case marketActionType.IS_NEW_PROMPT:
//             const copyPrompt = JSON.parse(JSON.stringify(state));
//             return {
//                 ...copyPrompt,
//                 ...action.data,
//             };
//         default:
//             return state;
//     }
// }
//
// export {
//     marketReducer,
//     marketNewDialogReducer,
//     marketListLoadingReducer,
//     marketDialogTypeReducer,
//     marketListFilterReducer,
//     marketOperateTypeReducer,
//     marketNewUpdateChangeReducer,
//     marketCoverUploadReducer,
//     marketNewPromptReducer
// }
