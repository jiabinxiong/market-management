const WindowPopAPI = {
    closeHandle: null,
    visible: false,

    subscribeToFriendStatus: function(closeHandle) {
        this.closeHandle = closeHandle;
    },
    unsubscribeFromFriendStatus: function(closeHandle) {
        this.closeHandle = null;
    }
};

export default WindowPopAPI;