import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

import MarketPage from '../market/Market.page';

import '../../less/home/home.less';

export default class HomePage extends React.Component {
    render() {
        return(
            <div className="home">
                <div className="home-l">
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        >
                        <SubMenu key="sub1" title="市场">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="home-r">
                    <div className="home-t">
                        asdfas
                    </div>
                    <div className="home-t-l">
                        <MarketPage/>
                    </div>
                    
                </div>
            </div>
        );
    }
}