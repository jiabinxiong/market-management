import { userActionType } from '../../actionType';

export const userAction = {
    setLogin:                                   data => ({ type: userActionType.SET_LOGIN, data }),
    visibleLoginBtn:                            data => ({ type: userActionType.VISIBLE_LOGIN_BTN, data }),
    isLoginPrompt:                              data => ({ type: userActionType.IS_LOGIN_PROMPT, data })
};
