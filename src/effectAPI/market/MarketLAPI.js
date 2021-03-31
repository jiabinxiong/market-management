import { marketService } from '../../service';
import { DIALOG_TYPE, MARKET_OPERATE_TYPE } from '../../constants';

const MarketLAPI = {
    props: null,
    dialogNewHandle: function(type) {
        this.props.marketDialogAction(true);
        this.props.marketOperateTypeAction(type);
        this.props.marketDialogTypeAction(DIALOG_TYPE.pop);
    },
    dialogCloseCallback: function() {
        this.props.marketDialogAction(false);
    },
    dialogDetermineCallback: function (back, obj, type) {
        if(type === MARKET_OPERATE_TYPE.DELETE) {
            back(() => {
                this.props.marketDialogAction(false);
                marketService.delete({
                    id: obj._id
                }).then(data => {
                    if(data.data.code === 0) {
                        this.props.marketDeleteAction(obj._id);
                    }
                })
            });

        } else if (type === MARKET_OPERATE_TYPE.UPDATE) {

        } else if (type === MARKET_OPERATE_TYPE.NEW) {
            console.log('new');
        }
    },
    deleteMarketHandle: function(item, type) {
        this.props.marketDialogAction(true);
        this.props.marketOperateTypeAction(type);
        this.props.marketDialogTypeAction(DIALOG_TYPE.prompt);
        this.props.marketListFilterAction(item);

    },
    subscribeToFriendStatus: function(marketLStatusHandle, props) {
        this.props = props;

        marketService.query({}).then((data) => {
            props.marketListLoadingAction(false);
            if(data.data.code === 0) {
                props.marketQueryAction(data.data.list);
            }
        });
    },
    unsubscribeFromFriendStatus: function() {

    }
};

export default MarketLAPI;
