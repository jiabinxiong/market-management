const MarketAPI = {
    marketStatusHandle: null,
    copyUrl: '',
    isUrl: function(url) {
        // console.log(url);
        if( this.copyUrl === url) {
            console.log('a');
            this.copyUrl = url;
            return true;
        } else {
            console.log('b');
            this.copyUrl = url;
            return false;
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
