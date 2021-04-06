import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketRPage from './MarketR.page';
import MarketListPage from './MarketList.page';

// import MarketLPage from './MarketLFu.page';
import MarketLPage from './MarketL.page';
import MarketNewPopPage from './MarketNewPop.page';

import { WindowPopComponent } from '../../components';

import { MarketAPI } from '../../effectAPI'

export default function MarketPage() {
    const [ windowMarketPopVisible, setWindowMarketPopVisible ] = useState(false);

    function marketStatusHandle(status) {
        setWindowMarketPopVisible(status.windowMarketPopVisible);
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

    function popCloseCallback() {
        setWindowMarketPopVisible(false);
    }

    function popDetermineCallback(obj) {
        obj.close('determine', () => {
            setWindowMarketPopVisible(false);
        });
    }

    return (
        <div className="market">
            <div className="market-l">
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


