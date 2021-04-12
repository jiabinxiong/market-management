import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { MenuAPI } from '../../effectAPI';
import { menuAction, commonAction } from '../../redux/actions';

import MenuPage from './Menu.page';

function NavPage(props) {
    useEffect(() => {
        MenuAPI.subscribeToFriendStatus(props);

        return () => {
            MenuAPI.unsubscribeFromFriendStatus();
        }
    }, [])


    return (
        <div className="home-l nav-l">
            <div className="logo">

            </div>
            <div className="menu">
                <MenuPage props={props}/>
            </div>
        </div>
    );
}

export default withRouter(connect(
    data =>({
        menuReducer: data.menuReducer,
        commonProvinceReducer: data.commonProvinceReducer,
        commonCityReducer: data.commonCityReducer,
        commonCountyReducer: data. commonCountyReducer
    }),{
        // menuQueryProvinceAction: menuAction.queryProvince,
        // menuQueryCityAction: menuAction.queryCity,
        // menuQueryCountyAction: menuAction.queryCounty,
        commonProvinceAction: commonAction.queryProvince,
        commonCityAction: commonAction.queryCity,
        commonCountyAction: commonAction.queryCounty,
    }
)(NavPage));
