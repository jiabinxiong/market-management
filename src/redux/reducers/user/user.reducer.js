import { userActionType } from '../../actionType';
import { loginModule, isLoginPromptModule } from '../../../moduls';

// 登录
function loginReducer(state= loginModule, action) {
    switch (action.type) {
        case userActionType.SET_LOGIN:
            const copyState = { ...state };
            copyState[action.data.type] = action.data.value
            return copyState;
        default:
            return state;
    }
}

// 登录按钮
function visibleLoginBtnReducer(state = false, action) {
    switch(action.type) {
        case userActionType.VISIBLE_LOGIN_BTN:
            return action.data;
        default:
            return state
    }
}

// 登录校验
function isLoginPromptReducer(state = isLoginPromptModule, action) {
    switch (action.type) {
        case userActionType.IS_LOGIN_PROMPT:
            return {...state, ...action.data};
        default:
            return state;
    }
}

export {
    loginReducer,
    visibleLoginBtnReducer,
    isLoginPromptReducer
}
