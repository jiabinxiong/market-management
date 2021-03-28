const WindowPopAPI = {
    openCloseHandle: null,
    visible: false,
    popCloseCallback: null,
    popDetermineCallback: null,    
    showAnimation: true,
    showAnimationTime: null,
    close: function(isStyle, callback) {
        const _this = this;        
        this.showAnimation = false;
        if(this.openCloseHandle) {            
            this.openCloseHandle({
                showAnimation: false
            });
        }

        this.showAnimationTime = setTimeout(() => {            
            this.visible = false;
            if(this.openCloseHandle) {                
                this.openCloseHandle({
                    visible: false,
                    showAnimation: false
                });
            }

            if(isStyle === 'cancel') {
                if(_this.popCloseCallback) {
                    _this.popCloseCallback();
                }
            } else if (isStyle === 'determine') {
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
    subscribeToFriendStatus: function(openCloseHandle, popCloseCallback, popDetermineCallback, ) {
        this.openCloseHandle = openCloseHandle;
        this.popCloseCallback = popCloseCallback;
        this.popDetermineCallback = popDetermineCallback;  
    },
    unsubscribeFromFriendStatus: function(openCloseHandle, popCloseCallback, determineSuccess) {

        this.openCloseHandle = null;
        this.popCloseCallback = null;
        this.popDetermineCallback = null;
        clearTimeout(this.showAnimationTime);
    }
};

export default WindowPopAPI;