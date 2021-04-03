import { loginReducer, visibleLoginBtnReducer, isLoginPromptReducer } from './user/user.reducer';
import { menuReducer } from './nav/nav.reducer';
import {
    marketReducer, marketNewDialogReducer, marketListLoadingReducer, marketDialogTypeReducer,
    marketListFilterReducer, marketOperateTypeReducer, marketNewUpdateChangeReducer,
    marketCoverUploadReducer, marketNewPromptReducer
} from './market/market.reducer';

import { commonProvinceReducer, commonCityReducer, commonCountyReducer, administrationFilterReducer } from './common/common.reducer';

export {
    loginReducer, visibleLoginBtnReducer, isLoginPromptReducer,
    menuReducer,
    marketReducer, marketNewDialogReducer, marketListLoadingReducer, marketDialogTypeReducer, marketListFilterReducer,
    marketOperateTypeReducer, marketNewUpdateChangeReducer, marketNewPromptReducer,
    commonProvinceReducer, commonCityReducer, commonCountyReducer,
    administrationFilterReducer, marketCoverUploadReducer
}
