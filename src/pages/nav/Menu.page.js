import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Menu } from 'antd';
const { SubMenu } = Menu;

export default function MenuPage(props) {
    return (
        <>
            <PerfectScrollbar>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu key="sub1" title="市场">
                        {
                            props.props.commonProvinceReducer.map((data, index) =>
                                <Menu.Item key={ data.code }>{ data.name }</Menu.Item>
                            )
                        }
                    </SubMenu>
                </Menu>
            </PerfectScrollbar>
        </>
    );
}
