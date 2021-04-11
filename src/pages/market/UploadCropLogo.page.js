import React, { useEffect, useState } from 'react';
import { Upload } from "antd";
import Cropper from "react-cropper";

import { uploadService } from '../../service';

import { BtnComponent } from '../../components';
import uploadComponent from '../../common/upload';

// import { IMG_SERVER } from "../../constants/http.constant";

import "cropperjs/dist/cropper.css";


function UploadCropLogoPage(props) {
    const { url = '', size = 5, uploadCallback=() => {}, viewUrl='' } = props;
    const [ image, setImage ] = useState(url);
    const [cropper, setCropper] = useState('');
    const [ isUploadBtn, setIsUploadBtn ] = useState(true);

    const onChange = (e) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader);
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const uploadHandle = () => {
        if(cropper.cropped) {
            if( isUploadBtn ) {
                cropper.getCroppedCanvas().toBlob((blob) => {
                    if(blob.size < size * 1024 * 1024) {
                        setIsUploadBtn(false);
                        uploadComponent.upload(blob, (data, code) => {
                            setIsUploadBtn(true);
                            uploadCallback(data, code);
                        })
                    } else {
                        // this.props.uploadChange(1);  // 图片太大
                    }
                }, 'image/jpeg')

            }
        } else {

        }
        // uploadComponent();
        // if(cropper !== '') {
        //     if( this.isUploadBtn ) {
        //         cropper.getCroppedCanvas().toBlob((blob) => {
        //             if(blob.size < size * 1024 * 1024) {
        //                 this.isUploadBtn = false;
        //                 this.props.uploadChange(blob, () => {
        //                     this.isUploadBtn = true;
        //                 });
        //             } else {
        //                 this.props.uploadChange(1);  // 图片太大
        //             }
        //         }, 'image/jpeg')
        //
        //     }
        // } else {
        //     cropper.destroy();
        //     this.props.uploadChange(0); // 为空时 代表还没添加图片
        // }
    };

    useEffect(() => {

    },[])

    return (
        <div className="crop-logo-block">
            <div className="upload-btn block">
                <div className="logo-img">
                    {
                        url.length !== 0 ? <img src={url}/> : null
                    }
                </div>
                <div className="ui-upload">
                    <div className="icon-block">
                        <div className="info">
                            <span className="icon iconfont icon-add-icon "></span>
                            <span className="text">添加LOGO</span>
                        </div>
                    </div>
                </div>
                <div className="ipt-file">
                    <input
                        className="file"
                        accept=".png, .jpg, .jpeg, .gif"
                        onChange={e => onChange(e)}
                        type="file"/>
                </div>
            </div>

            <BtnComponent
                onClick={ () => uploadHandle() }
                className="upload-logo-btn"
                text="上传LOGO"
            />

            <div className="logo-preview-block block">
                <div className="logo-overflow">
                    <div
                        className="logo-preview"
                        style={{ width: "100%", float: "left", height: "100px" }}
                    />
                </div>
            </div>

            <div className="log-cropper-block block">
                <Cropper
                    style={{ height: 150, width: "100%" }}
                    // zoomTo={2}
                    // initialAspectRatio={1}
                    preview=".logo-preview"
                    src={image}
                    // viewMode={1}
                    guides={true}
                    initialAspectRatio={10 / 10}
                    checkCrossOrigin={false}
                    checkOrientation={false}
                    // minCropBoxHeight={10}
                    // minCropBoxWidth={10}
                    // background={false}
                    // responsive={true}
                    // autoCropArea={1}
                    // checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
            </div>
        </div>
    );
}

export default UploadCropLogoPage;
