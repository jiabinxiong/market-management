import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketDetailPage from './Market-detail.page';
import MarketShopPage from './Market-shop.page';

export default class MarketRPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: ['市场详情', '市场店铺', '图片/视频'],
            tabIndex: 0
        };
    }

    tabHandle(index) {
        this.setState({
            tabIndex: index
        });
    }

    render() {
        return (
            <div className="market-detail">
                <div className="market-detail-block">
                    <div className="market-detail-tab-block">
                        <ul className="ul">
                            {
                                this.state.tab.map((data, index) => {
                                    return <li
                                            onClick={() => this.tabHandle(index)}
                                            key={index}
                                            className={`li ${this.state.tabIndex === index ? 'select-li' : ''}`}>
                                        <span className="text">{ data }</span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="market-detail-tab-area">

                        {
                            this.state.tabIndex === 0 ? <div className="market-detail-tab-detail">
                                {/*<PerfectScrollbar>*/}
                                {/*    <MarketDetailPage/>*/}
                                {/*</PerfectScrollbar>*/}
                            </div> : null
                        }

                        {
                            this.state.tabIndex === 1 ?  <div className="market-shop-area">
                                <MarketShopPage/>
                            </div>  : null
                        }

                        {
                            this.state.tabIndex === 2 ? <div className="market-detail-tab-detail">
                                adfas
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
