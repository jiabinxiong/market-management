import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { MARKET_TAB_TYPE } from '../../constants';
import tool from '../../common/tool';
import MarketDetailPage from './Market-detail.page';
import MarketShopPage from './Market-shop.page';

function MarketRPage(props) {
    const [ selectIndex, setSelectIndex ] = useState(0);

    const tabHandle = (index) => {
        setSelectIndex(index);
    };

    useEffect(() => {

    }, [selectIndex]);

    return (
        <div className="market-detail">
            <div className="market-detail-block">
                <div className="market-detail-tab-block">
                    <ul className="ul">
                        {
                            Object.keys(MARKET_TAB_TYPE).map((data, index) => {
                                return <li
                                        onClick={ () => tabHandle(index) }
                                        key={data}
                                        className={`li ${selectIndex === index ? 'select-li' : ''}`}>
                                    <span className="text">{ MARKET_TAB_TYPE[data] }</span>
                                </li>
                            })
                        }
                    </ul>
                </div>

                {
                    props.marketListHandleReducer.name !== '' && !props.marketListLoadingReducer ? <div className="market-detail-tab-area">

                        {
                            selectIndex === 0 ? <div className="market-detail-tab-detail">
                                <PerfectScrollbar>
                                    <MarketDetailPage props={props}/>
                                </PerfectScrollbar>
                            </div> : null
                        }

                        {
                            selectIndex === 1 ?  <div className="market-shop-area">
                                <MarketShopPage/>
                            </div>  : null
                        }

                        {
                            selectIndex === 2 ? <div className="market-detail-tab-detail">
                                adfas
                            </div> : null
                        }
                    </div> : null
                }
                
            </div>
        </div>
    )
}


export default connect(
    data => ({
        marketListHandleReducer: data.marketListHandleReducer,
        marketListLoadingReducer: data.marketListLoadingReducer,
    }), {

    }
)(MarketRPage);