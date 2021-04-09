import { uploadService } from '../../service';
import uploadComponent from '../../common/upload';

const ImageCropAPI = {
    props: null,
    setStatusHandle: null,
    isUploadBtn: true,
    formatBytes: function(bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    imgChange: function(e) {
        e.stopPropagation();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setStatusHandle({
                url: reader.result
            });
        };
        reader.readAsDataURL(files[0]);
    },

    uploadHandle: function(cropper, size) {
        if(cropper !== '') {
            if( this.isUploadBtn ) {
                cropper.getCroppedCanvas().toBlob((blob) => {
                    if(blob.size < size * 1024 * 1024) {
                        this.isUploadBtn = false;
                        this.props.uploadChange(blob, () => {
                            this.isUploadBtn = true;
                        });
                    } else {
                        this.props.uploadChange(1);  // 图片太大
                    }
                }, 'image/jpeg')

            }
        } else {
            cropper.destroy();
            this.props.uploadChange(0); // 为空时 代表还没添加图片
        }
    },

    onInitialized: function(instance) {
        // if(this.setStatusHandle!== null) {
        //     console.log(instance)
        //     this.setStatusHandle({
        //         instance: instance
        //     });
        // }
    },

    toolsHandle: function(type, cropper) {
        if(type === 'reset') {
            cropper.reset();
        }
    },

    subscribeToFriendStatus: function(props, setStatusHandle) {
        this.props = props;
        this.setStatusHandle = setStatusHandle;
    },

    unsubscribeFromFriendStatus: function() {
        this.props = null;
        this.setStatusHandle = null;
        this.isUploadBtn = true;
    }
};

export default ImageCropAPI;
