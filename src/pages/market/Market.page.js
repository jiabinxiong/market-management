import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketRPage from './MarketR.page';
import MarketListPage from './MarketList.page';

// import MarketLPage from './MarketLFu.page';
import MarketLPage from './MarketL.page';
import MarketNewPopPage from './MarketNewPop.page';

import { WindowPopComponent } from '../../components';

import { MarketAPI, MarketLAPI } from '../../effectAPI'

export default function MarketPage(props) {
    const [ windowMarketPopVisible, setWindowMarketPopVisible ] = useState(false);

    function marketStatusHandle(status) {
        // setWindowMarketPopVisible(status.windowMarketPopVisible);
    }

    useEffect(() => {
        MarketAPI.subscribeToStatus(
            marketStatusHandle
        );

        return () => {
            MarketAPI.unsubscribeFromStatus(
                marketStatusHandle
            );
        }
    }, []);
    
    return (
        <div className="market">
            <div className="market-l">
                {/* {
                    // console.log(window.location.href)
                    !MarketAPI.isUrl(window.location.href) ? <MarketLPage/> : null                 
                } */}
                
                <MarketLPage/>
                {/*<div className="market-list">*/}
                {/*    <MarketListPage/>*/}
                {/*</div>*/}
            </div>

            <div className="market-r">
                <MarketRPage/>
            </div>

            {/*{*/}
            {/*    windowMarketPopVisible ? <MarketNewPopPage*/}
            {/*        visible={ windowMarketPopVisible }*/}
            {/*        popCloseCallback={ () => popCloseCallback() }*/}
            {/*        popDetermineCallback={obj => popDetermineCallback(obj)}*/}
            {/*    /> : null*/}
            {/*}*/}
        </div>
    );
}


