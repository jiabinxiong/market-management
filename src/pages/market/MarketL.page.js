import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from "react-perfect-scrollbar";
import {Carousel, Select, Upload} from "antd";
const { Option } = Select;

import {Dialog, IptComponent} from '../../components';
import { LoadingComponent, TextareaComponent } from '../../components';

import { MarketLAPI } from '../../effectAPI';
import {commonAction, marketAction} from '../../redux/actions';
import { IMG_SERVER } from '../../constants/http.constant';
import { DIALOG_TYPE, MARKET_OPERATE_TYPE, MARKET_CHANGE_TYPE, ADMINISTRATION } from '../../constants';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

function MarketLPage(props) {
    function marketLStatusHandle() {

    }

    useEffect(() => {
        MarketLAPI.subscribeToFriendStatus(
            marketLStatusHandle,
            props
        );

        return () => {
            MarketLAPI.unsubscribeFromFriendStatus(marketLStatusHandle)
        }
    }, [
        props.marketNewPromptReducer,
        props.marketNewUpdateChangeReducer, props.administrationFilterReducer, props.marketCoverUploadReducer
    ])


    return (
        <Fragment>
            <div className="market-l-t">
                <div className="market-search">
                    <div
                        onClick={ () => MarketLAPI.dialogNewHandle(MARKET_OPERATE_TYPE.NEW) }
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

                {   props.marketReducer.length > 0 ? <PerfectScrollbar>
                        <ul className="market-list-ul">
                            {
                                props.marketReducer.map((item, index) => {
                                    return <li className="li" key={item._id}>
                                        <div className="r">
                                            <div
                                                onClick={ () => MarketLAPI.deleteMarketHandle(item, MARKET_OPERATE_TYPE.DELETE) }
                                                className="delete-btn btn">
                                                删除
                                            </div>
                                            <div className="update-btn btn">修改</div>
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
                    props.marketReducer.length === 0 && !props.marketListLoadingReducer ? <div className="market-list-none">
                        还没有市场，<span
                        className="new-btn">去创建吧!</span>
                    </div> : null
                }
            </div>

            <Dialog
                type={ props.marketDialogTypeReducer }
                titleText="创建市场"
                className={`${props.marketOperateTypeReducer === MARKET_OPERATE_TYPE.NEW ? 'market-new-pop' : '' }`}
                closeCallback={ () => MarketLAPI.dialogCloseCallback() }
                determineCallback={
                    (back) => MarketLAPI.dialogDetermineCallback(
                        back, props.marketListFilterReducer, props.marketOperateTypeReducer
                    )
                }
                show={
                    props.marketNewDialogReducer
                }>
                {
                    props.marketDialogTypeReducer === DIALOG_TYPE.prompt ? <div>你真的想删除{props.marketListFilterReducer.name}</div> : null
                }
                {
                    props.marketDialogTypeReducer === DIALOG_TYPE.pop ? <div className="market-new-pop-cnt">
                        <PerfectScrollbar>
                            <ul className="ui-ul-form">
                                <li className="ui-li-form ">
                                    <label className="li-label-form ui-li-label-form">
                                        <span className="ui-li-label-form-required">*</span>名 称:
                                    </label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form">
                                            <IptComponent
                                                className="ui-li-form-ipt"
                                                type="text"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.NAME) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.NAME] }
                                                placeholder="请输入市场名称"
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            <span className="ui-li-prompt-text-l-form-ipt">
                                                { props.marketNewPromptReducer.name }
                                            </span>
                                        </p>
                                    </div>
                                </li>
                                <li className="ui-li-form market-new-pop-cnt-area-li">
                                    <label className="li-label-form ui-li-label-form">
                                        <span className="ui-li-label-form-required">*</span>地 区:
                                    </label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form">
                                            <ul className="ul">
                                                <li className="li">
                                                    <Select
                                                        onChange={
                                                            (e, option) => MarketLAPI.cityChange(
                                                                ADMINISTRATION.PROVINCE,
                                                                props.commonCityReducer,
                                                                option
                                                            )
                                                        }
                                                        className="select" placeholder="请选择省/直辖市">
                                                        {
                                                            props.commonProvinceReducer.map((data, index) =>
                                                                <Option
                                                                    key={data.code}
                                                                    value={data.code}>{data.name}</Option>
                                                            )
                                                        }
                                                    </Select>
                                                </li>
                                                <li className="li">
                                                    <Select
                                                        value={
                                                            props.administrationFilterReducer[ADMINISTRATION.CITY].value.name === '' ? undefined : props.administrationFilterReducer[ADMINISTRATION.CITY].value.name
                                                        }
                                                        onChange={
                                                            (e, option) => MarketLAPI.cityChange(
                                                                ADMINISTRATION.CITY,
                                                                props.commonCountyReducer,
                                                                option
                                                            )
                                                        }
                                                        className="select" placeholder="请选择市">
                                                        {

                                                            props.administrationFilterReducer[ADMINISTRATION.CITY].data.map((data, index) =>
                                                                <Option
                                                                    key={data.cityCode}
                                                                    value={data.cityCode}>{data.name}</Option>
                                                            )
                                                        }
                                                    </Select>
                                                </li>
                                                <li className="li">
                                                    <Select
                                                        value={
                                                            props.administrationFilterReducer[ADMINISTRATION.COUNTY].value.name === '' ? undefined : props.administrationFilterReducer[ADMINISTRATION.COUNTY].value.name
                                                        }
                                                        onChange={
                                                            (e, option) => MarketLAPI.cityChange(
                                                                ADMINISTRATION.COUNTY,
                                                                [],
                                                                option
                                                            )
                                                        }
                                                        className="select" placeholder="请选择县">
                                                        {
                                                            props.administrationFilterReducer[ADMINISTRATION.COUNTY].data.map((data, index) =>
                                                                <Option
                                                                    key={data.countyCode}
                                                                    value={data.countyCode}>{data.name}</Option>
                                                            )
                                                        }
                                                    </Select>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt" onClick={ () => testShowHandle() }>
                                            <span className="ui-li-prompt-text-l-form-ipt">
                                                { props.marketNewPromptReducer.administration }
                                            </span>
                                        </p>
                                    </div>
                                </li>
                                <li className="ui-li-form ui-li-upload-form market-new-pop-cover-ui-li">
                                    <label className="ui-li-label-form">
                                        <span className="ui-li-label-form-required">*</span>封 面:
                                    </label>
                                    <div className="ui-li-block-form ui-li-upload-block-form">
                                        <div className="ui-li-block-childer-form ui-li-upload-childer-form block-childer">
                                            <Upload
                                                name="file"
                                                beforeUpload={() => (false)}
                                                onChange={info => MarketLAPI.uploadChange(info)}
                                                accept=".png, .jpg, .jpeg, .gif"
                                                showUploadList={false}
                                                className="ui-upload">
                                                <div className="icon-block">
                                                    <div className="info">
                                                        <span className="icon iconfont icon-add-icon "></span>
                                                        <span className="text">上传</span>
                                                    </div>
                                                </div>
                                            </Upload>
                                            <div className="market-detail-carousel">
                                                {
                                                    props.marketCoverUploadReducer.length > 0 ? <Carousel>
                                                        {
                                                            props.marketCoverUploadReducer.map((data, index) => {
                                                                return <div className="cover-img" key={data}>
                                                                    <div
                                                                        onClick={() => MarketLAPI.coverDeleteHandle(data, index)}
                                                                        className="delete-btn">
                                                                        删除第{index+1}张图片
                                                                    </div>
                                                                    <img src={`${IMG_SERVER}${data}`}/>
                                                                </div>
                                                            })
                                                        }

                                                    </Carousel> : <div className="no-text">还没有上传封面了，快去添加吧</div>
                                                }

                                            </div>
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            <span className="ui-li-prompt-text-l-form-ipt">
                                                { props.marketNewPromptReducer.cover }
                                            </span>
                                            <span className="ui-li-prompt-text-r-form-ipt">
                                                最多还可以上传{ 5- props.marketCoverUploadReducer.length}/5张图片
                                            </span>
                                        </p>
                                    </div>
                                </li>
                                <li className="ui-li-form ui-li-textarea-form">
                                    <label className="ui-li-label-form ui-li-label-textarea">
                                        <span className="ui-li-label-form-required">*</span>简 介:
                                    </label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form ui-li-textarea-form ">
                                            <TextareaComponent
                                                placeholder="请输入市场简介"
                                                className="ui-textarea"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.SUMMARY) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.SUMMARY] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            <span className="ui-li-prompt-text-l-form-ipt">
                                                { props.marketNewPromptReducer.summary }
                                            </span>
                                        </p>
                                    </div>
                                </li>
                                <li className="ui-li-form ui-li-textarea-form">
                                    <label className="ui-li-label-form ui-li-label-textarea">闲逛须知:</label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form ui-li-textarea-form ">
                                            <TextareaComponent
                                                placeholder="请输入市场简介"
                                                className="ui-textarea"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.HANG_OUT) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.HANG_OUT] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            <span className="ui-li-prompt-text-l-form-ipt">

                                            </span>
                                        </p>
                                    </div>
                                </li>

                                <li className="ui-li-form ui-li-textarea-form">
                                    <label className="ui-li-label-form ui-li-label-textarea">公 交:</label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form ui-li-textarea-form ">
                                            <TextareaComponent
                                                placeholder="请输入乘坐公交路线"
                                                className="ui-textarea"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.BUS) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.BUS] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            {/*<span className="ui-li-prompt-text-l-form-ipt">请输入乘坐公交路线</span>*/}
                                            <span className="ui-li-prompt-text-r-form-ipt">
                                            (100路公交在某某站下等等) 如有多个以“ / ”分段
                                        </span>
                                        </p>
                                    </div>
                                </li>

                                <li className="ui-li-form ui-li-textarea-form">
                                    <label className="ui-li-label-form ui-li-label-textarea">地 铁:</label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form ui-li-textarea-form ">
                                            <TextareaComponent
                                                placeholder="请输入乘坐地铁路线"
                                                className="ui-textarea"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.SUBWAY) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.SUBWAY] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            {/*<span className="ui-li-prompt-text-l-form-ipt">请输入乘坐地铁路线</span>*/}
                                            <span className="ui-li-prompt-text-r-form-ipt">
                                            (地铁1号线在某某站下等等) 如有多个以“ / ”分段
                                        </span>
                                        </p>
                                    </div>
                                </li>

                                <li className="ui-li-form ui-li-textarea-form">
                                    <label className="ui-li-label-form ui-li-label-textarea">开放时间:</label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form ui-li-textarea-form ">
                                            <TextareaComponent
                                                placeholder="请输入开放时间"
                                                className="ui-textarea"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.OPEN_TIME) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.OPEN_TIME] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            {/*<span className="ui-li-prompt-text-l-form-ipt">请输入开放时间</span>*/}
                                            <span className="ui-li-prompt-text-r-form-ipt">
                                                (1月01日－03月31日 06:00-19:00)也可以不加月份等等, 如有多个以“ / ”分段
                                            </span>
                                        </p>
                                    </div>
                                </li>

                                <li className="ui-li-form ">
                                    <label className="li-label-form ui-li-label-form">
                                        电 话:
                                    </label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form">
                                            <IptComponent
                                                className="ui-li-form-ipt"
                                                type="text"
                                                placeholder="请输入电话号码"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.PHONE) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.PHONE] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            {/*<span className="ui-li-prompt-text-l-form-ipt">*/}
                                            {/*    请输入电话号码*/}
                                            {/*</span>*/}
                                        </p>
                                    </div>
                                </li>

                                <li className="ui-li-form ">
                                    <label className="li-label-form ui-li-label-form">
                                        网 址:
                                    </label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form">
                                            <IptComponent
                                                className="ui-li-form-ipt"
                                                type="text"
                                                placeholder="请输入网址"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.HTTP) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.HTTP] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            {/*<span className="ui-li-prompt-text-l-form-ipt">*/}
                                            {/*    请输入网址*/}
                                            {/*</span>*/}
                                        </p>
                                    </div>
                                </li>

                                <li className="ui-li-form ">
                                    <label className="li-label-form ui-li-label-form">
                                        地 址:
                                    </label>
                                    <div className="li-block-form ui-li-block-form">
                                        <div className="ui-li-block-ipt-form">
                                            <IptComponent
                                                className="ui-li-form-ipt"
                                                type="text"
                                                placeholder="请输入地址"
                                                onChange={ e => MarketLAPI.newChange(e, MARKET_CHANGE_TYPE.ADDRESS) }
                                                value={ props.marketNewUpdateChangeReducer[MARKET_CHANGE_TYPE.ADDRESS] }
                                            />
                                        </div>
                                        <p className="ui-li-prompt-text-form-ipt">
                                            {/*<span className="ui-li-prompt-text-l-form-ipt">*/}
                                            {/*    请输入地址*/}
                                            {/*</span>*/}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </PerfectScrollbar>
                    </div> : null
                }
            </Dialog>
        </Fragment>
    );
}

export default connect(
    data => ({
        commonProvinceReducer: data.commonProvinceReducer,
        commonCityReducer: data.commonCityReducer,
        commonCountyReducer: data.commonCountyReducer,
        administrationFilterReducer: data.administrationFilterReducer,
        marketNewDialogReducer: data.marketNewDialogReducer,
        marketReducer: data.marketReducer,
        marketListLoadingReducer: data.marketListLoadingReducer,
        marketDialogTypeReducer: data.marketDialogTypeReducer,
        marketListFilterReducer: data.marketListFilterReducer,
        marketOperateTypeReducer: data.marketOperateTypeReducer,
        marketNewUpdateChangeReducer: data.marketNewUpdateChangeReducer,
        marketCoverUploadReducer: data.marketCoverUploadReducer,
        marketNewPromptReducer: data.marketNewPromptReducer
    }), {
        marketDialogAction: marketAction.dialog,
        marketQueryAction: marketAction.query,
        marketAddAction: marketAction.add,
        marketDeleteAction: marketAction.delete,
        marketUpdateAction: marketAction.update,
        marketListLoadingAction: marketAction.listLogin,
        marketDialogTypeAction: marketAction.dialogType,
        marketListFilterAction: marketAction.filterList,
        marketOperateTypeAction: marketAction.operateType,
        marketNewChangeAction: marketAction.newChange,
        marketEmptyChangeAction: marketAction.emptyChange,
        marketAddCoverAction: marketAction.addCover,
        marketDeleteCoverAction: marketAction.deleteCover,
        marketEmptyCoverAction: marketAction.emptyCover,
        marketIsNewPromptAction: marketAction.isNewPrompt,
        commonSelectProvinceAction: commonAction.selectProvince,
        commonSelectCityAction: commonAction.selectCity,
        commonSelectCountyAction: commonAction.selectCounty,
        commonEmptyAdministrationAction: commonAction.emptyAdministration,

    }
)(MarketLPage);
