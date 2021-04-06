import React from 'react';
import { Dialog, IptComponent, TextareaComponent } from '../../components';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Select, Upload, Carousel } from "antd";
import {MarketLAPI} from "../../effectAPI";
const { Option } = Select;

import { ADMINISTRATION, MARKET_CHANGE_TYPE } from '../../constants';
import { IMG_SERVER } from "../../constants/http.constant";

function AddMarketDialogPage({props: props}) {

    return <Dialog
            className="market-new-pop"
            titleText="创建市场"
            closeCallback={ () => MarketLAPI.dialogCloseCallback() }
            determineCallback={(back) => MarketLAPI.determineCallback(back) }
            show={ props.addMarketDialogReducer }
        >
        <div className="market-new-pop-cnt">
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.NAME] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.NAME)  }
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
                                    value={
                                        props.marketNewIptReducer.administration.province.code !== undefined  ? props.marketNewIptReducer.administration.province.name : undefined
                                    }
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
                                        props.marketNewIptReducer.administration.city.code !== undefined  ? props.marketNewIptReducer.administration.city.name : undefined
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
                                        props.administrationSelectReducer.city.map((data, index) =>
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
                                        props.marketNewIptReducer.administration.county.code !== undefined  ? props.marketNewIptReducer.administration.county.name : undefined
                                    }
                                    onChange={
                                        (e, option) => MarketLAPI.cityChange(
                                            ADMINISTRATION.COUNTY,
                                            [],
                                            option
                                        )
                                    }
                                    className="select" placeholder="请选择市">
                                    {
                                        props.administrationSelectReducer.county.map((data, index) =>
                                            <Option
                                                key={data.countyCode}
                                                value={data.countyCode}>{data.name}</Option>
                                        )
                                    }
                                </Select>
                            </li>
                        </ul>
                    </div>
                    <p className="ui-li-prompt-text-form-ipt" >
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
                            accept=".png, .jpg, .jpeg, .gif"
                            disabled={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.COVER].length === 1 ? true : false }
                            onChange={info => MarketLAPI.uploadChange(info, MARKET_CHANGE_TYPE.COVER)}
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
                                props.marketNewIptReducer[MARKET_CHANGE_TYPE.COVER].length !== 0 ?
                                    <Carousel>
                                        {
                                            props.marketNewIptReducer[MARKET_CHANGE_TYPE.COVER].map((data, index) =>
                                                <div className="cover-img" key={data}>
                                                    <div
                                                        onClick={() => MarketLAPI.coverDeleteHandle(data, index, MARKET_CHANGE_TYPE.COVER)}
                                                        className="delete-btn">
                                                        删除第{index+1}张图片
                                                    </div>
                                                    <img src={`${IMG_SERVER}${data}`}/>
                                                </div>
                                            )
                                        }
                                    </Carousel>
                                    : <div className="no-text">还没有上传封面了，快去添加吧</div>
                            }

                        </div>
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">
                        <span className="ui-li-prompt-text-l-form-ipt">
                            { props.marketNewPromptReducer.cover }
                        </span>
                        <span className="ui-li-prompt-text-r-form-ipt">
                            最多还可以上传{ 5- props.marketNewIptReducer[MARKET_CHANGE_TYPE.COVER].length}/5张图片
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.SUMMARY] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.SUMMARY)  }
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.HANG_OUT] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.HANG_OUT)  }
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.BUS] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.BUS)  }
                        />
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.SUBWAY] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.SUBWAY)  }
                        />
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.OPEN_TIME] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.OPEN_TIME)}
                        />
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">
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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.PHONE] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.PHONE)}
                        />
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">

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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.HTTP] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.HTTP)}
                        />
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">

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
                            value={ props.marketNewIptReducer[MARKET_CHANGE_TYPE.ADDRESS] }
                            onChange={ (e) => MarketLAPI.intChange(e, MARKET_CHANGE_TYPE.ADDRESS)}
                        />
                    </div>
                    <p className="ui-li-prompt-text-form-ipt">

                    </p>
                </div>
            </li>
        </ul>
    </PerfectScrollbar>
        </div>
    </Dialog>
}

export default AddMarketDialogPage;
