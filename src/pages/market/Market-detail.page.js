import React from 'react';
import { connect } from 'react-redux';
import { Carousel, Upload } from 'antd';
import { IMG_SERVER } from "../../constants/http.constant";
import { MapComponent } from '../../components';


function MarketDetailPage(props) {
    const { marketListHandleReducer } = props;
    
    return (
        <div className="market-detail-info">
            <div className="market-detail-logo">
                {
                    marketListHandleReducer.logo !== '' ? <img className="img" src={`${IMG_SERVER}${marketListHandleReducer.logo}`}/> : null
                }
                
            </div>
            <div className="market-detail-info-title">
                <h1 className="title">{marketListHandleReducer.name}</h1>
            </div>
            <div className="market-detail-info-cover">
                <Carousel className="block">
                    {
                        marketListHandleReducer.cover.length > 0 ? marketListHandleReducer.cover.map((data, index) =>
                            <div
                                key={data}
                                style={{ backgroundImage:`url(${IMG_SERVER}${data})` }}
                                className="img-block">
                                <div className="img"
                                     style={{
                                         backgroundImage:`url(${IMG_SERVER}${data})`,
                                         backgroundSize: "cover",
                                         backgroundPosition: "center"
                                     }}>

                                </div>
                            </div>
                        ) : null
                    }

                </Carousel>
            </div>
            <div className="market-detail-info-block  market-detail-info-summary-block">
                <div className="title-text">
                    <span className="name-text">简介</span>
                </div>
                <div className="info-block">
                    <p className="text">
                        { marketListHandleReducer.summary }
                    </p>
                </div>
            </div>
            <div className="market-detail-info-block market-detail-info-block-map">
                <div className="title-text">
                    <span className="name-text">地址</span>
                </div>
                <div className="info-block">
                    { marketListHandleReducer.address.text }
                </div>
                <div className="map">
                  
                    {/* <MapComponent
                        center={
                            marketListHandleReducer.address.lnglat !== '' ? 
                            [
                                parseFloat(marketListHandleReducer.address.lnglat.split(',')[0]),
                                parseFloat(marketListHandleReducer.address.lnglat.split(',')[1])
                            ] : false
                        }
                    /> */}
                </div>
            </div>
            <div className="market-detail-info-block">
                <div className="title-text">
                    <span className="name-text">开放时间</span>
                </div>
                <div className="info-block">
                    {
                        marketListHandleReducer.openTime.split('/').map((data, index) => <div key={data}>
                            {data}
                        </div>)
                    }
                </div>
            </div>
            <div className="market-detail-info-block">
                <div className="title-text">
                    <span className="name-text">电话</span>
                </div>
                <div className="info-block">
                    { marketListHandleReducer.phone }
                </div>
            </div>
            <div className="market-detail-info-block">
                <div className="title-text">
                    <span className="name-text">闲逛须知</span>
                </div>
                <div className="info-block">
                    { marketListHandleReducer.hangOut }
                </div>
            </div>
            <div className="market-detail-info-block">
                <div className="title-text">
                    <span className="name-text">公交</span>
                </div>
                <div className="info-block">
                    {
                        marketListHandleReducer.bus.split('/').map((data, index) => <div key={data}>
                            {data}
                        </div>)
                    }
                </div>
            </div>
            <div className="market-detail-info-block">
                <div className="title-text">
                    <span className="name-text">地铁</span>
                </div>
                <div className="info-block">
                    {
                        marketListHandleReducer.subway.split('/').map((data, index) => <div key={data}>
                            {data}
                        </div>)
                    }
                </div>
            </div>
            <div className="market-detail-info-block">
                <div className="title-text">
                    <span className="name-text">网址</span>
                </div>
                <div className="info-block">
                    { marketListHandleReducer.http }
                </div>
            </div>
        </div>

    );
}


export default connect(
    data => ({
        marketListHandleReducer: data.marketListHandleReducer
    }), {

    }
)(MarketDetailPage)
