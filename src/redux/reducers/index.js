import { loginReducer, visibleLoginBtnReducer, isLoginPromptReducer } from './user/user.reducer';
import { menuReducer } from './nav/nav.reducer';
import {
    marketListReducer, addMarketDialogReducer, administrationSelectReducer, marketNewIptReducer, marketNewPromptReducer,
    marketListLoadingReducer, marketDialogTypeReducer, marketDialogMapReducer, marketListHandleReducer
} from './market/market.reducer';

import { commonProvinceReducer, commonCityReducer, commonCountyReducer } from './common/common.reducer';

export {
    loginReducer, visibleLoginBtnReducer, isLoginPromptReducer,
    menuReducer, marketDialogTypeReducer,
    commonProvinceReducer, commonCityReducer, commonCountyReducer, marketListReducer, marketListLoadingReducer, marketListHandleReducer,
    addMarketDialogReducer, administrationSelectReducer, marketNewIptReducer, marketNewPromptReducer, marketDialogMapReducer
}
