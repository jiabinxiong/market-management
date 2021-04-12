import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, withRouter } from 'react-router-dom';
import { Select } from 'antd';
import tool from '../../common/tool';
const { Option } = Select;

import { marketAction } from '../../redux/actions';
import AddMarketDialogPage from './AddMarketDialog.page';

import { LoadingComponent, Dialog, WrapComponent } from '../../components';

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
        props.marketListReducer, props.marketNewIptReducer, props.marketNewPromptReducer, props.location
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
                {   props.marketListReducer.length > 0 && !props.marketListLoadingReducer ?
                    <PerfectScrollbar>
                        <ul className="market-list-ul">
                            {
                                props.marketListReducer.map((item, index) => {
                                    return <li
                                        onClick={ (e) => MarketLAPI.marketListHandle(e, item) }                                        
                                        className={`li ${MarketLAPI.listSelect(item._id, index)}`}
                                        key={item._id}
                                    >
                                        <div className="r">
                                            <div
                                                onClick={ (e) => MarketLAPI.deleteMarketHandle(item, MARKET_OPERATE_TYPE.DELETE, index, e) }
                                                className="delete-btn btn">
                                                删除
                                            </div>
                                            <div
                                                onClick={
                                                    (e) => MarketLAPI.dialogUpdateHandle(
                                                        item, MARKET_OPERATE_TYPE.UPDATE, props.commonCityReducer, props.commonCountyReducer, e
                                                    )
                                                }
                                                className="update-btn btn">
                                                修改
                                            </div>
                                        </div>
                                        <Link className="link" to={`/home/market?province=${tool.filterUrl('province')}&id=${item._id}`}>
                                        {/* <Link className="link" to={`/home/market?id=${item._id}`}> */}
                                            <div className="l">
                                                <h3 className="sub-title">
                                                    {item.name}
                                                </h3>
                                                <div className="detail-text">
                                                    <WrapComponent
                                                        text={item.summary}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
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

export default withRouter(connect(
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
        marketDialogTypeReducer: data.marketDialogTypeReducer,
        marketListHandleReducer: data.marketListHandleReducer
    }), {
        addMarketDialogAction: marketAction.dialog,
        // addMarketAction: marketAction.add,
        marketListQueryAction: marketAction.query,
        marketListUpdateAction: marketAction.update,
        marketListAddAction: marketAction.add,
        marketListDeleteAction: marketAction.delete,
        marketListHandleAction: marketAction.listHandle,
        marketNewIptAction: marketAction.newIpt,
        marketUploadChangeAction: marketAction.updateChange,
        marketEmptyChangeAction: marketAction.emptyChange,
        marketDeleteChangeAction: marketAction.deleteChange,
        marketListLoadingAction: marketAction.listLoading,
        marketDialogTypeAction: marketAction.dialogType,
        selectProvinceAction: marketAction.selectProvince,
        selectCityAction: marketAction.selectCity,
        selectCountyAction: marketAction.selectCounty,
        selectCityUpdateAction: marketAction.selectCityUpdate,
        selectEmptyAction: marketAction.selectEmpty,
        marketIsNewPromptAction: marketAction.isNewPrompt,

    }
)(MarketLPage));
