import { marketService } from '../../service';
import { DIALOG_TYPE, MARKET_OPERATE_TYPE } from '../../constants';
import { newMarketModule } from '../../moduls';

const MarketLAPI = {
    props: null,
    isAddBtn: true,
    newMarketObj: JSON.parse(JSON.stringify(newMarketModule)),
    dialogNewHandle: function(type) {
        this.props.marketDialogAction(true);
        this.props.marketOperateTypeAction(type);
        this.props.marketDialogTypeAction(DIALOG_TYPE.pop);
    },
    dialogCloseCallback: function() {
        this.props.marketDialogAction(false);
        this.props.marketEmptyChangeAction(newMarketModule);
    },
    dialogDetermineCallback: function (back, obj, type,) {
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

            if(this.isAddBtn) {
                this.isAddBtn = false;
                marketService.add(this.newMarketObj).then(data => {
                    this.isAddBtn = true;
                    if(data.data.code === 0) {
                        this.props.marketAddAction({
                            ...this.newMarketObj,
                            _id: data.data._id,
                        });

                        back(() => {
                            this.props.marketDialogAction(false);
                        });

                        this.props.marketEmptyChangeAction(newMarketModule);
                    } else {

                    }
                })
            }


        }
    },
    newChange: function(v, type) {
        this.newMarketObj[type] = v.target.value;
        this.props.marketNewChangeAction({
            type: type,
            v: v.target.value
        });
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
