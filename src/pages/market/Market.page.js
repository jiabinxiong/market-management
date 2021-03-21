import React from 'react';
import { Select } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MarketRPage from './MarketR.page';

import '../../less/market/market.less';

const { Option } = Select;

export default class MarketPage extends React.Component {
    componentDidMount() {
        
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
                        <PerfectScrollbar>
                            <ul className="market-list-ul">                                    
                                {
                                    [1,2,3,4,5,6,7,8,9,10,11,12, 13, 14, 15].map((item, index) => <li className="li" key={item}>
                                            <div className="l">
                                                <div className="img"></div>
                                            </div>
                                            <div className="r">
                                                <h3 className="sub-title">李克强总理出席记者会并回答中外记者提问</h3>
                                                <p className="detail-text">3月11日，国务院总理李克强在北京人民中心的分会场采访。新</p>
                                            </div>
                                        </li>
                                    )
                                } 
                            </ul>
                        </PerfectScrollbar>
                        
                    </div>
                </div>
            
                <div className="market-r">
                    <MarketRPage/>
                </div>
            </div>
        );
    }
}