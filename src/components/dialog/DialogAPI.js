const DialogAPI = {
    dialogStatusHandle: null,
    closeCallback: null,
    determineCallback: null,
    showTime: null,
    close: function() {
        this.dialogStatusHandle({
            show: false
        });

        this.showTime = setTimeout(() => {
            this.closeCallback();

            clearTimeout(this.showTime);
        }, 400);
    },
    determine: function() {
        const _this = this;

        this.determineCallback((fun) => {

            _this.dialogStatusHandle({
                show: false
            });

            _this.showTime = setTimeout(() => {
                fun();
                clearTimeout(_this.showTime);
            }, 400);
        });

    },
    subscribeToFriendStatus: function(dialogStatusHandle, closeCallback, determineCallback) {
        this.dialogStatusHandle = dialogStatusHandle;
        this.closeCallback = closeCallback;
        this.determineCallback = determineCallback;
    },
    unsubscribeFromFriendStatus: function() {
        if(this.showTime) {
            clearTimeout(this.showTime);
        }
    }
};

export default DialogAPI;
