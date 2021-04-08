const MapAPI = {
    props: null,
    zoomNumber: 0,
    setStateHandle: null,
    onClick: function(event) {
        this.props.onClick(event);
    },
    zoomHandle: function(type) {
        if(type === 'in') {
            if(this.zoomNumber < 20) {
                this.setStateHandle({
                    zoom: this.zoomNumber+1
                });
            }

        } else if (type === 'out') {
            if(this.zoomNumber > 1) {
                this.setStateHandle({
                    zoom: this.zoomNumber-1
                });
            }
        }
    },
    subscribeToFriendStatus: function(props, zoom, setStateHandle) {
        this.props = props;
        this.zoomNumber = zoom;
        this.setStateHandle = setStateHandle;
    },
    unsubscribeFromFriendStatus: function() {
        this.props = null;
        this.zoomNumber = 0;
        this.setStateHandle = null;
    }
}

export default MapAPI;
