import React from 'react';
import {Carousel, Upload} from "antd";
import { connect } from 'react-redux';
// import {Map} from "react-amap";
import PerfectScrollbar from 'react-perfect-scrollbar';

// import PopComponent from '../../components/pop/Pop.component';


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

import {IptComponent, WindowPopComponent} from '../../components';

function MarketNewPopPage(props) {
    return (
        <WindowPopComponent
            titleText="创建市场"
            visible={ props.visible }
            popCloseCallback={ props.popCloseCallback }
            popDetermineCallback={ props.popDetermineCallback }
            className="market-new-pop"
        >
            <div className="market-new-pop-cnt">
                <PerfectScrollbar>
                    <ul className="ui-ul-form">
                        <li className="ui-li-form ">
                            <label className="ui-li-label-form">
                                <span className="ui-li-label-form-required">*</span>名 称:
                            </label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-ipt-form">
                                    <div className="ui-li-block-childer-form">
                                        {/*<input*/}
                                        {/*    className="ui-li-form-ipt"*/}
                                        {/*    type="text"*/}
                                        {/*    placeholder="请输入名称"/>*/}
                                        <IptComponent
                                            className="ui-li-form-ipt"
                                            type="text"
                                            placeholder="请输入名称"
                                        />
                                    </div>

                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入名称</span>
                                </p>
                            </div>
                        </li>

                        <li className="ui-li-form ui-li-upload-form market-new-pop-cover-ui-li">
                            <label className="ui-li-label-form">封 面:</label>
                            <div className="ui-li-block-form ui-li-upload-block-form">
                                <div className="ui-li-block-childer-form ui-li-upload-childer-form block-childer">
                                    <Upload
                                        name="file"
                                        className="ui-upload">
                                        <div className="icon-block">
                                            <div className="info">
                                                <span className="icon iconfont icon-add-icon "></span>
                                                <span className="text">上传</span>
                                            </div>
                                        </div>
                                    </Upload>
                                    <div className="market-detail-carousel">
                                        <Carousel>
                                            <div>
                                                <h3 style={contentStyle}>1</h3>
                                            </div>
                                            <div>
                                                <h3 style={contentStyle}>2</h3>
                                            </div>
                                            <div>
                                                <h3 style={contentStyle}>3</h3>
                                            </div>
                                            <div>
                                                <h3 style={contentStyle}>4</h3>
                                            </div>
                                        </Carousel>
                                    </div>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输选择封面</span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form ui-li-textarea-form">
                            <label className="ui-li-label-form">简 介:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form ui-li-block-childer-textarea-form">
                                        <textarea
                                            placeholder="请输入市场简介"
                                            className="ui-li-form-textarea"></textarea>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入市场简介</span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form ui-li-textarea-form">
                            <label className="ui-li-label-form">闲逛须知:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form ui-li-block-childer-textarea-form">
                                        <textarea
                                            placeholder="请输入市场简介"
                                            className="ui-li-form-textarea"></textarea>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入闲逛须知</span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form">
                            <label className="ui-li-label-form">公 交:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form">
                                    <input className="ui-li-form-ipt" type="text" placeholder="请输入乘坐公交路线"/>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入乘坐公交路线</span>
                                    <span className="ui-li-prompt-text-r-form-ipt">
                                            (100路公交在某某站下等等) 如有多个以“ / ”分段
                                        </span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form">
                            <label className="ui-li-label-form">地 铁:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form">
                                    <input className="ui-li-form-ipt" type="text" placeholder="请输入乘坐地铁路线"/>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入乘坐地铁路线</span>
                                    <span className="ui-li-prompt-text-r-form-ipt">
                                            (地铁1号线在某某站下等等) 如有多个以“ / ”分段
                                        </span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form">
                            <label className="ui-li-label-form">开放时间:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form">
                                    <input
                                        className="ui-li-form-ipt"
                                        type="text"
                                        placeholder="请输入开放时间"/>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输开放时间</span>
                                    <span className="ui-li-prompt-text-r-form-ipt">
                                            (1月01日－03月31日 06:00-19:00)也可以不加月份等等, 如有多个以“ / ”分段
                                        </span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form">
                            <label className="ui-li-label-form">电 话:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form">
                                    <input
                                        className="ui-li-form-ipt"
                                        type="text"
                                        placeholder="请输入电话号码"/>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入电话号码</span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form">
                            <label className="ui-li-label-form">网 址:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-childer-form">
                                    <input
                                        className="ui-li-form-ipt"
                                        type="text"
                                        placeholder="请输入网址"/>
                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入网址</span>
                                </p>
                            </div>
                        </li>
                        <li className="ui-li-form market-address-li-form">
                            <label className="ui-li-label-form">地 址:</label>
                            <div className="ui-li-block-form">
                                <div className="ui-li-block-ipt-form">
                                    <div className="ui-li-block-childer-form">
                                        <input
                                            className="ui-li-form-ipt"
                                            type="text"
                                            placeholder="请输入地址"/>
                                    </div>

                                </div>
                                <p className="ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入地址</span>
                                </p>
                                {/*<div className="market-address-map-block-form">*/}
                                {/*    <Map></Map>*/}
                                {/*</div>*/}
                            </div>
                        </li>
                    </ul>
                </PerfectScrollbar>
            </div>
        </WindowPopComponent>
    );
}

export default connect(

)(MarketNewPopPage);
