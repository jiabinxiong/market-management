import React, { useEffect, useState } from 'react';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { BtnComponent } from '../../components';
import ImageCropAPI from './ImageCropAPI';
import './imageCrop.less';


function ImageCropComponent (props) {
    const {
        url = '',
        size = 5,
        addText= '',
        promptText = '',
    } = props;
    const [ imgUrl, setImgUrl ] = useState(url);
    const [ cropData, setCropData ] = useState('');
    const [cropper, setCropper] = useState('');

    function setStatusHandle(status) {
        setImgUrl(status.url);
    }

    useEffect(() => {
        ImageCropAPI.subscribeToFriendStatus(props, setStatusHandle);

        return () => {
            ImageCropAPI.unsubscribeFromFriendStatus();
        }
    }, [setImgUrl, setCropData, setCropper])

    return <div className="image-crop-upload">
        <div className="fun-block">
            <div className="ipt-file ui-btn">
                <div className="file-text">{ addText }</div>
                <input
                    className="file"
                    onChange={e => ImageCropAPI.imgChange(e)}
                    type="file"/>
            </div>

            {
                imgUrl.length !== 0 ? <BtnComponent
                    onClick={() => ImageCropAPI.toolsHandle('reset', cropper)}
                    className="reset-btn btn"
                    text="重置"
                /> : null
            }

            {
                imgUrl.length !== 0 ? <BtnComponent
                    onClick={() => ImageCropAPI.uploadHandle(cropper, size)}
                    className="upload-btn"
                    text="上传"
                /> : null
            }

        </div>
        <div className="img-block">
            <div className="l">
                {
                    imgUrl.length !== 0 ? <Cropper
                        src={imgUrl}
                        className="crop"
                        preview=".cover-crop"
                        initialAspectRatio={16 / 9}
                        guides={false}
                        // checkCrossOrigin={true}
                        onInitialized={(instance) => {
                            setCropper(instance)
                        }}
                    /> : <div className="no-text">{ promptText }</div>
                }
            </div>
            <div className="r">
                <div className="img-preview-block">
                    <div
                        style={{ width: "100%", float: "left", height: "300px" }}
                        className="cover-crop">
                    </div>
                </div>

            </div>
        </div>
        {/*<div className="tools">*/}
        {/*   */}
        {/*</div>*/}
    </div>
}

export default ImageCropComponent;
