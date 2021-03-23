import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketPage from '../market/Market.page';
import MenuComponent from '../../components/menu/Menu.component';

import '../../less/home/home.less';
import '../../less/nav/nav-l.less';

export default function HomePage () {
    return (
        <div className="home">
            <div className="home-l nav-l">
                <div className="logo">

                </div>
                <div className="menu">
                    <PerfectScrollbar>
                        <MenuComponent/>
                    </PerfectScrollbar>
                </div>
            </div>
            <div className="home-r">
                <div className="home-t">
                    asdfas
                </div>
                <div className="home-t-l">
                    <MarketPage/>
                </div>

            </div>
        </div>
    );
}
