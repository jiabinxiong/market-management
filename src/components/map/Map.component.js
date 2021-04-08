import React, { useEffect, useState } from 'react';
import {APILoader, Map, Geolocation} from "@uiw/react-amap";

import { MAP_KEY } from '../../constants';

import MapAPI from './MapAPI';

function MapComponent (props) {
    const { zoom:propsZoom = 15 } = props;
    // const { lnglat, setLnglat } = useState({ lng: 0, lat: 0 }); // lng经度 lat 纬度
    const [ zoom, setZoom ]  = useState(propsZoom);

    function setStateHandle(states) {
        setZoom(states.zoom);
    }

    useEffect(() => {
        MapAPI.subscribeToFriendStatus(props, zoom, setStateHandle )

        return () => {
            MapAPI.unsubscribeFromFriendStatus();
        }
    }, [zoom]);

    return (
        <div className="ui-map-block">
            <APILoader akay={MAP_KEY.web}>
                <Map
                    zoom={zoom}
                    center={props.center !== undefined ? props.center : false}
                    onClick={(event) => MapAPI.onClick(event)}
                >
                    <div className="ui-zoom">
                        <div
                            onClick={() => MapAPI.zoomHandle('in')}
                            className="zoom-in-btn btn">
                            +
                        </div>
                        <div
                            onClick={() => MapAPI.zoomHandle('out')}
                            className="zoom-out-btn btn">
                            -
                        </div>
                    </div>
                    {
                        props.center === undefined ? <Geolocation
                            // 是否使用高精度定位，默认:true
                            enableHighAccuracy={true}
                            // 超过10秒后停止定位，默认：5s
                            timeout={10000}
                            // 定位按钮的停靠位置
                            buttonPosition="RB"
                            // // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            // buttonOffset={new AMap.Pixel(10, 20)}
                            // 定位成功后是否自动调整地图视野到定位点
                            zoomToAccuracy={true}
                            onComplete={(data) => {
                                // console.log('返回数据：', data);
                                // setData(data);
                            }}
                            onError={(data) => {
                                // console.log('错误返回数据：', data);
                                // setData(data);
                            }}
                        /> : null
                    }
                </Map>
            </APILoader>
        </div>
    );
}

export default MapComponent;
