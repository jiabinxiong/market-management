const WindowPopAPI = {
    openCloseHandle: null,
    visible: false,
    popCloseCallback: null,
    popDetermineCallback: null,
    determineSuccess: false,
    showAnimation: true,
    showAnimationTime: null,
    close: function(isStyle, callback) {
        const _this = this;
        console.log('1');
        this.showAnimation = false;
        if(this.openCloseHandle) {
            console.log('2');
            this.openCloseHandle({
                showAnimation: false
            });
        }

        this.showAnimationTime = setTimeout(() => {
            console.log('3');
            this.visible = false;
            if(this.openCloseHandle) {
                console.log('4');
                this.openCloseHandle({
                    visible: false,
                    showAnimation: false
                });
            }

            if(isStyle === 'cancel') {
                console.log('cancel');
                if(_this.popCloseCallback) {
                    _this.popCloseCallback();
                }
            } else if (isStyle === 'determine') {
                console.log('determine');
                callback();
            }

            clearTimeout(_this.showAnimationTime);
        }, 450);

    },
    determine: function () {
        if(this.popDetermineCallback) {
            this.popDetermineCallback(this);
        }
    },
    subscribeToFriendStatus: function(openCloseHandle, popCloseCallback, popDetermineCallback, determineSuccess) {
        this.openCloseHandle = openCloseHandle;
        this.popCloseCallback = popCloseCallback;
        this.popDetermineCallback = popDetermineCallback;
        this.determineSuccess = determineSuccess;
    },
    unsubscribeFromFriendStatus: function(openCloseHandle, popCloseCallback, determineSuccess) {

        this.openCloseHandle = null;
        this.popCloseCallback = null;
        this.popDetermineCallback = null;
        this.determineSuccess = false;
        clearTimeout(this.showAnimationTime);
    }
};

export default WindowPopAPI;