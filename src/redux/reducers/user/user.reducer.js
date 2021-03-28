import { userActionType } from '../../actionType';
import { loginModule } from '../../../moduls';

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
function visibleLoginBtnReducer(status = false, action) {
    switch(action.type) {
        case userActionType.VISIBLE_LOGIN_BTN:
            return action.data;
        default:
            return status
    }
}

export {
    loginReducer,
    visibleLoginBtnReducer
}
