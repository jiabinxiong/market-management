const MarketAPI = {
    marketStatusHandle: null,
    windowMarketPopVisible: false,
    newMarket: function() {
        this.windowMarketPopVisible = true;
        if(this.marketStatusHandle) {
            this.marketStatusHandle({
                windowMarketPopVisible: true
            });
        }
    },

    subscribeToStatus: function(marketStatusHandle) {
        this.marketStatusHandle = marketStatusHandle;
    },

    unsubscribeFromStatus: function() {
        this.marketStatusHandle = null;
    }
};

export default MarketAPI;
