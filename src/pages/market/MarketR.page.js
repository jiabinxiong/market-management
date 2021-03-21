import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketDetailPage from './Market-detail.page';
import MarketShopPage from './Market-shop.page';

export default class MarketRPage extends React.Component {


    render() {
        return (
            <div className="market-detail">
                <div className="market-detail-block">
                    <div className="market-detail-tab-block">
                        <ul className="ul">
                            <li className="li select-li">
                                <span className="text">市场详情</span>
                            </li>
                            <li className="li">
                                <span className="text">市场店铺</span>
                            </li>
                            <li className="li">
                                <span className="text">图片/视频</span>
                            </li>
                        </ul>
                    </div>
                    <div className="market-detail-tab-area">

                        <div className="market-detail-tab-detail" style={{ display: 'none' }}>
                            <PerfectScrollbar>
                                <MarketDetailPage/>
                            </PerfectScrollbar>
                        </div>
                        
                        <div className="market-shop-area">                            
                            <MarketShopPage/>
                        </div> 
                         
                    </div>
                </div>
            </div>
        );
    }
}