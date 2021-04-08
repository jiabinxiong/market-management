import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Select } from 'antd';
const { Option } = Select;

import { marketAction } from '../../redux/actions';
import AddMarketDialogPage from './AddMarketDialog.page';

import { LoadingComponent, Dialog } from '../../components';

import { MarketLAPI } from '../../effectAPI';
import {MARKET_OPERATE_TYPE} from "../../constants";

function MarketLPage(props) {
    function marketLStatusHandle(status) {

    }
    useEffect(() => {
        MarketLAPI.subscribeToFriendStatus(marketLStatusHandle, props);

        return () => {
            MarketLAPI.unsubscribeFromFriendStatus();
        }
    }, [
        props.marketDialogTypeReducer, props.marketDialogTypeReducer,
        props.marketListReducer, props.marketNewIptReducer, props.marketNewPromptReducer
    ]);

    return (
        <Fragment>
            <div className="market-l-t">
                <div className="market-search">
                    <div
                        onClick={ () => MarketLAPI.dialogOpenHandle() }
                        className="btn new-btn ui-btn">
                        创建
                    </div>
                    <div className="btn search-btn ui-btn">
                        搜索
                    </div>
                    <div className="market-search-ipt">
                        <input type="text" className="ipt" placeholder="搜索蔬果市场名称"/>
                    </div>
                </div>
                <div className="market-l-t-city">
                    <ul className="ul">
                        <li className="li">
                            <Select className="select" defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </li>
                        <li className="li">
                            <Select className="select" defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="market-list">
                {  props.marketListLoadingReducer ? <LoadingComponent/> : null }
                {   props.marketListReducer.length > 0 ?
                    <PerfectScrollbar>
                        <ul className="market-list-ul">
                            {
                                props.marketListReducer.map((item, index) => {
                                    return <li className="li" key={item._id}>
                                        <div className="r">
                                            <div
                                                onClick={ () => MarketLAPI.deleteMarketHandle(item, MARKET_OPERATE_TYPE.DELETE, index) }
                                                className="delete-btn btn">
                                                删除
                                            </div>
                                            <div
                                                onClick={ () => MarketLAPI.dialogUpdateHandle(item, MARKET_OPERATE_TYPE.UPDATE) }
                                                className="update-btn btn">
                                                修改
                                            </div>
                                        </div>
                                        <div className="l">
                                            <h3 className="sub-title">
                                                {item.name}
                                            </h3>
                                            <p className="detail-text">
                                                {item.summary}
                                            </p>
                                        </div>

                                    </li>
                                })
                            }
                        </ul>
                    </PerfectScrollbar> : null
                }


                {
                    props.marketListReducer.length === 0 && !props.marketListLoadingReducer ? <div className="market-list-none">
                        还没有市场，<span
                        onClick={ () => MarketLAPI.dialogOpenHandle() }
                        className="new-btn">去创建吧!</span>
                    </div> : null
                }
            </div>
            <AddMarketDialogPage
                props={props}/>

        </Fragment>
    );
}

export default connect(
    data => ({
        commonProvinceReducer: data.commonProvinceReducer,
        commonCityReducer: data.commonCityReducer,
        commonCountyReducer: data.commonCountyReducer,
        marketListReducer: data.marketListReducer,
        addMarketDialogReducer: data.addMarketDialogReducer,
        administrationSelectReducer: data.administrationSelectReducer,
        marketNewIptReducer: data.marketNewIptReducer,
        marketNewPromptReducer: data.marketNewPromptReducer,
        marketListLoadingReducer: data.marketListLoadingReducer,
        marketDialogTypeReducer: data.marketDialogTypeReducer
    }), {
        addMarketDialogAction: marketAction.dialog,
        // addMarketAction: marketAction.add,
        marketListQueryAction: marketAction.query,
        marketListUpdateAction: marketAction.update,
        marketListAddAction: marketAction.add,
        marketListDeleteAction: marketAction.delete,
        marketNewIptAction: marketAction.newIpt,
        marketUploadChangeAction: marketAction.updateChange,
        marketEmptyChangeAction: marketAction.emptyChange,
        marketDeleteChangeAction: marketAction.deleteChange,
        marketListLoadingAction: marketAction.listLoading,
        marketDialogTypeAction: marketAction.dialogType,
        selectProvinceAction: marketAction.selectProvince,
        selectCityAction: marketAction.selectCity,
        selectCountyAction: marketAction.selectCounty,
        selectEmptyAction: marketAction.selectEmpty,
        marketIsNewPromptAction: marketAction.isNewPrompt,

    }
)(MarketLPage);
