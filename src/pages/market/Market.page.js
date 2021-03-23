import React from 'react';
import { Select } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketRPage from './MarketR.page';

import '../../less/market/market.less';

const { Option } = Select;

import PopComponent from '../../components/pop/Pop.component';

export default class MarketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewMarketPop: false
        };
    }
    componentDidMount() {
        
    }

    newMarketPopHandle() {
        this.setState({
            isNewMarketPop: true
        });
    }

    closeMarketPopHandle() {
        this.setState({
            isNewMarketPop: false
        });
    }

    closeCallbackFun() {
        // console.log('a');
        this.setState({
            isNewMarketPop: false
        });
    }

    render() {
        return (
            <div className="market">
                <div className="market-l">
                    <div className="market-l-t">
                        <div className="market-search">
                            <div className="btn ui-btn">
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
                                onClick={ () => this.newMarketPopHandle() }
                                className="new-btn">去创建吧!{this.state.isNewMarketPop ? 'haha' : 'la'}</span>
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

                <PopComponent
                    closeCallbackFun={ () => this.closeCallbackFun() }
                    isShow={ this.state.isNewMarketPop }>
                    <div onClick={ () => this.closeMarketPopHandle() } className="ui-btn">关闭</div>
                </PopComponent>

            </div>
        );
    }
}