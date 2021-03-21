import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Upload } from 'antd'; 

import DialogComponent from '../../components/dialog/Dialog.component';

import '../../less/market/marketShopDialog.less';

import testImage1 from '../../images/test-1.jpg';

export default class MarketShopPage extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogShopShow: true
        };
    }

    addShopHandle() {
        this.setState({
            dialogShopShow: true
        });
    }

    dialogCallbackFun() {        
        this.setState({
            dialogShopShow: false
        });
    }

    render() {        
        return (
            <div className="market-shop-block">
                <div className="market-shop-l-block">
                    <div className="market-shop-l-t-block">

                    </div>
                    <div className="market-shop-l-b-block">
                        <PerfectScrollbar>
                            <table className="ui-tftable">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>创建时间</th>
                                        <th>商号</th>
                                        <th>姓名</th>
                                        <th>类型</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11].map((item, index) => (
                                            <tr key={item}>
                                                <td>{ index }</td>
                                                <td>12345678912345{ index }</td>
                                                <td>30</td>
                                                <td>小高{ index }</td>
                                                <td>水果</td>
                                                <th>
                                                    删除 修改
                                                </th>
                                            </tr>   
                                        ))
                                    }
                                                                            
                                </tbody>
                            </table>
                        </PerfectScrollbar>
                    </div>                   
                </div>
                <div className="market-shop-r-block">
                    <div className="market-shop-r-t-block">
                        <div className="market-shop-kind-block">
                            <div className="ui-btn btn" onClick={ () => this.addShopHandle() }>
                                添加水果种类
                            </div>
                        </div>
                    </div>
                    <div className="market-shop-r-b-block">
                        <PerfectScrollbar>
                            <div className="market-shop-kind-list">
                                <ul className="ul">
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => 
                                            <li className="li" key={ item }>
                                                <div className="img-block">
                                                    <img className="img" src={testImage1}/>
                                                </div>
                                                <div className="info">
                                                    <div className="name">
                                                        <span className="title">名称:</span>
                                                        <span className="text">苹果</span>
                                                    </div>
                                                    <div className="origin">
                                                        <span className="title">产地:</span>
                                                        <span className="text">北市大兴区</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }                                
                                </ul>
                            </div>
                        </PerfectScrollbar>                        
                    </div>
                </div>

                {
                    this.state.dialogShopShow ? <DialogComponent
                        show={this.state.dialogShopShow}
                        callbackFun={ () => this.dialogCallbackFun() }
                    >
                        <div className="market-shop-dialog">
                            <ul className="ui-ul-form">
                                <li className="ui-li-form ">
                                    <label className="ui-li-label-form">名 &nbsp; &nbsp;&nbsp; 称:</label>
                                    <div className="ui-li-block-form">
                                        <div className="ui-li-block-ipt-form">
                                            <div className="ui-li-block-childer-form">
                                                <input 
                                                    className="ui-li-form-ipt" 
                                                    type="text" 
                                                    placeholder="请输入名称"/>
                                            </div>
                                            
                                        </div>                                                    
                                        <p className="ui-li-prompt-text-form-ipt">
                                            <span className="ui-li-prompt-text-l-form-ipt">请输入名称</span>
                                        </p>                                                
                                    </div>
                                </li>
                                <li className="ui-li-form market-shop-dialog-upload-li">
                                    <label className="ui-li-label-form">图 &nbsp; &nbsp;&nbsp; 片:</label>
                                    <div className="ui-li-block-form">
                                        <div className="ui-li-block-childer-form market-shop-dialog-upload-li-block ">
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
                                        </div>                                    
                                        <p className="ui-li-prompt-text-form-ipt">请输入用户名</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </DialogComponent> : null
                }                
            </div>
        );
    }
}