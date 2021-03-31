import { marketService } from '../../service';

const  MarketListAPI = {
    props: null,
    // marketLoading: false,
    marketListStatusHandle: null,
    deleteMarketHandle: function (id) {
        // console.log(this.props);
        this.props.marketDeleteAction(id);
        marketService.delete({
            id: id
        }).then(data => {
            if(data.data.code === 0) {

            }
        })
    }
    ,
    subscribeToFriendStatus: function(marketListStatusHandle, props) {
        this.marketListStatusHandle = marketListStatusHandle;
        this.props = props;
        marketService.query({}).then((data) => {
            marketListStatusHandle({
                marketLoading: false
            });
            if(data.data.code === 0) {
                props.marketQueryAction(data.data.list);
            }
        });
    },
    unsubscribeFromFriendStatus: function(marketListStatusHandle) {
        this.marketListStatusHandle = null;
    }
};

export default MarketListAPI;
