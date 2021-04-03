import { administrationService } from '../../service';
import { menuActionType } from '../../redux/actionType';

const MenuAPI = {
    subscribeToFriendStatus: function(props) {
        administrationService.province().then(data => {
            if(data.data.code === 0) {
                props.commonProvinceAction(data.data.data);
            }
        });

        administrationService.city().then(data => {
            if(data.data.code === 0) {
                props.commonCityAction(data.data.data);
            }
        });

        administrationService.county().then(data => {
            if(data.data.code === 0) {
                props.commonCountyAction(data.data.data);
            }
        });
    },
    unsubscribeFromFriendStatus: function() {

    }
};

export default MenuAPI;
