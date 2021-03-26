import React from 'react';
import { Select } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketRPage from './MarketR.page';

import '../../less/market/market.less';

const { Option } = Select;

import MarketNewPopPage from './MarketNewPop.page';

import { WindowPopComponent } from '../../components';

export default class MarketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewMarketPop: false,
            visible: true,
            determineSuccess: false,
            nameIpt: '11'
        };
    }
    componentDidMount() {
        
    }

    showPopHandle() {
        this.setState({
            visible: true
        })
    }

    popCloseCallback() {
        console.log('close callback');
        this.setState({
            visible: false
        });
    }

    popDetermineCallback(msg) {
        // console.log(msg.close());
        // this.setState({
        //     determineSuccess: true
        // });

        if( this.state.nameIpt.length > 0) {
            msg.close('determine', () => {
                this.setState({
                    visible: false
                });
            });
        } else {
        }

        // fetch('https://api.github.com/users')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data.length)
        //
        //         this.setState({
        //             // determineSuccess: true,
        //             visible: false
        //         })
        //
        //         msg.close();
        //     })
    }

    searchHandle() {
        this.setState({
            visible: true
        });
    }

    nameIptChange(e) {
        console.log(e.target.value);
        this.setState({
            nameIpt: e.target.value
        });
    }

    render() {
        return (
            <div className="market">
                <div className="market-l">
                    <div className="market-l-t">
                        <div className="market-search">
                            <div className="btn ui-btn" onClick={ () => this.searchHandle() }>
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
                        <div className="market-list-none">
                          还没有市场场，<span
                                onClick={ () => this.showPopHandle() }
                                className="new-btn">去创建吧!</span>
                        </div>
                        {/*<PerfectScrollbar>*/}
                        {/*    <ul className="market-list-ul">                                    */}
                        {/*        {*/}
                        {/*            [1,2,3,4,5,6,7,8,9,10,11,12, 13, 14, 15].map((item, index) => <li className="li" key={item}>*/}
                        {/*                    <div className="l">*/}
                        {/*                        <div className="img"></div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="r">*/}
                        {/*                        <h3 className="sub-title">李克强总理出席记者会并回答中外记者提问</h3>*/}
                        {/*                        <p className="detail-text">3月11日，国务院总理李克强在北京人民中心的分会场采访。新</p>*/}
                        {/*                    </div>*/}
                        {/*                </li>*/}
                        {/*            )*/}
                        {/*        } */}
                        {/*    </ul>*/}
                      {/*</PerfectScrollbar>*/}
                        
                    </div>
                </div>
            
                <div className="market-r">
                    <MarketRPage/>
                </div>

                {
                    this.state.visible ? <WindowPopComponent
                        visible={ this.state.visible }
                        determineSuccess={this.state.determineSuccess}
                        popDetermineCallback={(msg) => this.popDetermineCallback(msg)}
                        popCloseCallback={ () => this.popCloseCallback() }>
                        <div>
                            <div>{ this.state.nameIpt.length > 0 ? 'haha' : ' no text ' }</div>
                            <input onChange={ e => this.nameIptChange(e) }/>
                        </div>
                    </WindowPopComponent> :null
                }


                {/*<MarketNewPopPage/>*/}
                {/*<PopComponent*/}
                {/*    callbackFun={ () => this.popCallbackFun() }*/}
                {/*    isShow={ this.state.isNewMarketPop }>*/}
                {/*    <div onClick={ () => this.closeMarketPopHandle() } className="ui-btn">关闭</div>*/}
                {/*</PopComponent>*/}

            </div>
        );
    }
}