import React from 'react';

import MarketPage from '../market/Market.page';
import MenuComponent from '../../components/menu/Menu.component';
import NavPage from '../nav/Nav.page';

export default function HomePage () {
    return (
        <div className="home">
            <NavPage/>
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
